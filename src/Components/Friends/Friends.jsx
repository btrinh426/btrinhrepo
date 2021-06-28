import React from "react";
import * as friendServices from "../../services/friendsService";
// eslint-disable-next-line
import UserFriends from "./UserFriends";

import "./Friends.css";

class Friends extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {
        userData: {
            firstName: "Person",
        },
        friendsVisible: false,
    };
    // componentDidMount() {
    //     friendServices
    //         .getAllFriends()
    //         .then(this.onAllFriendsOK)
    //         .catch(this.onAllFriendsFail);
    // }
    // onAllFriendsOK = res => {
    //     console.log(res.data);
    // };

    // onAllFriendsFail = err => console.log(err);

    onRenderClicked = e => {
        // handles showing user all friends, need to reach back to the UserFriend buttons for functionality on EDIT/Delete
        e.preventDefault();
        console.log("Render Clicked");
        this.setState(() => {
            let newState = {};
            let currentStateProp = { ...this.state.friendsVisible };
            newState[currentStateProp] = true;
            return { friendsVisible: newState };
        });
    };

    // componentDidUpdate(prevProps) {
    //     let currentPath = this.props.location.pathName;
    //     let previousPath = prevProps.location.pathName;

    //     console.log(currentPath, previousPath);
    // }

    render() {
        console.log(this.state);
        return (
            <React.Fragment>
                <main>
                    <div className="container-fluid">
                        <div className="jumbotron">
                            <h1 className="display-4">
                                Hello, {this.state.userData.firstName}
                            </h1>
                            <p className="lead">
                                Welcome to your Happy Place Friends page. Here
                                you can view and make changes to your Firends or
                                add someone new to your connections.
                            </p>
                            <hr className="my-4" />
                            <p>What would you like to do?</p>
                            <button
                                className="btn btn-outline-secondary btn-lg"
                                onClick={this.onRenderClicked}
                                button-type="button"
                                name="render"
                            >
                                Show my Friends
                            </button>
                            <a
                                className="btn btn-outline-secondary btn-lg"
                                href="/Friends"
                                role="button"
                            >
                                + A Friend
                            </a>
                            <a
                                className="btn btn-outline-secondary btn-lg"
                                href="/Friends"
                                role="button"
                            >
                                Edit A Friend
                            </a>
                        </div>
                    </div>
                    <div id="friend-box" className="container-fluid">
                        {/*--- On Button click setState to friendsVisible to TRUE, when next button clicked set back to false --- !!! Explain logic in meeting!!!*/}
                        {/* != important today -- next impliment pagination (horizontal or scroll) for multiple pages of friends---*/}
                        {/* {this.state.friendsVisible ? <UserFriends /> : null} */}
                        {this.state.friendsVisible && <UserFriends />}
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default Friends;
