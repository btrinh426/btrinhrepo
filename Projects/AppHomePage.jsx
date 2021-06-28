import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import "./App.css";
// import LoginPage from "./Components/LoginPage";
// import Register from "./Components/Register";
// import { Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
// import LogOut from "./Components/LogOut";




class App extends Component {
	render() {
		return (
			<React.Fragment>
				<HomePage></HomePage>



		<NavLink to="null" >Logout</NavLink>
		<NavLink to="/Friends">Friends</NavLink>
		<NavLink to="/Blogs">Blogs</NavLink>
		<NavLink to="/TechCompanies">Tech Companies</NavLink>
		<NavLink to="/Jobs">Jobs</NavLink>
		<NavLink to="/Events">Events</NavLink>
		<NavLink to="/Components/Register">Register</NavLink>

		
			</React.Fragment>
		);
	}
}

export default withRouter(App);
