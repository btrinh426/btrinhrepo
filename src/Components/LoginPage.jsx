import React from "react";
import * as userService from "../services/userService";
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: { email: "", passwordConfirm: "", tenantId: "U021HAB3VPW" }
		};
	}

	onFormFieldChanged = (e) => {
		let currentTarget = e.currentTarget;
		let newValue = currentTarget.value;
		let inputName = currentTarget.name;

		this.setState(() => {
			let formData = { ...this.state.formData };

			formData[inputName] = newValue;
			return { formData };
		});
	};

	onLoginClicked = (e) => {
		e.preventDefault();
		console.log("Submit Sent");
		userService
			.logIn(this.state.formData)
			.then(this.getLogSuccess)
			.catch(this.getLogError)
		
	};

	getLogSuccess = (response) => {
		toast("Login Sucessful"); 
		this.props.history.push("/register");
	};
	getLogError = (response) => {
		toast("Login Failed");
	};

	render() {
		return (
			<form>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Enter email"
						onChange={this.onFormFieldChanged}
						name="email"
					/>
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Password</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword1"
						placeholder="Password"
						onChange={this.onFormFieldChanged}
						name="password"
					/>
				</div>

				<button
					type="submit"
					onClick={this.onLoginClicked}
					className="btn btn-primary"
				>
					Submit
				</button>
			</form>
		)
	}
}

export default LoginPage;
