import { Component } from '@nestjs/common';
import { IsNumberString} from "class-validator";
import * as fs from 'fs';

export class WeightModel {
	@IsNumberString()
	value: number;

	date: string;
}

@Component()
export class WeightService {
	private filename = __dirname + '/data.json';
	private list: WeightModel[] = [];

	add(w: WeightModel) {
		let data = this.get();
		data.push(w);

		fs.writeFileSync(this.filename, JSON.stringify(data, null, 4), 'utf-8');
		return w;
	}

	get(): any[] {
		let data = fs.readFileSync(this.filename).toString().trim();
		return data.length ? JSON.parse(data) : [];
	}
}
