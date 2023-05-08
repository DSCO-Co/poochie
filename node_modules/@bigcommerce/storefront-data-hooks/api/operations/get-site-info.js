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
exports.getSiteInfoQuery = void 0;
var filter_edges_1 = __importDefault(require("../utils/filter-edges"));
var __1 = require("..");
var category_tree_1 = require("../fragments/category-tree");
// Get 3 levels of categories
exports.getSiteInfoQuery = "\n  query getSiteInfo {\n    site {\n      categoryTree {\n        ...categoryTreeItem\n        children {\n          ...categoryTreeItem\n          children {\n            ...categoryTreeItem\n          }\n        }\n      }\n      brands {\n        pageInfo {\n          startCursor\n          endCursor\n        }\n        edges {\n          cursor\n          node {\n            entityId\n            name\n            defaultImage {\n              urlOriginal\n              altText\n            }\n            pageTitle\n            metaDesc\n            metaKeywords\n            searchKeywords\n            path\n          }\n        }\n      }\n    }\n  }\n  " + category_tree_1.categoryTreeItemFragment + "\n";
function getSiteInfo(_a) {
    var _b, _c, _d, _e;
    var _f = _a === void 0 ? {} : _a, _g = _f.query, query = _g === void 0 ? exports.getSiteInfoQuery : _g, variables = _f.variables, config = _f.config;
    return __awaiter(this, void 0, void 0, function () {
        var data, categories, brands;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    config = __1.getConfig(config);
                    return [4 /*yield*/, config.fetch(query, { variables: variables })];
                case 1:
                    data = (_h.sent()).data;
                    categories = (_b = data.site) === null || _b === void 0 ? void 0 : _b.categoryTree;
                    brands = (_d = (_c = data.site) === null || _c === void 0 ? void 0 : _c.brands) === null || _d === void 0 ? void 0 : _d.edges;
                    return [2 /*return*/, {
                            categories: (_e = categories) !== null && _e !== void 0 ? _e : [],
                            brands: filter_edges_1.default(brands),
                        }];
            }
        });
    });
}
exports.default = getSiteInfo;
