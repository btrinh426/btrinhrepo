import React from "react";
import { Route } from "react-router-dom";
import Login from "./Homechilds/Login";
import Register from "./Homechilds/Register";
import "./HomeStyle/Home.scss";
//import * as userServices from "../../services/UserService";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        //console.log(this.props.history.location);
        // const { state: propState } = this.props.location;
        // if (!this.state.showLogin && propState.type === "SLOGIN") {
        //     console.log("VENI VITTI VICI");
        //     this.setState({ showLogin: true });
        // }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row d-flex test justify-content-center">
                    <h1>Welcome to Domination</h1>
                    <span>Please Login or Register to continue</span>
                </div>

                <div className="login">
                    <Login {...this.props}></Login>
                </div>
                <div className="reggie">
                    <Route path="/register" Component={Register}></Route>
                </div>
            </div>
        );
    }
}

export default Home;
