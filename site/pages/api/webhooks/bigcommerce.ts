import { RedisClient } from '@lib/server/redis';
import { Analytics } from '@segment/analytics-node';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const { BIGCOMMERCE_STOREFRONT_API_TOKEN } = process.env;

interface CartData {
    product_id: string;
    sku: string;
    name: string;
    price: number;
    quantity: number;
}

interface EventData {
    anonymousId: string;
    event: string;
    properties: {
        orderId: string;
        total: number;
        revenue: number;
        products: CartData[];
        userAgent: string;
        ip: string;
    };
}

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

function getEventName(scope: string): string {
    const eventName = {
        'store/cart/lineItem/updated': 'Cart Updated',
        'store/cart/lineItem/created': 'Cart Updated',
        'store/cart/lineItem/deleted': 'Cart Updated',
        'store/cart/created': 'Cart Created',
        'store/cart/updated': 'Cart Updated',
        'store/cart/deleted': 'Cart Deleted',
        'store/cart/abandoned': 'Cart Abandoned',
        'store/cart/converted': 'Order Completed',
    };

    return eventName[scope] || '';
}

function getProducts(cartData: any): CartData[] {
    if (!cartData) return [];

    return cartData.data.line_items.physical_items.map((item: any) => ({
        product_id: item.id,
        sku: item.sku,
        name: item.name,
        price: item.extended_sale_price,
        quantity: item.quantity,
    }));
}

async function getOrderInfo(orderId: string) {
    const endpointUrl = `https://api.bigcommerce.com/stores/day26hsh2m/v2/orders/${orderId}`;

    return axios.get(endpointUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Auth-Token': process.env.BIGCOMMERCE_STORE_API_TOKEN || '',
        },
    }).then((response) => response.data);
}

// async function getAnonymousId(redis: RedisClient, cartId: string): Promise<string> {
//     const stashedData = await redis.getAnonymousId(cartId);

//     if (stashedData) {
//         return stashedData.segmentAnonymousID;
//     }

//     const anonymousId = uuidv4();
//     await redis.saveData(cartId, {
//         segmentAnonymousID: anonymousId,
//         bcCartID: cartId,
//     });

//     return anonymousId;
// }



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const { scope, data } = req.body;

        console.log(`
        
        !!!!!![INCOMING WEBHOOK]!!!!!!
        

        raw data:
        `);
        console.log({ scope, data });
        console.log(`
            ${scope} event received
            ${scope === "store/cart/lineItem/updated" && data.cartId} cartId
            ${data.id} id (cart id in fact);
        `);
        console.log(` ////////////////////////////// `);

        const cartId = data.cartId || data.id;
        const redis = new RedisClient();

        const cartData = await getCart(cartId).catch(() => console.log('No cart data to get'));
        const products = getProducts(cartData);
        const eventName = getEventName(scope);
        const unstashedData = await redis.unstash(cartId);
        const anonymousId = unstashedData?.segmentAnonymousID || uuidv4();


        const eventData: EventData = {
            anonymousId,
            event: eventName,
            properties: {
                orderId: cartId,
                total: cartData?.data?.base_total,
                revenue: cartData?.data?.cart_amount,
                products,
                userAgent: unstashedData?.ua,
                ip: unstashedData?.ip,
            },

        };

        let orderInfo;
        console.log(eventData, 'eventData:  ////////////////////////////// ')

        if (scope === 'store/cart/converted') {
            orderInfo = await getOrderInfo(data.orderId);

            console.log(`
                CONVERTED!!!! 
            
                CARTID: ${cartId}    
        
                ${JSON.stringify(orderInfo, null, 2)}

            `);

            const {
                billing_address,
                ip_address,

            } = orderInfo;
        }

        const analytics = new Analytics({
            writeKey: process.env.SEGMENT_SERVER_WRITEKEY || '',
        });

        analytics.track(eventData, (err, batch) => {
            if (err) {
                console.log('Error sending event to Segment');
                console.error(err);
            }
        });

        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error handling request:', error);
        console.log(req.body);
        res.status(500).json({ error: 'Internal server error' });
    }
}