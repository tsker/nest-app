import { Component } from '@nestjs/common';
import { IsString, IsInt, IsOptional, IsNotEmpty, IsNumberString } from 'class-validator';
import { IsAge } from "../../middles/customer.validate";

export class TestModel {
	@IsNotEmpty({
		message: '名称不能为空'
	})
	readonly name: string;

	@IsOptional()
	@IsAge()
	readonly age: number;

	@IsOptional()
	@IsString()
	readonly breed: string;
}


@Component()
export class TestService {
	private list: TestModel[] = [];

	add(v: TestModel) {
		return new Promise((ok) => {
			this.list.push(v);
			ok();
		});
	}

	get(): any[] {
		return this.list;
	}
}
