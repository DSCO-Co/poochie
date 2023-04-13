// // 
// // Description: This file contains all the events that are used in the application.
// // https://developers.google.com/analytics/devguides/collection/ga4/user-id?client_type=gtag
// // https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag
// // https://developers.google.com/analytics/devguides/collection/ga4/display-features?client_type=gtag


// const productImpression = (product) => ({
//     'ecommerce': {
//         'currencyCode': 'EUR',
//         'impressions': [
//             {
//                 'name': 'Triblend Android T-Shirt',
//                 'id': '12345',
//                 'price': '15.25',
//                 'brand': 'Google',
//                 'category': 'Apparel',
//                 'variant': 'Gray',
//                 'list': 'Search Results',
//                 'position': 1
//             },
//             {
//                 'name': 'Donut Friday Scented T-Shirt',
//                 'id': '67890',
//                 'price': '33.75',
//                 'brand': 'Google',
//                 'category': 'Apparel',
//                 'variant': 'Black',
//                 'list': 'Search Results',
//                 'position': 2
//             }]
//     }
// });

// const viewProductDetails = (product) => ({
//     'ecommerce': {
//         'detail': {
//             'actionField': { 'list': 'Apparel Gallery' },    // 'detail' actions have an optional list property.
//             'products': [{
//                 'name': 'Triblend Android T-Shirt',         // Name or ID is required.
//                 'id': '12345',
//                 'price': '15.25',
//                 'brand': 'Google',
//                 'category': 'Apparel',
//                 'variant': 'Gray'
//             }]
//         }
//     }
// });

// const productClick = (productObj) => ({
//     'event': 'productClick',
//     'ecommerce': {
//         'click': {
//             'actionField': { 'list': 'Search Results' },      // Optional list property.
//             'products': [{
//                 'name': productObj.name,                      // Name or ID is required.
//                 'id': productObj.id,
//                 'price': productObj.price,
//                 'brand': productObj.brand,
//                 'category': productObj.cat,
//                 'variant': productObj.variant,
//                 'position': productObj.position
//             }]
//         }
//     },
//     'eventCallback': function () {
//         document.location = productObj.url
//     }
// })

// const addToCart = (productObj) => ({
//     'event': 'addToCart',
//     'ecommerce': {
//         'currencyCode': 'EUR',
//         'add': {                                // 'add' actionFieldObject measures.
//             'products': [{                        //  adding a product to a shopping cart.
//                 'name': 'Triblend Android T-Shirt',
//                 'id': '12345',
//                 'price': '15.25',
//                 'brand': 'Google',
//                 'category': 'Apparel',
//                 'variant': 'Gray',
//                 'quantity': 1
//             }]
//         }
//     }
// });



// const removeFromCart = (productObj) => (
//     {
//         'event': 'removeFromCart',
//         'ecommerce': {
//             'remove': {                               // 'remove' actionFieldObject measures.
//                 'products': [{                          //  removing a product to a shopping cart.
//                     'name': 'Triblend Android T-Shirt',
//                     'id': '12345',
//                     'price': '15.25',
//                     'brand': 'Google',
//                     'category': 'Apparel',
//                     'variant': 'Gray',
//                     'quantity': 1
//                 }]
//             }
//         }
//     });

// const promoImpression = (promoObj) => ({
//     'ecommerce': {
//         'promoView': {
//             'promotions': [                     // Array of promoFieldObjects.
//                 {
//                     'id': 'JUNE_PROMO13',            // ID or Name is required.
//                     'name': 'June Sale',
//                     'creative': 'banner1',
//                     'position': 'slot1'
//                 },
//                 {
//                     'id': 'FREE_SHIP13',
//                     'name': 'Free Shipping Promo',
//                     'creative': 'skyscraper1',
//                     'position': 'slot2'
//                 }]
//         }
//     }
// });

// const promoClick = (promoObj) => ({
//     'event': 'promotionClick',
//     'ecommerce': {
//         'promoClick': {
//             'promotions': [
//                 {
//                     'id': promoObj.id,                         // Name or ID is required.
//                     'name': promoObj.name,
//                     'creative': promoObj.creative,
//                     'position': promoObj.pos
//                 }]
//         }
//     },
//     'eventCallback': function () {
//         document.location = promoObj.destinationUrl;
//     }
// });

// const checkout = () => ({
//     'event': 'checkout',
//     'ecommerce': {
//         'checkout': {
//             'actionField': { 'step': 1, 'option': 'Visa' },
//             'products': [{
//                 'name': 'Triblend Android T-Shirt',
//                 'id': '12345',
//                 'price': '15.25',
//                 'brand': 'Google',
//                 'category': 'Apparel',
//                 'variant': 'Gray',
//                 'quantity': 1
//             }]
//         }
//     },
//     'eventCallback': function () {
//         document.location = 'checkout.html';
//     }
// });

// const fullRefund = () => ({
//     'ecommerce': {
//         'refund': {
//             'actionField': { 'id': 'T12345' }         // Transaction ID. Required for purchases and refunds.
//         }
//     }
// });

// const partialRefund = () => ({
//     'ecommerce': {
//         'refund': {
//             'actionField': { 'id': 'T12345' },        // Transaction ID.
//             'products': [
//                 { 'id': 'P4567', 'quantity': 1 },   // Product ID and quantity. Required for partial refunds.
//                 { 'id': 'P8901', 'quantity': 2 }
//             ]
//         }
//     }
// });

// const purchase = () => ({
//     'ecommerce': {
//         'purchase': {
//             'actionField': {
//                 'id': 'T12345',                         // Transaction ID. Required for purchases and refunds.
//                 'affiliation': 'Online Store',
//                 'revenue': '35.43',                     // Total transaction value (incl. tax and shipping)
//                 'tax': '4.90',
//                 'shipping': '5.99',
//                 'coupon': 'SUMMER_SALE'
//             },
//             'products': [{                            // List of productFieldObjects.
//                 'name': 'Triblend Android T-Shirt',     // Name or ID is required.
//                 'id': '12345',
//                 'price': '15.25',
//                 'brand': 'Google',
//                 'category': 'Apparel',
//                 'variant': 'Gray',
//                 'quantity': 1,
//                 'coupon': ''                            // Optional fields may be omitted or set to empty string.
//             },
//             {
//                 'name': 'Donut Friday Scented T-Shirt',
//                 'id': '67890',
//                 'price': '33.75',
//                 'brand': 'Google',
//                 'category': 'Apparel',
//                 'variant': 'Black',
//                 'quantity': 1
//             }]
//         }
//     }
// });

// const viewItemList = () => ({
//     'event': 'view_item_list',
//     'ecommerce': {
//         "view_item_list": {
//             "item_list_id": "related_products",
//             "item_list_name": "Related products",
//             "items": [
//                 {
//                     "item_id": "SKU_12345",
//                     "item_name": "Stan and Friends Tee",
//                     "affiliation": "Google Merchandise Store",
//                     "coupon": "SUMMER_FUN",
//                     "discount": 2.22,
//                     "index": 0,
//                     "item_brand": "Google",
//                     "item_category": "Apparel",
//                     "item_category2": "Adult",
//                     "item_category3": "Shirts",
//                     "item_category4": "Crew",
//                     "item_category5": "Short sleeve",
//                     "item_list_id": "related_products",
//                     "item_list_name": "Related Products",
//                     "item_variant": "green",
//                     "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
//                     "price": 9.99,
//                     "quantity": 1
//                 }
//             ]
//         }
//     }
// });

// const selectItem = () => ({
//     "event": "select_item",
//     "ecommerce": {
//         "view_item_list": {
//             "item_list_id": "related_products",
//             "item_list_name": "Related products",
//             "items": [
//                 {
//                     "item_id": "SKU_12345",
//                     "item_name": "Stan and Friends Tee",
//                     "affiliation": "Google Merchandise Store",
//                     "coupon": "SUMMER_FUN",
//                     "discount": 2.22,
//                     "index": 0,
//                     "item_brand": "Google",
//                     "item_category": "Apparel",
//                     "item_category2": "Adult",
//                     "item_category3": "Shirts",
//                     "item_category4": "Crew",
//                     "item_category5": "Short sleeve",
//                     "item_list_id": "related_products",
//                     "item_list_name": "Related Products",
//                     "item_variant": "green",
//                     "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
//                     "price": 9.99,
//                     "quantity": 1
//                 }
//             ]
//         }
//     }
// });

// const exception = () => ({
//     "event": "exception",
//     "ecommerce": {
//         "exception": {
//             "description": "error_description",
//             "fatal": false   // set to true if the error is fatal
//         }
//     }
// });

// /*
// // Set user ID using signed-in user_id.
// gtag('config', 'TAG_ID', {
//   'user_id': 'USER_ID'
// });
// */


// const ecommerce = {
//     productImpression,
//     viewProductDetails,
//     productClick,
//     addToCart,
//     removeFromCart,
//     promoImpression,
//     promoClick,
//     checkout,
//     fullRefund,
//     partialRefund,
//     purchase

// }

// const measure = (method, product) => {

//     // @ts-ignore
//     const dataLayer = window.dataLayer = window.dataLayer || [];
//     dataLayer.push({ ecommerce: null });
//     dataLayer.push(ecommerce[method](product));
// }

export {}