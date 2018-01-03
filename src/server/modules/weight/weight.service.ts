import { Component, Inject } from '@nestjs/common';
import { weightCollectToken } from '../../utils/config';

@Component()
export class WeightService {
	constructor(@Inject(weightCollectToken) private Collection: any) {}

	async add(data) {
		let weight = new this.Collection(data);
		await weight.save();
		return weight;
	}

	get(param?) {
		return this.Collection.find();
	}
}
