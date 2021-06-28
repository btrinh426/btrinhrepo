import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Friends from "./Components/Homies/Friends";
import Home from "./Components/Home/Home";
import smoke from "./Components/Home/HomeStyle/Smokey-Home.mp4";

import "./App.scss";

class App extends Component {
    state = {
        showLogin: false,
        currentUser: { isLoggedIn: false },
    };

    // Static == no access to .this (must be a return statement as well)
    // must derive state from props
    static getDerivedStateFromProps(props, state) {
        //let newState = null;
        // let propState = props.location.state;

        // if (propState && propState.type === "LOGIN") {
        //    // console.log("I want to login");
        // } else if (propState && propState.type === "SLOGIN") {
        //     //console.log("Ye shall show a login form... somehow");
        // }

        return null;
    }

    componentDidUpdate(prevProps) {
        // let currentPath = this.props.location.pathName;
        // let prevPath = prevProps.location.pathName;
        // console.log("App", { currentPath, prevPath });

        const { state: propState } = this.props.location;

        if (!this.state.showLogin && propState.type === "SLOGIN") {
            // console.log("VENI VITTI VICI");
            this.setState({ showLogin: true });
            let showLogin = { type: "SLOGIN", payload: null };
            this.props.history.push("/home", showLogin);
        }
    }

    render() {
        return (
            <div className="App">
                <Navbar {...this.props}></Navbar>
                {!this.state.showLogin && (
                    <section className="showcase">
                        <video src={smoke} muted loop autoPlay />
                        <div className="overlay" />
                    </section>
                )}

                <main role="main">
                    <Route
                        path="/home"
                        exact
                        render={() => <Home {...this.props} />}
                    ></Route>
                    )
                    <Route
                        path="/friends"
                        exact
                        render={() => <Friends {...this.props} />}
                    ></Route>
                </main>
            </div>
        );
    }
}

export default withRouter(App);
