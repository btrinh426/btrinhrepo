import React from "react";

import "./Home.css";

class Home extends React.Component {
    //-- Need to know if there is a current user when this page is logged in.
    state = {
        activeUser: false,
        loadUserOnUpdate: true,
        currentUser: {
            firstName: "",
            lastName: "",
            email: "",
            id: "",
            photo: "",
        },
    };

    componentDidMount() {
        console.log("home users", this.props.appState.currentUser);

        // this.setState(prevState => {
        //     let newState = { ...this.prevState };

        //     newState.activeUser = true;
        //     newState.currentUser = this.props.appState.currentUser;
        //     console.log(newState);
        //     return newState;
        // });
    }
    componentDidUpdate() {
        console.log("Home Updated", this.state);
        // if (this.state.loadUserOnUpdate === true) {
        //     this.setState(prevState => {
        //         let newState = { ...this.prevState };

        //         newState.activeUser = true;
        //         newState.currentUser = this.props.appState.currentUser;
        //         newState.loadUserOnUpdate = false;
        //         console.log(newState);
        //         return newState;
        //     });
        // }
    }

    render() {
        console.log("home", this.props.appState.currentUser);
        let appUserStatus = this.props.appState.activeUser;
        let appUserData = this.props.appState.currentUser;
        console.log(appUserData);
        return (
            <React.Fragment>
                <div className="App">
                    <main role="main">
                        <div className="container-fluid">
                            <div className="welcome flex-container">
                                <WelcomeWagon
                                    isUser={appUserStatus}
                                    user={appUserData.firstName}
                                    pic={appUserData.photo}
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
    //console.log(props);
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
