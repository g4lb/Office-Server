import * as Joi from 'joi';

export class LogsValidations {
  static employeeIdValidator(): Joi.ObjectSchema<unknown> {
    return Joi.object({
      employeeId: Joi.string(),
    });
  }
}
