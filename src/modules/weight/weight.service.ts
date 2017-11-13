import { Component } from '@nestjs/common';
import * as fs from 'fs';

export interface WeightModel {
	weight: number;
	date: string;
}

@Component()
export class WeightService {
	private filename = __dirname + '/data.json';
	private list: WeightModel[] = [];

	add(w: WeightModel) {
		return new Promise((ok) => {
			let data = this.get();
			data.push(w);
			fs.writeFile(this.filename, JSON.stringify(data, null, 4), 'utf-8', function(){
				ok(data)
			});
		});
	}

	get(): any[] {
		let data = fs.readFileSync(this.filename).toString();
		return data.length ? JSON.parse(data) : [];
	}
}
