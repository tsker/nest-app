import { type } from '../util';

const Rules = {
    required: Boolean
};

export function validateAll (fields, fieldsMeta) {
    let result = {};
    let errors;

    Object.keys(fields).forEach((name) => {
        let fieldMeta = fieldsMeta[name];
        let { value } = fields[name];

        if (fieldMeta.verifyTrigger === 'onSubmit') {
            fields[name].error = validateField(value, fieldMeta, fields);
        }

        if (fields[name].error) {
            errors = errors || {};
            errors[name] = fields[name].error;
        }

        result[name] = value;
    });

    return Promise.resolve({ errors, result });
}

export function validateField (value, { rules, verifyFirst }, fields) {
    let error: undefined | string[];

    if (!rules || !rules.length) {
        return
    }

    for (let i = 0; i < rules.length; i++) {
        let { rule, message } = rules[i];
        let validMsg;

        /**
         * rule 为字符串，将取全局定义的验证规则
         */
        if (typeof rule === 'string') {
            rule = Rules[rule];
        }

        if (type(rule) === 'regexp') {
            validMsg = rule.test(value) ? undefined : message;
        } else {
            let err = rule(value, fields);

            if(typeof err === 'string'){
                validMsg = err
            }else{
                validMsg = err ? undefined : message
            }
        }

        if (typeof validMsg === 'string') {
            error = error || [];
            error.push(validMsg);

            if (verifyFirst) {
                break;
            }
        }
    }

    return error;
}
