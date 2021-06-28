import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
import SiteNav from "./Components/SiteNav";
import Cars from "./Components/Assessment/Cars"





class App extends Component {
	render() {
		return (
			<React.Fragment>
			<SiteNav></SiteNav>

			<Cars></Cars>
		
			


			</React.Fragment>
		);
	}
}

export default withRouter(App);
