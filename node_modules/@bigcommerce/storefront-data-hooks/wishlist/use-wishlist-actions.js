"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var use_add_item_1 = __importDefault(require("./use-add-item"));
var use_remove_item_1 = __importDefault(require("./use-remove-item"));
// This hook is probably not going to be used, but it's here
// to show how a commerce should be structuring it
function useWishlistActions() {
    var addItem = use_add_item_1.default();
    var removeItem = use_remove_item_1.default();
    return { addItem: addItem, removeItem: removeItem };
}
exports.default = useWishlistActions;
