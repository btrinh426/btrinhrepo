import React from "react"
import { Nav, Navbar } from "react-bootstrap"
import { logout, getCurrent } from "../services/serviceHelper"
import Home from "./home"
import { Link } from "react-router-dom"
import "../App.css"

class NavComponent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirm: "",
			avatarUrl: "",
			tenantId: "",
			id: "",
		}
	}
	getUser = (user) => {
		this.setState(() => {
			let thisUser = this.state

			thisUser.firstName = user.name

			thisUser.id = user.id

			return this.state
		})
	}
	componentDidMount() {
		getCurrent()
			.then(this.onGetSuccess)

			.catch(this.onGetError)
	}
	onGetSuccess = (response) => {
		let currentUser = response.data.item

		this.getUser(currentUser)
	}

	onGetError(response) {
		console.log(response)
	}

	handleLogout() {
		logout()
			.then((response) => console.log(response))
			.catch((response) => console.log(response))
	}
	render() {
		return (
			<Navbar bg="dark" variant="dark">
				<Home data={this.state}></Home>
				<Navbar.Brand>Starter Tasks</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/home">Home</Nav.Link>
					<Nav.Link href="/login">Login</Nav.Link>
					<Nav.Link href="/friends">Friends</Nav.Link>
					<Nav.Link href="/">Blogs</Nav.Link>
					<Nav.Link href="/">Tech</Nav.Link>
					<Nav.Link href="/">Jobs</Nav.Link>
					<Nav.Link href="/">Events</Nav.Link>
					<Nav.Link href="/register">Register</Nav.Link>
				</Nav>
				<Navbar className="justify-content-end" style={{ width: "80%" }}>
					<Navbar.Collapse className="justify-content-end">
						<Nav.Link onClick={this.handleLogout} as={Link} to="/login">
							Logout
						</Nav.Link>
						<Navbar.Text>
							<strong>Welcome: {this.state.firstName}</strong>
						</Navbar.Text>
					</Navbar.Collapse>
				</Navbar>
			</Navbar>
		)
	}
}

export default NavComponent
