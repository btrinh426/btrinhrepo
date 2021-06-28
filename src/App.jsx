import React, { Component } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import * as userService from "./services/userService";

import MyNav from "./Components/Navbar";
//import Footer from "./Components/Footer";
import Home from "./Components/Home/Home";
import Login from "./Components/Home/Login";
import Register from "./Components/Home/Register";
import Friends from "./Components/Friends/Friends";

import "./App.css";

class App extends Component {
    state = {
        checkForUser: true,
        activeUser: false,
        appActive: true,
        hasOnLoginRan: false,
        currentUser: {
            firstName: "noUser",
            lastName: "noUser",
            id: "noUser",
            email: "noUser",
            photo: "noUser",
        },
    };
    componentDidMount() {
        if (this.state.checkForUser === true) {
            //console.log("Get User on refresh");
            userService.currentUser().then(this.onUserOK).catch(this.onUserErr);
        }
    }
    componentDidUpdate() {
        console.log(
            "App Updated",
            this.state.hasOnLoginRan,
            this.state.activeUser
        );
    }

    onLogin = () => {
        userService.currentUser().then(this.onUserOK).catch(this.onUserErr);
        //console.log("received function call from Login");
    };

    onUserOK = res => {
        const userId = res.data.item.id;
        //console.log("User Detected: ", userId);
        userService
            .getUserId(userId)
            .then(this.loadUser)
            .catch(res => console.error(res));
    };

    loadUser = res => {
        let userObj = res.data.item;
        const user = {};
        user.firstName = userObj.firstName;
        user.lastName = userObj.lastName;
        user.id = userObj.id;
        user.email = userObj.email;
        user.photo = userObj.avatarUrl;

        //console.log(user);

        this.setState(prevState => {
            let newState = { ...prevState };
            newState.activeUser = true;
            newState.currentUser = user;
            newState.hasOnLoginRan = true;
            newState.checkForUser = false;
            return newState;
        });
    };

    render() {
        // console.log("Event on App", "USE QUEUE WAAAYYY MORE!!!!!", this.state);
        return (
            <BrowserRouter>
                <div className="App">
                    <MyNav {...this.props} appState={this.state}></MyNav>
                    <main role="main">
                        <Route
                            path="/Home"
                            exact={true}
                            render={() => <Home appState={this.state} />}
                        ></Route>
                        <Route
                            path="/Login"
                            exact={true}
                            updateAppState={this.onLogin}
                            render={() => (
                                <Login updateAppState={this.onLogin} />
                            )}
                        ></Route>
                        <Route
                            path="/Register"
                            exact={true}
                            render={() => <Register appState={this.state} />}
                        ></Route>
                        <Route
                            path="/Friends"
                            exact={true}
                            updateAppState={this.onLogin}
                            render={() => <Friends appState={this.state} />}
                        ></Route>
                    </main>
                    {/* <Route path="/" component={Footer}></Route>/ */}
                </div>
            </BrowserRouter>
        );
    }
}

export default withRouter(App);
