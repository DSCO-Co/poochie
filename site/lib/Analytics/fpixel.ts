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
 * @module @lib/mycode
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


export default {
    FB_PIXEL_ID,
    pageview,
    event,
  }