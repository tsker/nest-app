import * as React from 'react';
import * as pick from 'lodash/pick';
import { connect } from 'react-redux';
import { actions } from '@store/modules/auth';

class LoginPage extends React.Component<any, any> {
	state = {
		isValidForm: false,
		form: {
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
		let { form, error } = this.state;
		let message = this.validFormItem(value, name);
		let nextError = { ...error, [name]: message };
		let isValidForm = this.validForm(nextError);

		this.setState({
			isValidForm,
			form: {
				...form,
				[name]: value
			},
			error: nextError
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		let { isValidForm, form } = this.state;
		if (isValidForm) {
			this.props.login(form);
		}
	};

	renderFormLine = (name, index) => {
		let { form, error } = this.state;
		return (
			<p key={index}>
				<input type="text" name={name} value={form[name]} onChange={this.handleChange} />
				<br />
				<span>{error[name]}</span>
			</p>
		);
	};

	render() {
		let { isValidForm } = this.state;
		let { logining, logined, error } = this.props;

		if (logined) return <h1>logined</h1>;

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
