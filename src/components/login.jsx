import React from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { login } from "../services/userServices"
import { toast } from "react-toastify"
import { Formik, Form as Formy, Field } from "formik"
import { withRouter } from "react-router-dom"

class Login extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			email: "",
			password: "",
			tenantId: "Rounders",
		}
	}

	handleSubmit = (values) => {
		login(values).then(this.onLoginSuccess).catch(this.onLoginError)
	}

	onLoginSuccess = (response) => {
		toast.success("Logged in!")
		console.log(response)
		this.props.history.push("/home")
	}

	onLoginError(response) {
		toast.error("Can't login!")
		console.log(response)
	}

	handleRegister = () => {
		this.props.history.push("/register")
	}

	render() {
		return (
			<div className="Login">
				<Formik
					enableReinitialize={true}
					initialValues={this.state}
					onSubmit={this.handleSubmit}
				>
					<Formy className="loginForms">
						<strong>Login</strong>
						<Form.Group controlId="email">
							<Field
								className="form-control"
								type="text"
								name="email"
								placeholder="Email"
							/>
						</Form.Group>
						<Form.Group controlId="password">
							<Field
								className="form-control"
								type="password"
								name="password"
								placeholder="Password"
							/>
						</Form.Group>

						<div>
							<Button
								className="btn btn-secondary"
								block
								size="lg"
								id="register"
								onClick={this.handleRegister}
							>
								Register
							</Button>
							<Button block size="lg" type="submit" id="loginSubmit">
								Login
							</Button>
						</div>
						<div></div>
					</Formy>
				</Formik>
			</div>
		)
	}
}

export default withRouter(Login)
