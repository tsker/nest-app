import { Component, Inject } from '@nestjs/common';

import { weightCollectToken } from '../../utils/config';
import { isEffNumber } from '../../middles/customer.validate';

export class WeightModel {
	@isEffNumber() value: number;

	date: string;
}

@Component()
export class WeightService {
	constructor(@Inject(weightCollectToken) private WeightColl: any) {}

	async add(data: WeightModel) {
		let weight = new this.WeightColl(data);
		await weight.save();
		return weight;
	}

	get(param?): WeightModel[] {
		return this.WeightColl.find();
	}
}
