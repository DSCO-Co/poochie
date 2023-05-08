"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatVariantPrice = exports.formatPrice = void 0;
var react_1 = require("react");
var _1 = require(".");
function formatPrice(_a) {
    var amount = _a.amount, currencyCode = _a.currencyCode, locale = _a.locale;
    var formatCurrency = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    });
    return formatCurrency.format(amount);
}
exports.formatPrice = formatPrice;
function formatVariantPrice(_a) {
    var amount = _a.amount, baseAmount = _a.baseAmount, currencyCode = _a.currencyCode, locale = _a.locale;
    var hasDiscount = baseAmount > amount;
    var formatDiscount = new Intl.NumberFormat(locale, { style: 'percent' });
    var discount = hasDiscount
        ? formatDiscount.format((baseAmount - amount) / baseAmount)
        : null;
    var price = formatPrice({ amount: amount, currencyCode: currencyCode, locale: locale });
    var basePrice = hasDiscount
        ? formatPrice({ amount: baseAmount, currencyCode: currencyCode, locale: locale })
        : null;
    return { price: price, basePrice: basePrice, discount: discount };
}
exports.formatVariantPrice = formatVariantPrice;
function usePrice(data) {
    var _a = data !== null && data !== void 0 ? data : {}, amount = _a.amount, baseAmount = _a.baseAmount, currencyCode = _a.currencyCode;
    var locale = _1.useCommerce().locale;
    var value = react_1.useMemo(function () {
        if (typeof amount !== 'number' || !currencyCode)
            return '';
        return baseAmount
            ? formatVariantPrice({ amount: amount, baseAmount: baseAmount, currencyCode: currencyCode, locale: locale })
            : formatPrice({ amount: amount, currencyCode: currencyCode, locale: locale });
    }, [amount, baseAmount, currencyCode]);
    return typeof value === 'string' ? { price: value } : value;
}
exports.default = usePrice;
