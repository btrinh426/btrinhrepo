import React from "react"
import NavComponent from "./components/navigation"
import Register from "./components/register"

// import FooterComponent from "./components/footer"
import { Route, Switch } from "react-router-dom"

import Login from "./components/login"
import "./App.css"
import Home from "./components/home"
import Friends from "./components/friends"

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route exact path="/" component={Login}></Route>
					<Route exact path="/register" component={Register}></Route>
					<Route exact path="/home" component={Home}></Route>
					<Route exact path="/friends" component={Friends}></Route>
				</Switch>
			</React.Fragment>
		)
	}
}

export default App
