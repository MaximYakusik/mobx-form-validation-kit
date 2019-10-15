"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_1 = require("mobx");
var form_abstract_control_1 = require("./form-abstract-control");
var _ontrol_types_1 = require("./\u0441ontrol-types");
var FormControl = /** @class */ (function (_super) {
    tslib_1.__extends(FormControl, _super);
    function FormControl(
    /**
     * Initializing valueI
     * / Инициализирующие значение или его getter
     */
    value, 
    /**
     * Validators
     * / Валидаторы
     */
    validators, 
    /**
     * Callback get last valid value
     * / Передает последние валидное значение
     */
    callbackValidValue, 
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate, 
    /**
     * Additional information
     * / Блок с дополнительной информацией
     */
    additionalData) {
        if (validators === void 0) { validators = []; }
        if (callbackValidValue === void 0) { callbackValidValue = null; }
        if (activate === void 0) { activate = null; }
        if (additionalData === void 0) { additionalData = null; }
        var _this = _super.call(this, activate) || this;
        _this.callbackValidValue = callbackValidValue;
        _this.validators = [];
        _this.type = _ontrol_types_1.ControlTypes.Control;
        _this.isDirty = false;
        _this.isTouched = false;
        _this.isFocused = false;
        _this.installInitValue = function (value) {
            var isGetterValue;
            var valueGetter;
            if (value instanceof Function) {
                isGetterValue = true;
                valueGetter = value;
            }
            else {
                isGetterValue = false;
                valueGetter = function () { return value; };
            }
            _this.autoInstallDisposer && _this.autoInstallDisposer();
            _this.autoInstallDisposer = mobx_1.autorun(function () {
                _this.reactionOnInternalValueDisposer && _this.reactionOnInternalValueDisposer();
                _this.internalValue = valueGetter();
                _this.reactionOnInternalValueDisposer = mobx_1.reaction(function () { return _this.internalValue; }, function () {
                    _this.isDirty = true;
                    _this.serverErrors = [];
                    _this.checkInternalValue();
                    _this.onChange.call();
                });
                _this.checkInternalValue(!isGetterValue);
            });
        };
        _this.executeAsyncValidation = function (validator) {
            return _this.baseExecuteAsyncValidation(validator, function () {
                _this.serverErrors = [];
                _this.checkInternalValue();
            });
        };
        _this.runInAction = function (action) {
            return new Promise(function (resolve) {
                return _this.reactionOnValidatorDisposers.push(mobx_1.reaction(function () { return action().then(resolve); }, function () {
                    _this.serverErrors = [];
                    _this.checkInternalValue();
                }));
            });
        };
        _this.error = function (key) {
            return _this.errors.find(function (err) { return err.key === key; });
        };
        _this.setDirty = function (dirty) {
            _this.isDirty = dirty;
        };
        _this.setTouched = function (touched) {
            _this.isTouched = touched;
        };
        _this.setFocused = function (focused) {
            _this.isFocused = focused;
        };
        _this.dispose = function () {
            _this.baseDispose();
            _this.autoInstallDisposer && _this.autoInstallDisposer();
            _this.reactionOnInternalValueDisposer && _this.reactionOnInternalValueDisposer();
            _this.reactionOnIsActiveDisposer();
            _this.reactionOnIsDirtyDisposer();
            _this.reactionOnIsFocusedDisposer();
        };
        _this.checkInternalValue = function (emit) {
            if (emit === void 0) { emit = true; }
            _this.inProcessing = true;
            _this.onValidation(_this.validators, _this.checkInternalValue, function () {
                if (emit && _this.callbackValidValue && _this.errors.length === 0) {
                    _this.callbackValidValue(_this.internalValue);
                }
                _this.inProcessing = false;
            });
        };
        _this.validators = validators;
        _this.additionalData = additionalData;
        _this.installInitValue(value);
        _this.reactionOnIsActiveDisposer = mobx_1.reaction(function () { return _this.isActive; }, function () {
            _this.checkInternalValue();
            _this.onChange.call();
        });
        _this.reactionOnIsDirtyDisposer = mobx_1.reaction(function () { return _this.isDirty; }, function (isDirty) {
            if (isDirty) {
                _this.serverErrors = [];
            }
        });
        _this.reactionOnIsFocusedDisposer = mobx_1.reaction(function () { return _this.isFocused; }, function (isFocused) {
            if (!isFocused) {
                _this.serverErrors = [];
            }
        });
        return _this;
    }
    Object.defineProperty(FormControl.prototype, "processing", {
        get: function () {
            return this.inProcessing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "value", {
        get: function () {
            return this.internalValue;
        },
        set: function (value) {
            this.internalValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "invalid", {
        get: function () {
            return this.active && (this.errors.length > 0 || this.serverErrors.length > 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "valid", {
        get: function () {
            return this.disabled || (this.errors.length === 0 && this.serverErrors.length === 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "pristine", {
        get: function () {
            return !this.isDirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "dirty", {
        get: function () {
            return this.isDirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "untouched", {
        get: function () {
            return !this.isTouched;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "touched", {
        get: function () {
            return this.isTouched;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControl.prototype, "focused", {
        get: function () {
            return this.isFocused;
        },
        enumerable: true,
        configurable: true
    });
    FormControl.for = function (
    /**
     * Model object containing the editable field
     * Объект модели, содержащий редактируемое поле
     */
    model, 
    /**
     * Field name of the model to edit
     * Имя редактируемого поля модели
     */
    fieldName, 
    /**
     * Validations
     * Валидациии
     */
    validators, 
    /**
     * Function enable validation by condition (always enabled by default)
     * Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate, 
    /**
     * Additional information
     * Блок с дополнительной информацией
     */
    additionalData) {
        return new FormControl(model[fieldName], validators, function (value) { return (model[fieldName] = value); }, activate, additionalData);
    };
    tslib_1.__decorate([
        mobx_1.observable,
        tslib_1.__metadata("design:type", Object)
    ], FormControl.prototype, "internalValue", void 0);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormControl.prototype, "processing", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], FormControl.prototype, "value", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormControl.prototype, "invalid", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormControl.prototype, "valid", null);
    tslib_1.__decorate([
        mobx_1.observable,
        tslib_1.__metadata("design:type", Boolean)
    ], FormControl.prototype, "isDirty", void 0);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormControl.prototype, "pristine", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormControl.prototype, "dirty", null);
    tslib_1.__decorate([
        mobx_1.observable,
        tslib_1.__metadata("design:type", Boolean)
    ], FormControl.prototype, "isTouched", void 0);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormControl.prototype, "untouched", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormControl.prototype, "touched", null);
    tslib_1.__decorate([
        mobx_1.observable,
        tslib_1.__metadata("design:type", Boolean)
    ], FormControl.prototype, "isFocused", void 0);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormControl.prototype, "focused", null);
    tslib_1.__decorate([
        mobx_1.observable,
        tslib_1.__metadata("design:type", Object)
    ], FormControl.prototype, "additionalData", void 0);
    tslib_1.__decorate([
        mobx_1.action,
        tslib_1.__metadata("design:type", Object)
    ], FormControl.prototype, "error", void 0);
    tslib_1.__decorate([
        mobx_1.action,
        tslib_1.__metadata("design:type", Object)
    ], FormControl.prototype, "setDirty", void 0);
    tslib_1.__decorate([
        mobx_1.action,
        tslib_1.__metadata("design:type", Object)
    ], FormControl.prototype, "setTouched", void 0);
    tslib_1.__decorate([
        mobx_1.action,
        tslib_1.__metadata("design:type", Object)
    ], FormControl.prototype, "setFocused", void 0);
    tslib_1.__decorate([
        mobx_1.action,
        tslib_1.__metadata("design:type", Object)
    ], FormControl.prototype, "checkInternalValue", void 0);
    return FormControl;
}(form_abstract_control_1.FormAbstractControl));
exports.FormControl = FormControl;
//# sourceMappingURL=form-control.js.map