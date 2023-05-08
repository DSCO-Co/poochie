// import axios from 'axios'

// // localhost:3000/api/webhooks/stape

// /*
//     nextjs client -> api route -> stape.io -> gtm
//     client: POST /api/webhooks/stape
//     server: builds the event type, adds user data, adds product data, etc...
//     server: POST https://ss.poochie.co/collect, whatever...
// */
// export default async function handler(req, res) {
//   const requestMethod = req.method

//   switch (requestMethod) {
//     case 'GET':
//       res.status(200).json({
//         message: `Get requests are not supported. Did you mean to make a POST request?`,
//       })
//       break

//     case 'POST':
//       const eventData = req.body
//       console.log('Received event data:', eventData)

//       const url = eventData.url ? encodeURIComponent(eventData.url) : ''

//       try {
//         const response = await axios.get(
//           `https://ss.poochie.co/g/collect?v=2&en=page_view&tid=G-1234&cid=123.456&dl=${url}`,
//           {
//             headers: {
//               'x-gtm-server-preview':
//                 'ZW52LTR8Mm1kZnBEQ1ZpdHhJemRkbkNEaU9zd3wxODc3YzgzOTNhMTFhMzVjNmNmZDQ=',
//             },
//           }
//         )
//         console.log('Axios response:', response.data)
//       } catch (error) {
//         console.error('Axios request failed:', error)
//       }

//       res
//         .status(200)
//         .json({ message: 'Hey it worked in stape routes this time' })
//       break

//     // handle other HTTP methods
//     default:
//       res.status(200).json({ message: 'Welcome to API Routes!' })
//       break
//   }
// }
export {}
