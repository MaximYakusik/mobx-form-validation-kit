"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_1 = require("mobx");
var delegate_1 = require("./delegate");
var validation_event_types_1 = require("./validation-event-types");
var utilites_1 = require("./utilites");
var AbstractControl = /** @class */ (function () {
    function AbstractControl(
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate) {
        var _this = this;
        if (activate === void 0) { activate = null; }
        this.reactionOnValidatorDisposers = [];
        /**
         * The field contains errors
         * / Поле содержит ошибки
         */
        this.errors = [];
        this._serverErrors = [];
        /**
         * Callback function of on change
         * / Сообщает факт изменения данных
         */
        this.onChange = new delegate_1.Delegate();
        this.newRequestValidation = 0;
        this.onValidation = function (validators, onValidationFunction, afterCheck) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var haveRequestValidation, groupErrors, oldRequestValidation, errorsPromises, events;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        haveRequestValidation = this.newRequestValidation !== 0;
                        // tslint:disable-next-line: no-increment-decrement
                        this.newRequestValidation++;
                        this.lastValidators = validators;
                        this.lastValidationFunction = onValidationFunction;
                        if (haveRequestValidation) {
                            return [2 /*return*/];
                        }
                        oldRequestValidation = 0;
                        _a.label = 1;
                    case 1:
                        oldRequestValidation = this.newRequestValidation;
                        this.reactionOnValidatorDisposers.forEach(function (r) { return r(); });
                        this.reactionOnValidatorDisposers = [];
                        if (!this.active) return [3 /*break*/, 3];
                        errorsPromises = this.lastValidators.map(function (validator) {
                            var isFirstReaction = true;
                            return new Promise(function (resolve) {
                                return _this.reactionOnValidatorDisposers.push(mobx_1.reaction(function () {
                                    var result;
                                    if (isFirstReaction) {
                                        result = validator(_this).then(resolve);
                                    }
                                    isFirstReaction = false;
                                    return result;
                                }, _this.lastValidationFunction));
                            });
                        });
                        return [4 /*yield*/, Promise.all(errorsPromises)];
                    case 2:
                        groupErrors = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        groupErrors = [];
                        _a.label = 4;
                    case 4:
                        if (oldRequestValidation !== this.newRequestValidation) return [3 /*break*/, 1];
                        _a.label = 5;
                    case 5:
                        this.newRequestValidation = 0;
                        events = groupErrors && groupErrors.length > 0 ? utilites_1.combineErrors(groupErrors) : [];
                        return [2 /*return*/, mobx_1.runInAction(function () {
                                _this.errors = events.filter(function (e) { return e.type === validation_event_types_1.ValidationEventTypes.Error; });
                                _this.warnings = events.filter(function (e) { return e.type === validation_event_types_1.ValidationEventTypes.Warning; });
                                _this.informationMessages = events.filter(function (e) { return e.type === validation_event_types_1.ValidationEventTypes.Info; });
                                _this.successes = events.filter(function (e) { return e.type === validation_event_types_1.ValidationEventTypes.Success; });
                                afterCheck();
                            })];
                }
            });
        }); };
        this.baseDispose = function () {
            var e_1, _a;
            _this.onChange.dispose();
            _this.reactionOnIsActiveFuncDisposer();
            try {
                for (var _b = tslib_1.__values(_this.reactionOnValidatorDisposers), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var reactionOnValidator = _c.value;
                    reactionOnValidator();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        this.baseExecuteAsyncValidation = function (validator, onValidationFunction) {
            var isFirstReaction = true;
            return new Promise(function (resolve) {
                return _this.reactionOnValidatorDisposers.push(mobx_1.reaction(function () {
                    var result;
                    if (isFirstReaction) {
                        result = validator(_this).then(resolve);
                    }
                    isFirstReaction = false;
                    return result;
                }, onValidationFunction));
            });
        };
        this.inProcessing = false;
        var isActiveFunc = activate === null ? function () { return true; } : activate;
        // !!! Не менять на fireImmediately !!!!
        this.isActive = isActiveFunc();
        this.reactionOnIsActiveFuncDisposer = mobx_1.reaction(isActiveFunc, function (isActive) {
            _this.isActive = isActive;
        });
    }
    Object.defineProperty(AbstractControl.prototype, "disabled", {
        /**
         * Error checking is disabled (control is always valid)
         * / Проверка ошибок отключена (контрол всегда валиден)
         */
        get: function () {
            return !this.isActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "active", {
        /**
         * Error checking enabled
         * / Проверка ошибок включена
         */
        get: function () {
            return this.isActive;
        },
        enumerable: true,
        configurable: true
    });
    AbstractControl.prototype.hasErrors = function () {
        return (!!this.errors && this.errors.length > 0) || (!!this._serverErrors && this._serverErrors.length > 0);
    };
    AbstractControl.prototype.hasWarnings = function () {
        return !!this.warnings && this.warnings.length > 0;
    };
    AbstractControl.prototype.hasInformationMessages = function () {
        return !!this.informationMessages && this.informationMessages.length > 0;
    };
    AbstractControl.prototype.hasSuccesses = function () {
        return !!this.successes && this.successes.length > 0;
    };
    Object.defineProperty(AbstractControl.prototype, "maxEventLevel", {
        /**
         * Current message display level
         * / Текущий уровень отображения сообщении
         */
        get: function () {
            if (this.hasErrors())
                return validation_event_types_1.ValidationEventTypes.Error;
            if (this.hasWarnings())
                return validation_event_types_1.ValidationEventTypes.Warning;
            if (this.hasInformationMessages())
                return validation_event_types_1.ValidationEventTypes.Info;
            return validation_event_types_1.ValidationEventTypes.Success;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "serverErrors", {
        /**
         * Additional (server) errors
         * / Дополнительтные (серверные) ошибки
         */
        get: function () {
            return this._serverErrors;
        },
        /**
         * Additional (server) errors
         * / Пополнительтные (серверные) ошибки
         */
        set: function (value) {
            this._serverErrors = value || [];
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        mobx_1.observable,
        tslib_1.__metadata("design:type", Boolean)
    ], AbstractControl.prototype, "inProcessing", void 0);
    tslib_1.__decorate([
        mobx_1.observable,
        tslib_1.__metadata("design:type", Boolean)
    ], AbstractControl.prototype, "isActive", void 0);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], AbstractControl.prototype, "disabled", null);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [])
    ], AbstractControl.prototype, "active", null);
    tslib_1.__decorate([
        mobx_1.observable.ref,
        tslib_1.__metadata("design:type", Array)
    ], AbstractControl.prototype, "errors", void 0);
    tslib_1.__decorate([
        mobx_1.observable.ref,
        tslib_1.__metadata("design:type", Array)
    ], AbstractControl.prototype, "warnings", void 0);
    tslib_1.__decorate([
        mobx_1.observable.ref,
        tslib_1.__metadata("design:type", Array)
    ], AbstractControl.prototype, "informationMessages", void 0);
    tslib_1.__decorate([
        mobx_1.observable.ref,
        tslib_1.__metadata("design:type", Array)
    ], AbstractControl.prototype, "successes", void 0);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [])
    ], AbstractControl.prototype, "maxEventLevel", null);
    tslib_1.__decorate([
        mobx_1.observable,
        tslib_1.__metadata("design:type", Array)
    ], AbstractControl.prototype, "_serverErrors", void 0);
    tslib_1.__decorate([
        mobx_1.computed,
        tslib_1.__metadata("design:type", Array),
        tslib_1.__metadata("design:paramtypes", [Array])
    ], AbstractControl.prototype, "serverErrors", null);
    tslib_1.__decorate([
        mobx_1.action,
        tslib_1.__metadata("design:type", Object)
    ], AbstractControl.prototype, "onValidation", void 0);
    return AbstractControl;
}());
exports.AbstractControl = AbstractControl;
//# sourceMappingURL=abstract-control.js.map