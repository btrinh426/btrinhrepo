import React, { Component } from "react";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Contentx from "./Components/Content";
import Jumbo from "./Components/Jumbo";
import SiteNav from "./Components/SiteNav";
import Widget from "./Widget";
import Register from "./Components/Register";

import "./App.css";

class App extends Component {
	render() {
		return <Register />;
	}
}

export default App;
