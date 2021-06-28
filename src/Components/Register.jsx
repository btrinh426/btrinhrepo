import React from "react";
import * as userService from "../services/userService";
// import { useToasts } from "react-toast-notifications";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: { tenantId : "U021HAB3VPW", firstName: "", lastName: "" },
		};
	}

	onSubmitClicked = (e) => {
		//make axios call
		e.preventDefault();
		console.log("Sumbit Sent");
		userService
			.register(this.state.formData)
			.then(this.getRegSuccess)
			.catch(this.getRegError);
	};

	getRegSuccess = (response) => {};

	getRegError = (response) => {};

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

	render() {
		return (
			<React.Fragment>
				<p>Register a new membership</p>

				<form>
					<div className="md-3 ">
						<label htmlFor="fName" className="form-label"></label>
						<input
							type="text"
							className="form-control"
							id="firstName1"
							placeholder="First Name"
							name="firstName"
							onChange={this.onFormFieldChanged}
							value={this.state.formData.firstName}
						/>
					</div>
					<div className="md-3 ">
						<label htmlFor="lname" className="form-label"></label>
						<input
							type="text"
							className="form-control"
							id="lastName1"
							placeholder="Last Name"
							name="lastName"
							onChange={this.onFormFieldChanged}
							value={this.state.formData.lastName}
						/>
					</div>
					<div className="md-3 ">
						<label htmlFor="Email" className="form-label"></label>
						<input
							type="email"
							className="form-control"
							id="Email1"
							placeholder="Email"
							name="email"
							onChange={this.onFormFieldChanged}
							value={this.state.formData.email}
						/>
					</div>
					<div className="md-3 ">
						<label htmlFor="password" className="form-label"></label>
						<input
							type="password"
							className="form-control"
							id="password1"
							placeholder="Password"
							name="password"
							onChange={this.onFormFieldChanged}
							value={this.state.formData.password}
						/>
					</div>
					<div className="md-3 ">
						<label htmlFor="password2" className="form-label"></label>
						<input
							type="password"
							className="form-control"
							id="password2"
							placeholder="Retype Password"
							name="passwordConfirm"
							onChange={this.onFormFieldChanged}
							value={this.state.formData.passwordConfirm}
						/>
					</div>
					<div className="md-3 ">
						<label htmlFor="Url" className="form-label"></label>
						<input
							type="text"
							className="form-control"
							id="Url1"
							placeholder="Avatar Url"
							name="avatarUrl"
							onChange={this.onFormFieldChanged}
							value={this.state.formData.avatarUrl}
						/>
					</div>
					<div className="mb-3 form-check">
						<input type="checkbox" className="form-check-input" id="checkTerms" />
						<label className="form-check-label" htmlFor="checkterms">
							I agree to the terms
						</label>
					</div>
					<button
						type="submit"
						className="btn btn-primary"
						onClick={this.onSubmitClicked}
					>
						Register
					</button>
				</form>
			</React.Fragment>
		);
	}
}

export default Register;
