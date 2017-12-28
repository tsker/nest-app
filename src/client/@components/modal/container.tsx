import * as React from 'react';
import { createPortal, render } from 'react-dom';
import * as cls from 'classnames';
import { createNode, toType, eachBind } from '@components/util';
import { Modal } from './modal';

export class ModalContainer extends React.Component {
	constructor(p) {
		super(p);
	}
	state = {
		modals: {}
	};

	addModal({ mid, ...options }) {
		let { modals } = this.state;
		this.setState({ modals: { ...modals, [mid]: options } });
	}
	removeModal(mid) {
		let modals = { ...this.state.modals };

		if (modals[mid]) {
			delete modals[mid];
			this.setState({ modals });
		}
	}
	renderModals() {
		let { modals } = this.state;
		return Object.keys(modals).map((mid, index) => {
			return (
				<Modal
					key={mid}
					{...modals[mid]}
					mid={mid}
					mask={index === 0}
					visible={true}
					onClose={this.removeModal.bind(this, mid)}
				/>
			);
		});
	}

	render() {
		return <div>{this.renderModals()}</div>;
	}
}
