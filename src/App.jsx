import React from "react"
import NavComponent from "./components/navigation"
import Register from "./components/register"
import Widget from "./components/ASSESSMENT/widget"

// import FooterComponent from "./components/footer"
import { Route, Switch } from "react-router-dom"

import Login from "./components/login"
import "./App.css"
import Home from "./components/home"
import Friends from "./components/friends/Friends"
import AddFriends from "./components/friends/FriendsForm"
import Cars from "./components/ASSESSMENT/cars"

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<NavComponent />
				<Switch>
					<Route exact path="/" component={Login}></Route>
					<Route exact path="/register" component={Register}></Route>
					<Route exact path="/home" component={Home}></Route>
					<Route exact path="/friends" component={Friends}></Route>
					<Route exact path="/friends/:id/edit" component={AddFriends} />
					<Route exact path="/friends/new" component={AddFriends}></Route>
					<Route exact path="/widget" component={Widget}></Route>
					<Route exact path="/cars" component={Cars}></Route>
				</Switch>
			</React.Fragment>
		)
	}
}

export default App
