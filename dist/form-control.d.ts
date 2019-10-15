import { ValidationEvent } from './validation-event';
import { ValidatorFunctionFormControlHandler, UpdateValidValueHandler } from './events';
import { FormAbstractControl } from './form-abstract-control';
import { ControlTypes } from './сontrol-types';
export declare class FormControl<TEntity = string, TAdditionalData = any> extends FormAbstractControl {
    /**
     * Callback get last valid value
     * / Передает последние валидное значение
     */
    private callbackValidValue;
    private autoInstallDisposer;
    private reactionOnInternalValueDisposer;
    private readonly reactionOnIsActiveDisposer;
    private readonly reactionOnIsDirtyDisposer;
    private readonly reactionOnIsFocusedDisposer;
    private validators;
    readonly type: ControlTypes;
    private internalValue;
    readonly processing: boolean;
    value: TEntity;
    readonly invalid: boolean;
    readonly valid: boolean;
    private isDirty;
    readonly pristine: boolean;
    readonly dirty: boolean;
    private isTouched;
    readonly untouched: boolean;
    readonly touched: boolean;
    private isFocused;
    readonly focused: boolean;
    additionalData: TAdditionalData;
    static for<M extends Object, K extends keyof M, TAdditionalData = any>(
    /**
     * Model object containing the editable field
     * Объект модели, содержащий редактируемое поле
     */
    model: M, 
    /**
     * Field name of the model to edit
     * Имя редактируемого поля модели
     */
    fieldName: K, 
    /**
     * Validations
     * Валидациии
     */
    validators?: ValidatorFunctionFormControlHandler<M[K]>[], 
    /**
     * Function enable validation by condition (always enabled by default)
     * Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate?: () => boolean, 
    /**
     * Additional information
     * Блок с дополнительной информацией
     */
    additionalData?: TAdditionalData): FormControl<M[K]>;
    constructor(
    /**
     * Initializing valueI
     * / Инициализирующие значение или его getter
     */
    value: TEntity | (() => TEntity), 
    /**
     * Validators
     * / Валидаторы
     */
    validators?: ValidatorFunctionFormControlHandler<TEntity>[], 
    /**
     * Callback get last valid value
     * / Передает последние валидное значение
     */
    callbackValidValue?: UpdateValidValueHandler<TEntity> | null, 
    /**
     * Function enable validation by condition (always enabled by default)
     * / Функция включение валидаций по условию (по умолчанию включено всегда)
     */
    activate?: (() => boolean) | null, 
    /**
     * Additional information
     * / Блок с дополнительной информацией
     */
    additionalData?: TAdditionalData | null);
    installInitValue: (value: TEntity | (() => TEntity)) => void;
    executeAsyncValidation: (validator: (control: FormControl<TEntity, any>) => Promise<ValidationEvent[]>) => Promise<ValidationEvent[]>;
    runInAction: <TData = void>(action: () => Promise<TData>) => Promise<TData>;
    error: (key: string) => ValidationEvent;
    setDirty: (dirty: boolean) => void;
    setTouched: (touched: boolean) => void;
    setFocused: (focused: boolean) => void;
    dispose: () => void;
    private checkInternalValue;
}
