import React from "react"
import { Form, Button } from "react-bootstrap"
import { register } from "../../services/serviceHelper"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useHistory } from "react-router-dom"

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

		this.formChange = this.formChange.bind(this)
		this.registerUser = this.registerUser.bind(this)
	}

	registerUser() {
		register(this.state)
			.then(this.onRegisterSuccess)
			.catch(this.onRegisterError)
	}

	onRegisterSuccess(response) {
		toast.success("You have been registered!")
		console.log(response)
	}

	onRegisterError(response) {
		toast.error("Can't register!")
		console.log(response)
	}

	formChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	render() {
		return (
			<Form>
				<Form.Label>Registration</Form.Label>
				<Form.Group controlId="fNameInput">
					<Form.Control
						type="text"
						onChange={this.formChange}
						placeholder="First Name"
						name="firstName"
					/>
				</Form.Group>

				<Form.Group controlId="lNameInput">
					<Form.Control
						type="text"
						onChange={this.formChange}
						placeholder="Last Name"
						name="lastName"
					/>
				</Form.Group>

				<Form.Group controlId="emailInput">
					<Form.Control
						type="email"
						onChange={this.formChange}
						placeholder="Email"
						name="email"
					/>
				</Form.Group>

				<Form.Group controlId="passwordInput">
					<Form.Control
						type="password"
						onChange={this.formChange}
						placeholder="Password"
						name="password"
					/>
				</Form.Group>

				<Form.Group controlId="passwordConfirmInput">
					<Form.Control
						type="password"
						onChange={this.formChange}
						placeholder="Password Confirm"
						name="passwordConfirm"
					/>
				</Form.Group>

				<Form.Group controlId="avatarInput">
					<Form.Control
						type="text"
						onChange={this.formChange}
						placeholder="Avatar Url"
						name="avatarUrl"
					/>
				</Form.Group>

				<Button variant="primary" onClick={this.registerUser} id="submit">
					Submit
				</Button>
			</Form>
		)
	}
}

export default Register
