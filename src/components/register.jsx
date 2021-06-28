import React from "react"
import { Form, Button } from "react-bootstrap"
import { register } from "../services/userServices"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Formik, Form as Formy, Field } from "formik"

class Register extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirm: "",
			avatarUrl: "",
			tenantId: "Rounders",
		}
	}

	onRegisterSuccess = (response) => {
		toast.success("You have been registered!")
		console.log(response)
		this.props.history.push("/")
	}

	onRegisterError(response) {
		toast.error("Can't register!")
		console.log(response)
	}

	handleSubmit = (values) => {
		register(values).then(this.onRegisterSuccess).catch(this.onRegisterError)
	}

	render() {
		return (
			<Formik
				enableReinitialize={true}
				initialValues={this.state}
				onSubmit={this.handleSubmit}
			>
				<Formy className="registerForms">
					<strong>Registration</strong>
					<Form.Group controlId="fNameInput">
						<Field
							className="form-control"
							type="text"
							name="firstName"
							placeholder="First Name"
						/>
					</Form.Group>

					<Form.Group controlId="lNameInput">
						<Field
							className="form-control"
							type="text"
							name="lastName"
							placeholder="Last Name"
						/>
					</Form.Group>

					<Form.Group controlId="emailInput">
						<Field
							className="form-control"
							type="text"
							name="email"
							placeholder="Email"
						/>
					</Form.Group>

					<Form.Group controlId="passwordInput">
						<Field
							className="form-control"
							type="password"
							name="password"
							placeholder="Password"
						/>
					</Form.Group>

					<Form.Group controlId="passwordConfirmInput">
						<Field
							type="password"
							name="passwordConfirm"
							placeholder="Password Confirm"
							className="form-control"
						/>
					</Form.Group>

					<Form.Group controlId="avatarInput">
						<Field
							className="form-control"
							type="text"
							name="avatarUrl"
							placeholder="Image Url"
						/>
					</Form.Group>

					<Button variant="primary" type="submit" id="submit">
						Submit
					</Button>
				</Formy>
			</Formik>
		)
	}
}

export default Register
