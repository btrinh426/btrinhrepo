import React, { Component } from "react";
import { Route, withRouter, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Friends from "./Components/Homies/Friends";
import Home from "./Components/Home/Home";
import Cars from "./Components/Cars/Cars";

import "./App.scss";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar {...this.props}></Navbar>

                    <main role="main">
                        <Route
                            path="/home"
                            exact
                            render={() => <Home {...this.props} />}
                        ></Route>
                        <Route
                            path="/friends"
                            exact
                            render={() => <Friends {...this.props} />}
                        ></Route>
                        <Route
                            path="/cars"
                            exact
                            render={() => <Cars {...this.props} />}
                        ></Route>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

export default withRouter(App);
