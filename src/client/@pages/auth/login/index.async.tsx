import { createElement, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import pick from 'lodash-es/pick';

import { actions } from '@store/modules/auth';

class LoginPage extends Component<any, any> {
	state = {
		isValidForm: false,
		user: {
			username: '',
			password: ''
		},
		error: {
			username: true,
			password: true
		}
	};

	validFormItem(value, name) {
		switch (true) {
			case value.length === 0:
				return `${name} can not be empty`;
			case value.length < 6:
				return `${name} min length of 6`;
			default:
				return false;
		}
	}
	validForm(errors) {
		return !Object.keys(errors).filter((key) => errors[key]).length;
	}

	handleChange = (e) => {
		let { value, name } = e.target;
		let { user, error } = this.state;
		let message = this.validFormItem(value, name);
		let nextError = { ...error, [name]: message };
		let isValidForm = this.validForm(nextError);

		this.setState({
			isValidForm,
			user: {
				...user,
				[name]: value
			},
			error: nextError
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		let { isValidForm, user } = this.state;
		if (isValidForm) {
			this.props.login(user);
		}
	};

	renderFormLine = (name, index) => {
		let { user, error } = this.state;
		return (
			<p key={index}>
				<input type="text" name={name} value={user[name]} onChange={this.handleChange} />
				<br />
				<span>{error[name]}</span>
			</p>
		);
	};

	render() {
		let { isValidForm } = this.state;
		let { logining, logined, error } = this.props;
		let { state } = this.props.location;
		let from = state ? state.from.pathname : '/';

		if (logined)
			return (
				<div>
					<h1>Login Success!</h1>
					<span>
						from: <Link to={from}>{from}</Link>
					</span>
				</div>
			);

		return (
			<form onSubmit={this.handleSubmit}>
				{[ 'username', 'password' ].map(this.renderFormLine)}
				<button disabled={!isValidForm || logining}>login{logining && 'ing...'}</button>
				<h2>{error}</h2>
			</form>
		);
	}
}

function mapStateToProps({ auth }) {
	return { ...auth };
}

export default connect(mapStateToProps, pick(actions, 'login'))(LoginPage);
