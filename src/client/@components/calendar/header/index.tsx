import * as React from 'react';
import * as moment from 'moment';
import * as range from 'lodash/range';
import { Select } from '../..';

export class CalendarHeader extends React.PureComponent<any, any> {
	render() {
		let { onViewChange, view, years } = this.props;
		return (
			<div className="header">
				<span data-name="month" data-step="-1" onClick={onViewChange}>
					&lt;
				</span>
				<Select name="year" options={years} value={view.year()} onChange={onViewChange} />
				<Select name="month" options={range(1, 13)} value={view.month() + 1} onChange={onViewChange} />
				<span data-name="month" data-step="1" onClick={onViewChange}>
					&gt;
				</span>
			</div>
		);
	}
}
