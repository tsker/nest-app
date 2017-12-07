import * as React from 'react';
const h = React.createElement;

export  class AsyncComponent extends React.Component<any, any> {
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
		this.props.component((Mod) => {
			Mod = Mod.default || Mod;
			this.setState({ Mod });
		});
	}

	render() {
		let { Mod } = this.state;
		return <Mod />;
	}
}

export function generateAsyncComponent(com){
	return () => <AsyncComponent component={com} />
}