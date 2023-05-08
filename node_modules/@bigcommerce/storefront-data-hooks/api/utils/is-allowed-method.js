"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function isAllowedMethod(req, res, allowedMethods) {
    var methods = allowedMethods.includes('OPTIONS')
        ? allowedMethods
        : __spreadArrays(allowedMethods, ['OPTIONS']);
    if (!req.method || !methods.includes(req.method)) {
        res.status(405);
        res.setHeader('Allow', methods.join(', '));
        res.end();
        return false;
    }
    if (req.method === 'OPTIONS') {
        res.status(200);
        res.setHeader('Allow', methods.join(', '));
        res.setHeader('Content-Length', '0');
        res.end();
        return false;
    }
    return true;
}
exports.default = isAllowedMethod;
