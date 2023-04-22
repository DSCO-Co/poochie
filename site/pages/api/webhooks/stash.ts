

import { RedisClient } from '@lib/server/redis';
import type { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {

    const redis = new RedisClient();


    if (req.method === 'POST') {
        const { cartId, data } = req.body;

        // Save the entire data object with the cartId to Redis
        await redis.saveData(cartId, data);
        res.status(200).json({ message: 'Success' });
    } else if (req.method === 'GET') {
        const { cartId } = req.query;

        // Retrieve the anonymousId from Redis using the cartId
        let anonymousId;
        try {
            anonymousId = await redis.getAnonymousId(cartId as string);
        } catch (e) {
            console.log(`------------------`);
            console.log(e);
        }

        if (!anonymousId) {
            // const cache = redis.printEntireCache();
            const cache = {};
            res.status(200).json({ message: `No Match to cartID: ${cartId}`, debug: cache });
            return;
        }
        res.status(200).json({ anonymousId });
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}