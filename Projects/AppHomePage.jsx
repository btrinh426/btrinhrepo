import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
// import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
// import LogOut from "./Components/LogOut";
import SiteNav from "./Components/SiteNav";
import Register from "./Components/Register";
import { Route } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<SiteNav></SiteNav>
				<HomePage></HomePage>
				

				<div className="col m-3 p-5">
					<Route path="/logOut" exact="true" component={Register}></Route>
					<Route path="/friends" exact="true" component={Register}></Route>
					<Route path="/blogs" exact="true" component={Register}></Route>
					<Route path="/techCompanies" exact="true" component={Register}></Route>
					<Route path="/jobs" exact="true" component={Register}></Route>
					<Route path="/register" exact="true" component={Register}></Route>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(App);
