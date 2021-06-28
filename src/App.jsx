import React, { Component } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import * as UserService from "./services/UserService";

import MyNav from "./Components/Navbar";
//import Footer from "./Components/Footer";
import ProductForm from "./Components/ProductForm/ProductForm";
import Home from "./Components/Home/Home";
import Login from "./Components/Home/Login";
import Register from "./Components/Home/Register";
import Friends from "./Components/Friends/Friends";
import Jobs from "./Components/Jobs/Jobs";

import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkForUser: true,
            activeUser: false,
            appActive: true,
            hasOnLoginRan: false,
            query: "",
            currentUser: {
                firstName: "noUser",
                lastName: "noUser",
                id: "noUser",
                email: "noUser",
                photo: "noUser",
            },
        };
    }

    componentDidMount() {
        if (this.state.checkForUser === true) {
            //console.log("Get User on refresh");
            UserService.currentUser().then(this.onUserOK).catch(this.onUserErr);
        }
    }
    componentDidUpdate(prevProps) {
        let currentPath = this.props.location.pathname;
        let previousPath = prevProps.location.pathname;
        console.log("App Updated", currentPath, previousPath);
    }

    onLogin = () => {
        UserService.currentUser().then(this.onUserOK).catch(this.onUserErr);
        //console.log("received function call from Login");
    };

    onUserOK = res => {
        const userId = res.data.item.id;
        //console.log("User Detected: ", userId);
        UserService.getUserId(userId)
            .then(this.loadUser)
            .catch(res => console.error(res));
    };
    onUserErr = err => {
        console.log(err);
        let goToLogin = (
            <Route
                path=":action/id"
                render={() => <Login appState={this.state} />}
            />
        );
        return goToLogin;
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
                    <MyNav
                        {...this.props}
                        appState={this.state}
                        activeUser={this.state.activeUser}
                    ></MyNav>
                    <main role="main">
                        <Route
                            path="/ProductForm"
                            exact
                            render={() => <ProductForm appState={this.state} />}
                        ></Route>
                        <Route
                            path="/Home"
                            exact
                            render={() => <Home appState={this.state} />}
                        ></Route>
                        <Route
                            path="/Login"
                            exact
                            updateAppState={this.onLogin}
                            render={() => (
                                <Login
                                    {...this.props}
                                    updateAppState={this.onLogin}
                                />
                            )}
                        ></Route>
                        <Route
                            path="/Register"
                            exact
                            render={() => <Register appState={this.state} />}
                        ></Route>
                        <Route
                            path="/Friends"
                            exact
                            updateAppState={this.onLogin}
                            render={() => <Friends appState={this.state} />}
                        ></Route>
                        <Route
                            path="/Jobs"
                            exact
                            render={() => <Jobs appState={this.state} />}
                        ></Route>
                    </main>
                    {/* <Route path="/" component={Footer}></Route>/ */}
                </div>
            </BrowserRouter>
        );
    }
}

export default withRouter(App);
