import * as React from 'react';

export class AsyncComponent extends React.PureComponent<any, any> {
    state = {
        Mod: () => <span />
    };

    componentWillMount() {
        this.load();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.component !== this.props.component) {
            this.load();
        }
    }

    load() {
        this.props.component(Mod => {
            Mod = Mod.default || Mod;
            this.setState({ Mod });
        });
    }

    render() {
        let { Mod } = this.state;
        return <Mod {...this.props.p} />;
    }
}

export function generateAsyncComponent(com) {
    return p => <AsyncComponent component={com} p={p} />;
}
