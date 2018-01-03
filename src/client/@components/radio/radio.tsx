import * as React from 'react';
import * as cls from 'classnames';

interface RadioProps extends React.HTMLProps<HTMLInputElement> {}

export class Radio extends React.Component<RadioProps> {
    render() {
        let { className, children, ...props } = this.props;
        return (
            <label>
                <input
                    {...props}
                    type="radio"
                    className={cls('radio', className)}
                />
                {children}
            </label>
        );
    }
}
