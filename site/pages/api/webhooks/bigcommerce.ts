import { RedisClient } from '@lib/server/redis';
import { Analytics } from '@segment/analytics-node';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const { BIGCOMMERCE_STOREFRONT_API_TOKEN } = process.env;

// TypeScript type for the cart data
interface CartData {
    product_id: string;
    sku: string;
    name: string;
    price: number;
    quantity: number;
}

// TypeScript type for the event data
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

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const { scope, data, created_at } = req.body;

        const redis = new RedisClient();
        let cartData;
        if (data) {
            cartData = await getCart(data.cartId);
        }

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

        const products: CartData[] = cartData.data.line_items.physical_items.map((item) => {
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

        // Retrieve the anonymousId from Redis using the cartId
        const stashedData = await redis.getAnonymousId(data.cartId);

        const eventData: EventData = {
            anonymousId: stashedData.segmentAnonymousData,
            event: eventName[req.body.scope],
            properties: {
                orderId: cartData.data.id,
                total: cartData.data.base_total,
                revenue: cartData.data.cart_amount,
                products,
                userAgent: stashedData.ua,
                ip: stashedData.ip,
            },
        };

        const event = analytics.track(eventData);

        res.status(200).json({ message: 'Success' });
    } catch (error) {
        // @ts-ignore
        console.error('Error handling request:', error.message);
        console.log(`------------------`);
        console.log(req.body);
        console.log(req.body);
        console.log(`------------------`);
        res.status(500).json({ error: 'Internal server error' });
    }
}