
export default async function handler(req, res) {
    try {
        console.log('req.body:', req.body);
        res.status(200).json({ message: 'Success' })

    } catch (error) {
        console.error('Error handling request:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export { };

