//Source https://github.com/segmentio/react-example/blob/main/src/examples/analytics-quick-start/analytics.ts
import axios from 'axios'
import { AnalyticsWindow } from './types/Segment'

declare let window: AnalyticsWindow

/**
 * Basic Analytics calls
 */
export const pageViewed = async (
  name = 'John Doe',
  category = 'Default category'
) => {
    let data = await window.analytics.page()
    axios
      .post('/api/webhooks/stape', data)
      .then((response) => {
        console.log('Server response:', response.data)
      })
      .catch((error) => {
        console.error('Error sending event data:', error)
      })
  }

export const trackButtonClicked = (title: string) => {
  window.analytics.track('Button Clicked', {
    title,
  })
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

export const trackProductAdded = ({
  color,
  size,
}: {
  color: ShirtColor
  size: ShirtSize
}) => {
  const eventName = 'Product Added'
  window.analytics.track(eventName, {
    variant: color,
    size,
    ...defaultProductAddedProperties,
  })
}

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
export const trackProductViewed = ({
  title,
  author,
}: {
  title: string
  author: string
}) => {
  const eventName = 'Product Viewed'
  window.analytics.track(eventName, {
    title,
    author,
    ...defaultProductViewedProperties,
  })
}

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
