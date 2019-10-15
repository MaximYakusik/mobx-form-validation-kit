"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_1 = require("mobx");
var abstract_control_1 = require("./abstract-control");
var FormAbstractGroup = /** @class */ (function (_super) {
    tslib_1.__extends(FormAbstractGroup, _super);
    function FormAbstractGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FormAbstractGroup.prototype, "processing", {
        get: function () {
            return this.inProcessing || this.abbreviatedOR(function (control) { return control.processing; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "invalid", {
        get: function () {
            return this.active && (this.errors.length > 0 || this.serverErrors.length > 0 || this.abbreviatedOR(function (control) { return control.invalid; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "valid", {
        get: function () {
            return this.disabled || (this.errors.length === 0 && this.serverErrors.length === 0 && this.abbreviatedAND(function (control) { return control.valid; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "pristine", {
        get: function () {
            return this.abbreviatedAND(function (control) { return control.pristine; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "dirty", {
        get: function () {
            return this.abbreviatedOR(function (control) { return control.dirty; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "untouched", {
        get: function () {
            return this.abbreviatedAND(function (control) { return control.untouched; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "touched", {
        get: function () {
            return this.abbreviatedOR(function (control) { return control.touched; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractGroup.prototype, "focused", {
        get: function () {
            return this.abbreviatedOR(function (control) { return control.focused; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Waiting for end of validation
     * Ожидание окончания проверки
     */
    FormAbstractGroup.prototype.wait = function () {
        var _this = this;
        return mobx_1.when(function () { return !_this.processing; });
    };
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormAbstractGroup.prototype, "processing", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormAbstractGroup.prototype, "invalid", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormAbstractGroup.prototype, "valid", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormAbstractGroup.prototype, "pristine", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormAbstractGroup.prototype, "dirty", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormAbstractGroup.prototype, "untouched", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormAbstractGroup.prototype, "touched", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormAbstractGroup.prototype, "focused", null);
    tslib_1.__decorate([
        mobx_1.action,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Promise)
    ], FormAbstractGroup.prototype, "wait", null);
    return FormAbstractGroup;
}(abstract_control_1.AbstractControl));
exports.FormAbstractGroup = FormAbstractGroup;
//# sourceMappingURL=form-abstract-group.js.map