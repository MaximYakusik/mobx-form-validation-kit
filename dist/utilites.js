"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.combineErrors = function (groutErrors) {
    return groutErrors.reduce(function (acumulator, value) { return tslib_1.__spread(acumulator, value); }).filter(function (err) { return !!err; });
};
//# sourceMappingURL=utilites.js.map