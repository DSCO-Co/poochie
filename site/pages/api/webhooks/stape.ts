// https://localhost:3000/api/webhooks/stape


/*
    nextjs client -> api route -> stape.io -> gtm
    client: POST /api/webhooks/stape
    server: builds the event type, adds user data, adds product data, etc...
    server: POST https://ss.poochie.co/collect, whatever...
*/
export default function handler(req, res) {
    const requestMethod = req.method;
    const body = JSON.parse(req.body);
    switch (requestMethod) {
        case 'POST':
            res.status(200).json({ message: `You submitted the following data: ${body}` })

        // handle other HTTP methods
        default:
            res.status(200).json({ message: 'Welcome to API Routes!' })
    }
}