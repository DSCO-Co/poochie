export const GA_TRACKING_ID = "G-TPLY46GGYY" 

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = (url) => {
  //@ts-ignore
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}


const productView = () => {
  //@ts-ignore
  window.gtag("event", "view_item", {
    currency: "USD",
    value: 7.77,
    items: [
      {
        item_id: "SKU_12345",
        item_name: "Stan and Friends Tee",
        affiliation: "Google Merchandise Store",
        coupon: "SUMMER_FUN",
        discount: 2.22,
        index: 0,
        item_brand: "Google",
        item_category: "Apparel",
        item_category2: "Adult",
        item_category3: "Shirts",
        item_category4: "Crew",
        item_category5: "Short sleeve",
        item_list_id: "related_products",
        item_list_name: "Related Products",
        item_variant: "green",
        location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
        price: 9.99,
        quantity: 1
      }
    ]
  });
}


// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = ({ action, category, label, value }) => {
  //@ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

export default {
  pageview,
  event,
  productView,
}