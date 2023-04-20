import axios from 'axios'
import { Analytics } from '@segment/analytics-node'

export default async function handler(req, res) {
  const requestMethod = req.method

  // Check if SEGMENT_SERVER_WRITEKEY is defined
  const segmentServerWriteKey = process.env.SEGMENT_SERVER_WRITEKEY
  if (!segmentServerWriteKey) {
    console.error('SEGMENT_SERVER_WRITEKEY is not defined')
    res.status(500).json({ error: 'Internal server error' })
    return
  }

  const analytics = new Analytics({
    writeKey: segmentServerWriteKey,
  })

  try {
    switch (requestMethod) {
      case 'GET':
        res.status(200).json({
          message: `Get requests are not supported. Did you mean to make a POST request?`,
        })
        break

      case 'POST':
        const receivedData = req.body
        console.log('receivedData:', receivedData.eventName)
        switch (receivedData.eventName) {
          case 'Page Viewed':
            try {
              const { anonymousId, properties } = receivedData
              const { path, referrer, search, title, url } = properties || {}

              console.log('heres the url from segment:', url)

              analytics.page({
                anonymousId,
                properties: {
                  path,
                  referrer,
                  search,
                  title,
                  url,
                },
              })

              res
                .status(200)
                .json({ message: `Server Event ${receivedData.eventName}` })
            } catch (error) {
              console.error('Error processing received data:', error)
              res.status(500).json({ error: 'Error processing received data' })
            }
            break

          case 'Product Added':
            res
              .status(200)
              .json({ message: `Server Event ${receivedData.eventName}` })
            break
          case 'Product Removed':
            res
              .status(200)
              .json({ message: `Server Event ${receivedData.eventName}` })
            break
          case 'Product Added to Wishlist':
            res
              .status(200)
              .json({ message: `Server Event ${receivedData.eventName}` })
            break
         
          default:
            res
              .status(500)
              .json({ error: `Server Event ${receivedData.eventName} did not match any server events.` })
            break
        }

        break

      default:
        res.status(200).json({ message: 'Welcome to API Routes!' })
        break
    }
  } catch (error) {
    console.error('Error handling request:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export {}
