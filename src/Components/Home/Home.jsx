import React from "react";
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
            photo: "",
        },
    };
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        userService
            .currentUser()
            .then(this.onCurrentUserOK)
            .catch(this.onCurrentUserFail);
        //console.log(this.state);
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
                                <WelcomeWagon
                                    isUser={this.state.loggedInStatus}
                                    user={this.state.currentUser.firstName}
                                    pic={this.state.currentUser.photo}
                                    // id={this.state.currentUser.id}
                                    // email={this.state.currentUser.email}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

function WelcomeWagon(props) {
    console.log(props);
    let status = props.isUser;
    let user = props.user;
    let pic = props.pic;
    let id = props.id;
    let email = props.email;

    if (status === true) {
        // console.log({ user });
        return <GreetUser user={user} pic={pic} email={email} id={id} />;
    } else if (status === false) {
        return <Greetings />;
    }
}

function GreetUser(props) {
    const user = props.user;
    const photo = props.pic;
    // const id = props.id;
    // const email = props.email;

    return (
        <React.Fragment>
            <div>
                <img src={photo} alt="" className="img" />
                <p className="text">Welcome to your Happy Place {user}</p>
            </div>
            {/* <div className="userInfo">
                
                <p className="text">User ID: {id}</p>
                <p className="text">Contact: {email}</p>
            </div> */}
        </React.Fragment>
    );
}

function Greetings() {
    //add photo later
    return (
        <React.Fragment>
            <p className="text">
                Greetings! <br />
                Please sign in or register.
            </p>
        </React.Fragment>
    );
}

export default Home;
