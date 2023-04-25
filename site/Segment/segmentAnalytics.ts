//Source https://github.com/segmentio/react-example/blob/main/src/examples/analytics-quick-start/analytics.ts
import axios from 'axios'
import { AnalyticsWindow } from './types/Segment'

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
export const pageViewed = async (
  name = 'John Doe',
  category = 'Default category'
) => {
  let data = await window.analytics.page()
  // @ts-ignore
  data.event.context.clientUserAgent = navigator.userAgent;
  console.log('Page Viewed data:', data)
  forwardToServer('Page Viewed', data)
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

// export const trackProductSearched = (formValue: string) => {
//   const eventName = "Product Searched"
//   window.analytics.track(eventName, {
//     query: formValue,
//   })
// }

export const defaultProductViewedProperties = {
  product_id: 'PRODUCT_ID',
  sku: 'SKU',
  category: 'Home',
  variant: 'VARIANT',
  price: 18.99,
  quantity: 1,
  coupon: 'COUPON',
  currency: 'USD',
  value: 18.99,
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg',
}

interface ProductImage {
  url: string
}

interface ProductVariant {
  id: string
  name: string
  sku: string
}

interface Product {
  description?: string
  id: string
  images: ProductImage[]
  name: string
  options?: unknown
  path: string
  price: number
  slug?: string
  variants: ProductVariant[]
}

export const trackProductViewed = async (product: any) => {
  const eventName = 'Product Viewed'
  product.clientUserAgent = navigator.userAgent;
  let data = await window.analytics.track(eventName, { product })
  console.log('Product Viewed data:', data)
}

export const defaultProductAddedProperties = {
  cart_id: 'CART_ID',
  product_id: 'PRODUCT_ID',
  sku: 'SKU',
  category: 'CATEGORY',
  name: 'Basic Shirt',
  brand: 'BRAND',
  price: 18.99,
  quantity: 1,
  coupon: 'COUPON',
  url: 'https://www.example.com/product/path',
  image_url: 'https://www.example.com/product/path.jpg',
}

export const trackProductAdded = async () => {
  const eventName = 'Product Added'
  let data = await window.analytics.track(eventName, {})
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
  console.log('Checkout Started data:', data)
  forwardToServer(eventName, data)
}



// export const trackProductSearched = (formValue: string) => {
//   const eventName = "Product Searched"
//   window.analytics.track(eventName, {
//     query: formValue,
//   })
// }


// export const defaultPromotionClickedProperties = {
//   promotion_id: "promo_1",
//   creative: "button_example",
//   position: "ecommerce_examples",
// }
// export const trackPromotionClicked = (percentage: string) => {
//   const eventName = "Promotion Clicked"
//   window.analytics.track(eventName, {
//     name: `${percentage}_off_next_order`,
//     ...defaultPromotionClickedProperties,
//   })
// }
