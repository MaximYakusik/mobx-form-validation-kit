import { ValidationEvent } from './validation-event';

export const combineErrors = (groutErrors: ValidationEvent[][]) =>
  groutErrors.reduce((acumulator, value) => [...acumulator, ...value]).filter(err => !!err);
