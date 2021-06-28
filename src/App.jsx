import React, { Component } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
// import * as userService from "./services/userService";
import MyNav from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home/Home";
import Login from "./Components/Home/Login";
import Register from "./Components/Home/Register";
import Friends from "./Components/Friends/Friends";
//import UserFriends from "./Components/Friends/UserFriends";

import "./App.css";

class App extends Component {
    state = {
        loggedInStatus: false,
        currentUser: {
            firstName: "",
            lastName: "",
            id: "",
            email: "",
            photo: "",
        },
    };

    render() {
        
        console.log("Event on App", "USE QUEUE WAAAYYY MORE!!!!!");
        return (
            <BrowserRouter>
                <div className="App">
                    <Route {...this.props} path="/" component={MyNav}></Route>
                    <main role="main">
                        <Route exact={true} path="/Home">
                            {" "}
                            <Home />
                        </Route>
                        <Route
                            path="/Login"
                            exact={true}
                            component={Login}
                        ></Route>
                        <Route
                            path="/Register"
                            exact={true}
                            component={Register}
                        ></Route>
                        <Route
                            path="/Friends"
                            exact={true}
                            component={Friends}
                        ></Route>
                    </main>
                    <Route path="/" component={Footer}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default withRouter(App);
