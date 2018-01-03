import * as React from 'react';
import { Input, Button, Select, Checkbox, Popover } from '@components';
import { Modal } from '@components/modal';

export default class extends React.Component<any, any> {
	render() {
		return (
			<div>
				<h1>Popover</h1>
				<div>
					{/* <div style={{ width: 100, height: 100, overflow: 'auto' }}> */}
					<Popover content="asdfasdf">
						<Button>asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf</Button>
					</Popover>
				</div>
			</div>
		);
	}
}
