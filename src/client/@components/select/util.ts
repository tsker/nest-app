import { toType } from '@components/util';

export function transformOptions(o, k?): any[] {
    switch (toType(o)) {
        case 'object':
            return Object.keys(o).map(value => {
                return { value, children: o[value] };
            });
        case 'array':
            if (o.length && toType(o[0]) !== 'object') {
                return o.map(value => {
                    return { value, children: value };
                });
            }
            return o;

        default:
            return [];
    }
}
