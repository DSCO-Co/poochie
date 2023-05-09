import axios from 'axios'
import { AnalyticsWindow } from '@lib/Analytics/Segment/types/Segment'
import gtag from '@lib/Analytics/gtag'
import segment from '@lib/Analytics/Segment/segmentAnalytics'

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
export const pageViewed = async (url) => {
  segment.pageViewed()
  gtag.pageview(url)
}

export const identifyUser = (name: string) => {
  window.analytics.identify({
    name,
  })
}

/**
 * B2B SaaS calls
 */
export const trackAccountCreated = (accountName: string) => {
  const eventName = 'Account Created'
  window.analytics.track(eventName, {
    account_name: accountName,
  })
}

/**
 * eCommerce Analytics calls
 */
export const trackProductViewed = async (product: any) => {
  //Cometly
  //@ts-ignore
  window.comet('view_content');
  //gtag
  gtag.productView()
  //Segment
  segment.trackProductViewed(product)
}

export const trackProductListViewed = async (
  products: any[],
  category: string
) => {
  const eventName = 'Product List Viewed'
  const trackedProducts = {
    clientUserAgent: navigator.userAgent,
    products: products,
    category: category,
  }
  let data = await window.analytics.track(eventName, trackedProducts)
  console.log('Product List Viewed data:', data)
}

export const trackProductAdded = async (product: any) => {
  //Cometly
  //@ts-ignore
  window.comet('add_to_cart');
  
  //Segment
  const eventName = 'Product Added'
  let data = await window.analytics.track(eventName, { product })
  console.log('Product Added data:', data)
  forwardToServer(eventName, data)
}

export const trackProductRemoved = async () => {
  const eventName = 'Product Removed'
  let data = await window.analytics.track(eventName, {})
  console.log('Product Removed data:', data)
  forwardToServer(eventName, data)
}

export const trackProductAddedToWishlist = async () => {
  const eventName = 'Product Added to Wishlist'
  let data = await window.analytics.track(eventName, {})
  console.log('Product Added to Wishlist', data)
  forwardToServer(eventName, data)
}

export const trackCheckoutStarted = async (cartData: any) => {
  const eventName = 'Checkout Started'
  console.log('Checkout Started data:', cartData)
  let data = await window.analytics.track(eventName, { cartData })
  console.log('Checkout Started data:', JSON.stringify(data, null, 2))
  forwardToServer(eventName, data)
}
