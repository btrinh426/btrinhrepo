import React from "react";
import { Route } from "react-router-dom";
import Login from "./Homechilds/Login";
import Register from "./Homechilds/Register";
import "./HomeStyle/Home.scss";
import * as userServices from "../../services/UserService";

import smoke from "./HomeStyle/Smokey-Home.mp4";

class Home extends React.Component {
    state = {
        loggedUser: false,
    };

    render() {
        return (
            <section className="showcase">
                <div className="container-fluid">
                    <div className="row d-flex test justify-content-center">
                        <h1>I'm at Home Homie</h1>
                    </div>
                    <div className="login">
                        <Login {...this.props}></Login>
                    </div>
                    <div className="reggie">
                        <Route path="/register" Component={Register}></Route>
                    </div>
                </div>
                <video src={smoke} muted loop autoPlay />
                <div className="overlay" />
            </section>
        );
    }
}

export default Home;
