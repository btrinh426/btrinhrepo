import React, { Component } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import "./services/userService";
import MyNav from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home/Home";
import Login from "./Components/Home/Login";
import Register from "./Components/Home/Register";

import "./App.css";

class App extends Component {
    state = {};

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route {...this.props} path="/" component={MyNav}></Route>
                    <main role="main">
                        <Route {...this.props} path="/Home">
                            {" "}
                            <Home />
                        </Route>
                        <Route
                            {...this.props}
                            path="/Login"
                            component={Login}
                        ></Route>
                        <Route
                            {...this.props}
                            path="/Register"
                            component={Register}
                        ></Route>
                    </main>
                    <Route path="/" component={Footer}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default withRouter(App);
