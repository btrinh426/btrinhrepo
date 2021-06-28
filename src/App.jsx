import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
import SiteNav from "./Components/SiteNav";
import { Route } from "react-router-dom";
import CarsForm from "./Components/Assessment/CarsForm"



class App extends Component {
	render() {
		return (
			<React.Fragment>
				<SiteNav></SiteNav>
				<CarsForm></CarsForm>
				

				<div className="col m-3 p-5">
					<Route path="/CarsForm" component={CarsForm}></Route>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(App);
