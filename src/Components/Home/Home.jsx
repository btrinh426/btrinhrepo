import React from "react";
// import { render } from "react-dom";
import * as userService from "../../services/userService";

import "./Home.css";

class Home extends React.Component {
    state = {
        loggedInStatus: false,
        currentUser: {
            firstName: "",
            lastName: "",
            email: "",
            id: "",
        },
    };
    constructor(props) {
        super(props);
        console.log({ props });
    }
    componentDidMount() {
        userService
            .currentUser()
            .then(this.onCurrentUserOK)
            .catch(this.onCurrentUserFail);
    }
    onCurrentUserOK = res => {
        const userId = res.data.item.id;
        console.log("User Detected: ", userId);
        userService
            .getUserId(userId)
            .then(this.loadUser)
            .catch(res => console.error(res));
    };
    onCurrentUserFail = res => console.log(res);

    loadUser = res => {
        let userObj = res.data.item;
        const user = {};
        user.firstName = userObj.firstName;
        user.lastName = userObj.lastName;
        user.id = userObj.id;
        user.email = userObj.email;
        user.photo = userObj.avatarUrl;

        //console.log(user);

        this.setState(() => {
            let newState = {};
            newState.loggedInStatus = true;
            newState.currentUser = user;
            return newState;
        });
    };
    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <main role="main">
                        <div className="container-fluid">
                            <div className="welcome flex-container">
                                <img
                                    src={this.state.currentUser.photo}
                                    alt=""
                                    className="img"
                                />
                                <p className="text">
                                    Welcome to your Happy Place{" "}
                                    {this.state.currentUser.firstName}
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
