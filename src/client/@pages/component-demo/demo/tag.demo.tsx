import * as React from 'react';
import * as moment from 'moment';
import { Tag } from '@components';

export default class extends React.Component<any, any> {
	render() {
		return (
			<div>
				<h1>Icon</h1>

				<Tag skin='primary'>好吧</Tag>
				<Tag skin='primary-line'>好吧</Tag>

				<Tag skin='red'>好吧</Tag>
				<Tag skin='red-line'>好吧</Tag>

				<Tag skin='yellow'>好吧</Tag>
				<Tag skin='yellow-line'>好吧</Tag>

				<Tag skin='green'>好吧</Tag>
				<Tag skin='green-line'>好吧</Tag>

				<Tag skin='blue'>好吧</Tag>
				<Tag skin='blue-line'>好吧</Tag>

				<Tag skin='black'>好吧</Tag>
				<Tag skin='black-line'>好吧</Tag>

				<Tag skin='gray'>好吧</Tag>
				<Tag skin='gray-line'>好吧</Tag>
			</div>
		);
	}
}
