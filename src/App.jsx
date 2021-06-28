import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Friends from "./Components/Homies/Friends";
import Home from "./Components/Home/Home";
import smoke from "./Components/Home/HomeStyle/Smokey-Home.mp4";
import "./App.scss";
import debug from "sabio-debug";
const _logger = debug.extend("App");
const _loggerPage = _logger.extend("SPA");

class App extends Component {
    constructor(props) {
        super(props);
        _loggerPage("Full Application/Page Refresh Detected");
        _logger("App Constructor with location", props.location);

        this.state = {
            showLogin: false,
            currentUser: { isLoggedIn: false },
        };
    }

    // Static == no access to .this (must be a return statement as well)
    // must derive state from props
    static getDerivedStateFromProps(props, state) {
        return null;
    }

    componentDidUpdate(prevProps) {}

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
                        path={[
                            "/friends",
                            "/friends/myfriends",
                            "/friends/addfriend",
                            "/friends/editfriend",
                        ]}
                        //exact
                        render={() => <Friends {...this.props} />}
                    ></Route>
                </main>
            </div>
        );
    }
}

export default withRouter(App);
