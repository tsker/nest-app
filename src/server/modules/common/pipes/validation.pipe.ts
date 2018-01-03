import { HttpException } from '@nestjs/core';
import { PipeTransform, Pipe, ArgumentMetadata, HttpStatus } from '@nestjs/common';

@Pipe()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value, metadata: ArgumentMetadata) {
		console.log(value, metadata)
		return value;
	}
}
