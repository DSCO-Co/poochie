import { Analytics } from '@segment/analytics-node'

export default async function handler(req, res) {
  const requestMethod = req.method

  // Check if SEGMENT_SERVER_WRITEKEY is defined
  const segmentServerWriteKey = process.env.SEGMENT_SERVER_WRITEKEY
  if (!segmentServerWriteKey) {
    console.error('SEGMENT_SERVER_WRITEKEY is not defined')
    res.status(500).json({
      error: 'Internal server error SEGMENT_SERVER_WRITEKEY is not defined',
    })
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
        console.log('receivedData:', receivedData)
        switch (receivedData.eventName) {
          case 'Checkout Started':
            try {
              // const { anonymousId, properties } = receivedData
              // const { orderId, total, revenue, products } = properties || {}

              // console.log('heres the products from segment:', products)

              // const productsArray = products.map((product) => {
              //   const { product_id, sku, name, price, quantity } = product
              //   return {
              //     product_id,
              //     sku,
              //     name,
              //     price,
              //     quantity,
              //   }
              // })

              // analytics.track({
              //   anonymousId,
              //   event: 'Checkout Started',
              //   properties: {
              //     orderId,
              //     total,
              //     revenue,
              //     products: productsArray,
              //   },
              // })

              res
                .status(200)
                .json({ message: 'Checkout Started Sent From Server' })
            } catch (error) {
              console.error('Error processing received data:', error)
              res.status(500).json({ error: 'Error processing received data' })
            }
            break

          /**
           * Webhook from BigCommerce
           * Event: Order Completed
           *
           * @argument {object} properties
           * @argument {object} receivedData
           * @argument {string} anonymousId
           * @argument {string} orderId
           * @argument {number} total
           * @argument {number} revenue
           * @argument {array} products
           *
           */

          case 'Order Completed':
            try {
              const { anonymousId, properties } = receivedData
              const { orderId, total, revenue, products } = properties || {}

              console.log('heres the products from segment:', products)

              const productsArray = products.map((product) => {
                const { product_id, sku, name, price, quantity } = product
                return {
                  product_id,
                  sku,
                  name,
                  price,
                  quantity,
                }
              })

              analytics.track({
                anonymousId,
                event: 'Order Completed',
                properties: {
                  orderId,
                  total,
                  revenue,
                  products: productsArray,
                },
              })

              res
                .status(200)
                .json({ message: 'Order Completed Sent From Server' })
            } catch (error) {
              console.error('Error processing received data:', error)
              res.status(500).json({ error: 'Error processing received data' })
            }
            break
          case 'Page Viewed':
            try {
              const { anonymousId, properties, timestamp, messageId, context } =
                receivedData
              const { path, referrer, search, title, url } = properties || {}
              const clientUserAgent = context.clientUserAgent

              console.log('heres the url from segment:', url)

              analytics.page({
                anonymousId,
                timestamp,
                // messageId, TODO: add this for deduplication
                context: {
                  userAgent: clientUserAgent,
                },
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
            res.status(500).json({
              error: `Server Event ${receivedData.eventName} did not match any server events.`,
            })
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
