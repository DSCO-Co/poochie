/**
 * This module provides a convenient interface for working with the Facebook Pixel library.
 *
 * The Facebook Pixel library utilizes a function named `fbq`, short for "Facebook Queue".
 * This `fbq` function is designed as a queue to handle events before the Facebook Pixel
 * library is fully loaded. When `fbq('track', 'PageView')` is called, for example, it places
 * the 'PageView' event into a queue. Once the Facebook Pixel library has loaded, it processes
 * all the events in the queue.
 *
 * This queuing mechanism ensures that no events are lost if they occur before the Facebook Pixel
 * library has fully loaded, which is crucial for accurately tracking user behavior on a website.
 *
 * The module exports an object with the `FB_PIXEL_ID`, `pageview`, and `event` properties.
 *
 * @module @lib/Analytics/fpixel
 */

export const FB_PIXEL_ID = '913797706554196' //TODO make this an env var

const pageview = () => {
  //@ts-ignore
  window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
const event = (name, options = {}) => {
  //@ts-ignore
  window.fbq('track', name, options)
}

const productView = (data) => {
  event('ViewContent', {
    value: data.price.value,
    currency: data.price.currencyCode,
    content_type: 'product', // required property
    content_ids: data.variants[0].sku, // required property, if not using 'contents' property
  });
}

const productAdded = (data) => {
    console.log('data:', data)
    event('AddToCart', {
      value: data.price.value,
      currency: data.price.currencyCode,
      content_type: 'product', // required property
      content_ids: data.variants[0].sku, // required property, if not using 'contents' property
    });
  }

const searchClicked = (data) => {
  event('Search', {
    value: data.product.sale_price ?? data.product.price,
		currency: 'USD',
		content_category: data.product.categories.lvl0[0],
		content_ids: data.product.variants[0].sku,
		search_string: data.query
    	});

  console.log("inside of pixel after fire: ", data);
}

export default {
  FB_PIXEL_ID,
  pageview,
  event,
  productView,
  productAdded,
  searchClicked,
}
