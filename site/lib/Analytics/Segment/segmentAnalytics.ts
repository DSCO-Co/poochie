//Source https://github.com/segmentio/react-example/blob/main/src/examples/analytics-quick-start/analytics.ts
import axios from 'axios'
import { AnalyticsWindow } from '@lib/Analytics/Segment/types/Segment'

declare let window: AnalyticsWindow

type EventType =
  | 'Page Viewed'
  | 'Product Viewed' //client only
  | 'Product Added'
  | 'Product Removed'
  | 'Product Added to Wishlist'
  | 'Checkout Started'
  | 'Order Completed'

const forwardToServer = (eventName: EventType, data) => {
  // data = data.event
  // data.eventName = eventName;
  // console.log('data in forwardeded:', data)
  // axios
  //   .post('/api/webhooks/segment', data)
  //   .then((response) => {
  //     console.log('Server response:', response.data)
  //   })
  //   .catch((error) => {
  //     console.error('Error sending event data:', error)
  //   })
}

/**
 * Basic Analytics calls
 */
const pageViewed = async (name = 'John Doe', category = 'Default category') => {
  let data = await window.analytics.page()
  // @ts-ignore
  // data.event.context.clientUserAgent = navigator.userAgent
  // console.log('Page Viewed data:', data)
  forwardToServer('Page Viewed', data)
}

const identifyUser = (name: string) => {
  window.analytics.identify({
    name,
  })
}

/**
 * B2B SaaS calls
 */
const trackAccountCreated = (accountName: string) => {
  const eventName = 'Account Created'
  window.analytics.track(eventName, {
    account_name: accountName,
  })
}

/**
 * eCommerce Analytics calls
 */

const trackProductViewed = async (product: any) => {
  //gtag
  // gtag.event()
  //Segment
  const eventName = 'Product Viewed'
  product.clientUserAgent = navigator.userAgent
  let data = await window.analytics.track(eventName, { product })
  // console.log('Product Viewed data:', data)
}

const trackProductListViewed = async (products: any[], category: string) => {
  const eventName = 'Product List Viewed'
  const trackedProducts = {
    clientUserAgent: navigator.userAgent,
    products: products,
    category: category,
  }
  let data = await window.analytics.track(eventName, trackedProducts)
  // console.log('Product List Viewed data:', data)
}

const trackProductAdded = async (product: any) => {
  const eventName = 'Product Added'
  let data = await window.analytics.track(eventName, { product })
  // console.log('Product Added data:', data)
  forwardToServer(eventName, data)
}

const trackProductRemoved = async () => {
  const eventName = 'Product Removed'
  let data = await window.analytics.track(eventName, {})
  // console.log('Product Removed data:', data)
  forwardToServer(eventName, data)
}

const trackProductAddedToWishlist = async () => {
  const eventName = 'Product Added to Wishlist'
  let data = await window.analytics.track(eventName, {})
  // console.log('Product Added to Wishlist', data)
  forwardToServer(eventName, data)
}

const trackCheckoutStarted = async (cartData: any) => {
  const eventName = 'Checkout Started'
  // console.log('Checkout Started data:', cartData)
  let data = await window.analytics.track(eventName, { cartData })
  // console.log('Checkout Started data:', JSON.stringify(data, null, 2))
  forwardToServer(eventName, data)
}

export default {
  pageViewed,
  identifyUser,
  trackAccountCreated,
  trackProductViewed,
  trackProductListViewed,
  trackProductAdded,
  trackProductRemoved,
  trackProductAddedToWishlist,
  trackCheckoutStarted,
}
