import React, { Component } from "react";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Contentx from "./Components/Content";
import Jumbo from "./Components/Jumbo";
import SiteNav from "./Components/SiteNav";
import Widget from "./Widget";

import "./App.css";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<SiteNav />

					<NavLink to="/Widget">Widget NavLink</NavLink>
					<Route path="/Widget" component={Widget}></Route>

					<main role="main">
						<Jumbo />

						<Contentx />
					</main>

					<Footer />
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
