//Source https://github.com/segmentio/react-example/blob/main/src/examples/analytics-quick-start/analytics.ts
import * as gtag from '@lib/gtag';
import { AnalyticsWindow } from './types/Segment';

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

  if (data.event) {
    // @ts-ignore
    data.event.context.clientUserAgent = navigator.userAgent;
  }
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


export const trackProductViewed = async (product: any) => {
  const eventName = 'Product Viewed'
  product.clientUserAgent = navigator.userAgent;
  // let data = await window.analytics.track(eventName, { product })

  const data = {
    action: 'view_item',
    category: 'ecommerce',
    label: product.name,
    value: product.price,
    items: [
      {
        item_id: product?.variants[0]?.sku,
        item_name: product.name,
        // item_brand: product.brand,
      }

    ]
  }

  gtag.event(data)

  // console.log('Product Viewed data:', data)
  console.log(`------------------`);
  console.log('Product Viewed data:', data);
}


export const trackProductAdded = async (product: any) => {
  const eventName = 'Product Added'
  // let data = await window.analytics.track(eventName, { product })


  const data = {
    action: 'add_to_cart',
    category: 'ecommerce',
    label: product.name,
    value: product.price,
    items: [
      {
        item_id: product?.variants[0]?.sku,
        item_name: product.name,
        // item_brand: product.brand,
      }

    ]
  }

  console.log('Product Added data:', data);

  gtag.event(data)

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




