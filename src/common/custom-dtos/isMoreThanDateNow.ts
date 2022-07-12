import { registerDecorator, ValidationOptions } from 'class-validator';

export function isMoreThanDateNow(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isMoreThanDateNow',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Date.parse(value) > Date.now();
        },
      },
    });
  };
}
