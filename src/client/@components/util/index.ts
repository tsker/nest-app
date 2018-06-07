export * from './time-queue';

export function noop () {}

export function bindAll (context, ...fns) {
    function bind (fn) {
        context[fn] = context[fn].bind(context);
    }

    fns.forEach(bind);
}

export function pull (array, ...rest) {
    let values = new Set(rest);
    return array.filter((item) => !values.has(item));
}

export function pick (object, ...keys) {
    return keys.reduce((o, key) => ((o[key] = object[key]), o), {});
}

export function delayFn (fn, ms = 200) {
    return function (...args) {
        clearTimeout(fn.timer);
        fn.timer = setTimeout(fn, ms, ...args);
    };
}

export function delay (ms) {
    return new Promise((ok) => setTimeout(ok, ms));
}

export function compose (...fns) {
    fns = fns.filter(Boolean);

    if (fns.length === 0) {
        return noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }

    let first = fns.shift();

    return fns.reduce((result, fn) => (...params) => fn(result(...params)), first);
}

export function queue (...fns) {
    if (fns.length === 0) {
        throw new Error('must min have 1 params');
    }
    if (fns.length === 1) {
        return fns[0];
    }

    let last = fns.pop();

    return (arg) => fns.reduceRight((next, fn) => () => fn(arg, next), last)();
}

export function upperFirst (str: string) {
    return str.replace(/^./, (s) => s.toUpperCase());
}

export function type (o) {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}

export function converPropPath (prop: string) {
    return prop.replace(/]/g, '').split(/\[|\./);
}

export function deepUpdateObject (obj: object, prop: string | string[], value: any): any {
    if (typeof prop === 'string') {
        prop = converPropPath(prop);
    }

    switch (prop.length) {
        case 0:
            return Object.assign({}, obj);
        case 1:
            return { ...obj, [prop[0]]: value };
    }

    let lastProp = prop.pop() as string;
    let firstProp = prop.shift() as string;

    let target = obj[firstProp];
    for (let i = 0; i < prop.length; i++) {
        target = target[prop[i]];
    }

    if (type(value) === 'string') {
        target[lastProp] = value;
    } else if (type(value) === 'object') {
        target = target[lastProp];
        Object.assign(target, value);
    }

    return { ...obj };
}


export function hasValue(o){
    return 'value' in o
}