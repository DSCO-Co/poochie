"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterEdges(edges) {
    var _a;
    return (_a = edges === null || edges === void 0 ? void 0 : edges.filter(function (edge) { return !!edge; })) !== null && _a !== void 0 ? _a : [];
}
exports.default = filterEdges;
