"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_1 = require("cookie");
function getCartCookie(name, cartId, maxAge) {
    var options = cartId && maxAge
        ? {
            maxAge: maxAge,
            expires: new Date(Date.now() + maxAge * 1000),
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
        }
        : { maxAge: -1, path: '/' }; // Removes the cookie
    return cookie_1.serialize(name, cartId || '', options);
}
exports.default = getCartCookie;
