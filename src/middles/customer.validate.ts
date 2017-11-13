import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments
} from 'class-validator';

function makeValidationDec(cb) {
	return function(validationOptions?: ValidationOptions) {
		return function(object: Object, propertyName: string) {
			registerDecorator({
				target: object.constructor,
				propertyName: propertyName,
				options: validationOptions,
				constraints: [],
				validator: {
					validate(value: any, args: ValidationArguments) {
						return cb(value);
					}
				}
			});
		};
	};
}

export const IsAge = makeValidationDec(
	(value) => typeof value === 'string' && /[1-9][0-9]?[0-9]?/.test(value)
);
