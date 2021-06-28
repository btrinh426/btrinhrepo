import React from "react";
import * as userService from "../services/userService";
import Register from "./Register";
import { Route } from "react-router-dom";

class HomePage extends React.Component {
	constructor(props) {
		super();

		this.state = {
			formData: { name: "Sabio Student", id: "" },
		};
	}
	//get current
	componentDidMount() {
		userService.userData(response).then(this.getSucess).catch(this.getError);
	}
	getSucess = () => {
		console.log(response.formData.id);
        userId = response.formData.id
	};
	getError = () => {
		console.log("Mount Failed");
	};

	//Logout to login page
	componentDidMount() {
		userService.logOut().then(this.getSucess).catch(this.getError);
	}
	getSucess = () => {
		console.log("LoginService Complete");
		this.props.history.push("/LoginPage");
	};
	getError = () => {
		console.log("Login Failed");
	};

	render() {
		return (
			<main role="main">
				<div className="col m-5">
					<strong>
						<p>Welcome, </p>
						<p>{this.state.formData.name}</p>
					</strong>

					
				</div>
			</main>
		);
	}
}

export default HomePage;
