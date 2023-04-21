import commerce from '@lib/api/commerce';
// import getCart from '../../../../packages/bigcommerce/src/api/endpoints/cart/get-cart';

export default async function handler(req, res) {
    try {
        const { scope, data, created_at } = req.body
        commerce.


        const events = [
            "store/cart/lineItem/updated",
            "store/cart/lineItem/created",
            "store/cart/lineItem/deleted",
            "store/cart/created",
            "store/cart/updated",
            "store/cart/deleted",
            "store/cart/abandoned",
            "store/cart/converted"];


        console.log('req.body:', req.body);
        res.status(200).json({ message: 'Success' })

    } catch (error) {
        console.error('Error handling request:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}



