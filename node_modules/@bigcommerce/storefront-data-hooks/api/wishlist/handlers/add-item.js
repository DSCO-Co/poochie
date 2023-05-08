"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_customer_id_1 = __importDefault(require("../../operations/get-customer-id"));
var get_customer_wishlist_1 = __importDefault(require("../../operations/get-customer-wishlist"));
var parse_item_1 = require("../../utils/parse-item");
// Returns the wishlist of the signed customer
var addItem = function (_a) {
    var res = _a.res, _b = _a.body, customerToken = _b.customerToken, item = _b.item, config = _a.config;
    return __awaiter(void 0, void 0, void 0, function () {
        var customerId, _c, wishlist, options, data, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!item) {
                        return [2 /*return*/, res.status(400).json({
                                data: null,
                                errors: [{ message: 'Missing item' }],
                            })];
                    }
                    _c = customerToken;
                    if (!_c) return [3 /*break*/, 2];
                    return [4 /*yield*/, get_customer_id_1.default({ customerToken: customerToken, config: config })];
                case 1:
                    _c = (_e.sent());
                    _e.label = 2;
                case 2:
                    customerId = _c;
                    if (!customerId) {
                        return [2 /*return*/, res.status(400).json({
                                data: null,
                                errors: [{ message: 'Invalid request' }],
                            })];
                    }
                    return [4 /*yield*/, get_customer_wishlist_1.default({
                            variables: { customerId: customerId },
                            config: config,
                        })];
                case 3:
                    wishlist = (_e.sent()).wishlist;
                    options = {
                        method: 'POST',
                        body: JSON.stringify(wishlist
                            ? {
                                items: [parse_item_1.parseWishlistItem(item)],
                            }
                            : {
                                name: 'Wishlist',
                                customer_id: customerId,
                                items: [parse_item_1.parseWishlistItem(item)],
                                is_public: false,
                            }),
                    };
                    if (!wishlist) return [3 /*break*/, 5];
                    return [4 /*yield*/, config.storeApiFetch("/v3/wishlists/" + wishlist.id + "/items", options)];
                case 4:
                    _d = _e.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, config.storeApiFetch('/v3/wishlists', options)];
                case 6:
                    _d = _e.sent();
                    _e.label = 7;
                case 7:
                    data = (_d).data;
                    res.status(200).json({ data: data });
                    return [2 /*return*/];
            }
        });
    });
};
exports.default = addItem;
