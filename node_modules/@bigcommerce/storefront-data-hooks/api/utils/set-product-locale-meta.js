"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setProductLocaleMeta(node) {
    var _a;
    if ((_a = node.localeMeta) === null || _a === void 0 ? void 0 : _a.edges) {
        node.localeMeta.edges = node.localeMeta.edges.filter(function (edge) {
            var _a;
            var _b = (_a = edge === null || edge === void 0 ? void 0 : edge.node) !== null && _a !== void 0 ? _a : {}, key = _b.key, value = _b.value;
            if (key && key in node) {
                ;
                node[key] = value;
                return false;
            }
            return true;
        });
        if (!node.localeMeta.edges.length) {
            delete node.localeMeta;
        }
    }
}
exports.default = setProductLocaleMeta;
