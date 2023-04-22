import { RedisClient } from '@lib/server/redis';
import { Analytics } from '@segment/analytics-node';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';


const { BIGCOMMERCE_STOREFRONT_API_TOKEN } = process.env;

/*
    // Example Data:
    {
    "bcCartID": "7beb59f4-0226-4223-89e0-b10b959d1526",
    "ip": "47.156.232.192",
    "segmentAnonymousID": "c8a004d6-c53c-41a3-a840-8ed6c4b125e5",
    "cookies": {
        "accept_cookies": "accepted",
        "_ga": "GA1.1.1057293567.1663608326",
        "_uetvid": "0ca07f50384011eda54447a82113ba3f",
        "ki_r": "",
        "ki_t": "1663608326893;1663608326893;1663608538928;1;4",
        "_ga_MPZEH6N5CJ": "GS1.1.1663608325.1.1.1663608561.0.0.0",
        "localization": "",
        "_y": "a672b10c-7FD0-45CE-7BBE-7E03921B09D6",
        "_shopify_y": "a672b10c-7FD0-45CE-7BBE-7E03921B09D6",
        "_shg_user_id": "ff25b31b-4194-419c-b7f7-212d1fbbc2f5",
        "__kla_id": "eyIkcmVmZXJyZXIiOnsidHMiOjE2NjQ5NDQ4NzYsInZhbHVlIjoiIiwiZmlyc3RfcGFnZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6OTI5Mi8ifSwiJGxhc3RfcmVmZXJyZXIiOnsidHMiOjE2NjQ5NDUwMTYsInZhbHVlIjoiIiwiZmlyc3RfcGFnZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6OTI5Mi8ifX0=",
        "_ga_KHV19111K1": "GS1.1.1664944875.1.1.1664946246.0.0.0",
        "ajs_anonymous_id": "c8a004d6-c53c-41a3-a840-8ed6c4b125e5",
        "bc_cartId": "7beb59f4-0226-4223-89e0-b10b959d1526",
        "attr_first": "{\"source\":null,\"medium\":null,\"campaign\":null,\"term\":null,\"content\":null,\"source_platform\":null,\"marketing_tactic\":null,\"creative_format\":null,\"adgroup\":null,\"lp\":null,\"date\":null}",
        "attr_last": "{\"source\":null,\"medium\":null,\"campaign\":null,\"term\":null,\"content\":null,\"source_platform\":null,\"marketing_tactic\":null,\"creative_format\":null,\"adgroup\":null,\"lp\":null,\"date\":null}"
    }
}
*/

async function getCart(cartId: string) {
    const endpointUrl = `https://api.bigcommerce.com/stores/day26hsh2m/v3/carts/${cartId}`;

    return axios.get(endpointUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Auth-Token': process.env.BIGCOMMERCE_STORE_API_TOKEN || '',
        },
    }).then((response) => response.data);
}


export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {

    try {
        const { scope, data, created_at } = req.body;

        const redis = new RedisClient();

        let cartData;
        if (data) {
            console.log('data:', data);
            cartData = await getCart(data.cartId);
        }

        const events = [
            'store/cart/lineItem/updated',
            'store/cart/lineItem/created',
            'store/cart/lineItem/deleted',
            'store/cart/created',
            'store/cart/updated',
            'store/cart/deleted',
            'store/cart/abandoned',
            'store/cart/converted',
        ];

        const eventName = {
            'store/cart/lineItem/updated': 'Cart Updated',
            'store/cart/lineItem/created': 'Cart Updated',
            'store/cart/lineItem/deleted': 'Cart Updated',
            'store/cart/created': 'Checkout Started',
            'store/cart/updated': 'Cart Updated',
            'store/cart/deleted': 'Cart Deleted',
            'store/cart/abandoned': 'Cart Abandoned',
            'store/cart/converted': 'Order Completed',
        };

        // console.log('req.body:', req.body);
        // console.log('cartData:', cartData.data);

        const products = cartData.data.line_items.physical_items.map((item) => {
            console.log({ item });

            return {
                product_id: item.id,
                sku: item.sku,
                name: item.name,
                price: item.extended_sale_price,
                quantity: item.quantity,
            };
        });

        const analytics = new Analytics({
            writeKey: process.env.SEGMENT_SERVER_WRITEKEY || '',
        });

        const productsArray = products.map((product) => {
            const { product_id, sku, name, price, quantity } = product;
            return {
                product_id,
                sku,
                name,
                price,
                quantity,
            };
        });

        // Retrieve the anonymousId from Redis using the cartId
        const stashedData = await redis.getAnonymousId(data.cartId);

        const eventData = {
            anonymousId: stashedData.segmentAnonymousData,
            event: eventName[req.body.scope],
            properties: {
                orderId: cartData.data.id,
                total: cartData.data.base_total,
                revenue: cartData.data.cart_amount,
                products: productsArray,
                userAgent: stashedData.ua,
                ip: stashedData.ip,
            },
        };

        console.log({ eventData: JSON.stringify(eventData) });
        const event = analytics.track(eventData);

        console.log({ event });
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        // @ts-ignore
        console.error('Error handling request:', error.message);
        console.log(`------------------`);
        console.log(req.body);
        console.log(`------------------`);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/* 
    To collect the client - side anonymous ID and save it to Redis, you can create a new API route, for example, `/api/segment`:

```javascript
    // pages/api/segment.ts

import { Redis } from '@upstash/redis';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const redis = new Redis({
    url: 'https://steady-ladybug-30806.upstash.io',
    token: 'AXhWASQgODMxOTgzNjUtNDJhYy00NGRmLThlMGEtZDBhMmI3OGQ0NzA2MDZiMThkNjhhNzNmNGU0ZDgwYzc3OTQ4YWMzNGZmZDk=',
  });

  if (req.method === 'POST') {
    const { anonymousId, cartId } = req.body;

    // Save the anonymousId with the cartId to Redis
    await saveAnonymousId(redis, anonymousId, cartId);
    res.status(200).json({ message: 'Success' });
  } else if (req.method === 'GET') {
    const { cartId } = req.query;

    // Retrieve the anonymousId from Redis using the cartId
    const anonymousId = await getAnonymousId(redis, cartId as string);
    res.status(200).json({ anonymousId });
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${ req.method } Not Allowed`);
  }
}

```

// Client-side code snippet

const anonymousId = analytics.user().anonymousId();
const cartId = 'your_bigcommerce_cart_id';

// Send anonymousId and cartId to /api/segment when a cart event occurs
fetch('/api/segment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ anonymousId, cartId }),
});

*/