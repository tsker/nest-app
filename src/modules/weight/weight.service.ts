import { Component } from '@nestjs/common';
import { IsNumberString } from 'class-validator';
import * as fs from 'fs';

export class WeightModel {
    @IsNumberString() value: number;

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

    get(param?): WeightModel[] {
        let dataJson = fs
            .readFileSync(this.filename)
            .toString()
            .trim();
        if (dataJson) {
            let list: WeightModel[] = JSON.parse(dataJson);
            return param && param.month
                ? list.filter(item => item.date.match(`-${param.month}-`))
                : list
        }
        return [];
    }
}
