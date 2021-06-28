import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import Register from "./Components/Register";
import { Route } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<LoginPage {...this.props}></LoginPage>;
				<main role="main">
					<div className="col m-3">
						<Route
							path="/register"
							exact="true"
							component={Register}
						></Route>
					</div>
				</main>
			</React.Fragment>
		);
	}
}

export default withRouter(App);
