import React from "react"
import { Nav, Navbar } from "react-bootstrap"
import { logout } from "../services/userServices"
import { withRouter } from "react-router-dom"
import "../App.css"
import { toast } from "react-toastify"

class NavComponent extends React.Component {
	constructor(props) {
		super(props)

		this.onLogoutSuccess = this.onLogoutSuccess.bind(this)

		this.onLogoutError = this.onLogoutError.bind(this)
	}

	handleLogout = () => {
		logout().then(this.onLogoutSuccess).catch(this.onLogoutError)
	}

	onLogoutSuccess(response) {
		toast.success("Logged Out!")
		console.log(response)
		this.props.history.push("/")
	}

	onLogoutError(response) {
		toast.error("Not Logged In!")
		console.log(response)
	}
	render() {
		return (
			<>
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand>Starter Tasks</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link href="/home">Home</Nav.Link>
						<Nav.Link href="/friends">Friends</Nav.Link>
						<Nav.Link href="/">Blogs</Nav.Link>
						<Nav.Link href="/">Tech</Nav.Link>
						<Nav.Link href="/">Jobs</Nav.Link>
						<Nav.Link href="/events">Events</Nav.Link>
						<Nav.Link href="/register">Register</Nav.Link>
					</Nav>

					<Nav.Link className="logout" onClick={this.handleLogout}>
						Logout
					</Nav.Link>
				</Navbar>
			</>
		)
	}
}

export default withRouter(NavComponent)
