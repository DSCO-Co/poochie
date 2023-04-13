// localhost:3000/api/webhooks/stape

/*
    nextjs client -> api route -> stape.io -> gtm
    client: POST /api/webhooks/stape
    server: builds the event type, adds user data, adds product data, etc...
    server: POST https://ss.poochie.co/collect, whatever...
*/
export default async function handler(req, res) {
  const requestMethod = req.method

  switch (requestMethod) {
    case 'GET':
      res
        .status(200)
        .json({
          message: `Get requests are not supported. Did you mean to make a POST request?`,
        })
      break 

    case 'POST':
      const eventData = req.body
      console.log('Received event data:', eventData)

      res.status(200).json({ message: 'Hey it worked in stape routes' })
      break // Add this break statement

    // handle other HTTP methods
    default:
      res.status(200).json({ message: 'Welcome to API Routes!' })
      break // Add this break statement (optional)
  }
}
