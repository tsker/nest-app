import * as React from 'react';
import * as cls from 'classnames';

interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {}

export class Checkbox extends React.Component<CheckboxProps> {
    render() {
        let { className, children, ...props } = this.props;
        return (
            <label>
                <input
                    {...props}
                    type="checkbox"
                    className={cls('checkbox', className)}
                />
                {children}
            </label>
        );
    }
}
