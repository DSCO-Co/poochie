"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_cookie_1 = __importDefault(require("js-cookie"));
var use_data_1 = __importDefault(require("../utils/use-data"));
var __1 = require("..");
function useCart(options, input, fetcherFn, swrOptions) {
    var cartCookie = __1.useCommerce().cartCookie;
    var fetcher = function (options, input, fetch) {
        input.cartId = js_cookie_1.default.get(cartCookie);
        return fetcherFn(options, input, fetch);
    };
    var response = use_data_1.default(options, input, fetcher, swrOptions);
    return Object.assign(response, { isEmpty: true });
}
exports.default = useCart;
