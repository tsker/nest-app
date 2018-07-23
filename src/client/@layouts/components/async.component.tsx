import { createElement, PureComponent } from 'react';

export class AsyncComponent extends PureComponent<any, any> {
    state = {
        Mod: () => null
    };

    componentDidMount () {
        this.load();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.component !== this.props.component) {
            this.load();
        }
    }

    parseComponent = (Mod) => {
        Mod = Mod.default || Mod;
        this.setState({ Mod });
    };

    load () {
        let { component } = this.props;
        if (component.then) {
            return component.then(this.parseComponent);
        }
        component(this.parseComponent);
    }

    render () {
        let { Mod } = this.state;
        return <Mod {...this.props.p} />;
    }
}

export function generateAsyncComponent (com) {
    if (/ssr\-development/.test(process.env.NODE_ENV!)) {
        return com.default || com;
    }

    return (p) => <AsyncComponent component={com} p={p} />;
}
