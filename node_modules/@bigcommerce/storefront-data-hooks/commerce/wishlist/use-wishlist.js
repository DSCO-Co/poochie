"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var use_data_1 = __importDefault(require("../utils/use-data"));
function useWishlist(options, input, fetcherFn, swrOptions) {
    var response = use_data_1.default(options, input, fetcherFn, swrOptions);
    return Object.assign(response, { isEmpty: true });
}
exports.default = useWishlist;
