import React from "react";
import * as FriendsService from "../../services/FriendsService";
// eslint-disable-next-line
import UserFriends from "./UserFriends";
import AddFriend from "./AddFriend";
import EditFriends from "./EditFriends";
import ShowNewFriend from "./ShowNewFriend";

import "./Friends.css";

class Friends extends React.Component {
    state = {
        loadUser: true,
        loadUserOnUpdate: false,
        haveFriendData: false,
        activeUser: false,

        friends: [],
        postFriend: {
            title: "",
            bio: "",
            summary: "",
            headline: "",
            statusId: "Active",
            primaryImage: "",
            slug: "",
        },
        display: {
            editFriendPayload: {
                id: "",
                title: "",
                bio: "",
                summary: "",
                headline: "",
                statusId: "Active",
                primaryImage: "",
                slug: "",
            },
            ShowFriends: false,
            AddFriend: false,
            ShowNewFriend: false,
            EditFriend: false,
            editPayload: false,
            friendToEdit: {
                id: "",
                title: "",
                bio: "",
                summary: "",
                headline: "",
                statusId: "Active",
                primaryImage: "",
                slug: "",
            },
        },
    };
    componentDidMount() {
        if (this.props.appState.activeUser === true) {
            FriendsService.getAllFriends()
                .then(this.onGetFriendsOK)
                .catch(this.onGetFriendsFail);
        }
    }
    componentDidUpdate() {
        let updateFriends = this.state.haveFriendData;
        if (updateFriends === false) {
            updateFriends = true;

            FriendsService.getAllFriends()
                .then(this.onGetFriendsOK)
                .catch(this.onGetFriendsFail);
        }
    }

    onGetFriendsOK = res => {
        let friends = res.data.item.pagedItems;
        const BetterFriends = [];

        for (let i = 0; i < friends.length; i++) {
            const friendData = friends[i];
            //console.log(friendData.primaryImage.imageUrl);
            let scrubFriend = {};
            scrubFriend.id = friendData.id;
            scrubFriend.title = friendData.title;
            scrubFriend.primaryImage = friendData.primaryImage.imageUrl;
            scrubFriend.slug = friendData.slug;
            scrubFriend.statusId = friendData.statusId;
            scrubFriend.bio = friendData.bio;
            scrubFriend.summary = friendData.summary;
            scrubFriend.headline = friendData.headline;

            BetterFriends.push(scrubFriend);
        }
        //console.log(BetterFriends);
        if (this.state.friends.length <= 0) {
            this.setState(() => {
                let newState = { ...this.state };
                newState.friends = BetterFriends;
                newState.haveFriendData = true;
                return newState;
            });
        }
    };
    onGetFriendsFail = err => console.log(err);

    onRenderClicked = (e, data) => {
        // handles showing user all friends, need to reach back to the UserFriend buttons for functionality on EDIT/Delete
        e.preventDefault();

        let friendToEdit = data || null;
        let button = e.currentTarget.name;
        //console.log("Render Clicked", e.currentTarget.name, friendToEdit);
        if (button === "ShowFriends") {
            this.setState(() => {
                let newState = { ...this.state.display };
                newState[button] = true;
                newState.AddFriend = false;
                newState.ShowNewFriend = false;
                newState.EditFriend = false;

                return { display: newState };
            });
        } else if (button === "AddFriend") {
            this.setState(() => {
                let newState = { ...this.state.display };
                newState[button] = true;
                newState.ShowFriends = false;
                newState.ShowNewFriend = false;
                newState.EditFriend = false;
                return { display: newState };
            });
        } else if (button === "AddNewFriend") {
            let payload = this.state.postFriend;
            //console.log("sending: ", payload);
            FriendsService.addFriend(payload)
                .then(this.addFriendOk)
                .catch(this.addFriendErr);
        } else if (button === "EditFriend") {
            // console.log("Editing: ", friendToEdit);

            this.setState(prevState => {
                let newState = { ...this.state.display };
                newState[button] = true;
                newState.ShowFriends = false;
                newState.ShowNewFriend = false;
                newState.AddFriend = false;
                newState.friendToEdit = friendToEdit;
                return { display: newState };
            });
        }
    };
    addFriendOk = res => {
        let newFriend = JSON.parse(res.config.data);
        let currentFriends = this.state.friends;
        console.log(res, currentFriends, newFriend);
        newFriend.id = res.data.item;
        currentFriends.push(newFriend);

        this.setState(prevState => {
            let newState = { ...prevState.display };
            let friendState = { ...prevState.friends };
            newState.ShowNewFriend = true;
            newState.AddFriend = false;
            newState.ShowFriends = false;
            friendState = currentFriends;
            return { display: newState, friends: friendState };
        });
    };
    addFriendErr = err => console.log(err);

    onFormChange = e => {
        // let currentValue = e.currentTarget;
        let newValue = e.currentTarget.value;
        let inputName = e.currentTarget.name;
        //console.log("testing", currentValue, newValue, inputName);

        this.setState(() => {
            let newState = { ...this.state.postFriend };
            newState[inputName] = newValue;
            return { postFriend: newState };
        });
    };

    onDeleteClick = (e, id) => {
        e.preventDefault();

        FriendsService.deleteFriend(id)
            .then(this.onDeleteOk)
            .catch(err => console.error(err));
    };

    onDeleteOk = res => {
        console.log("axiosResponse: ", res);
        let badId = res;
        let currentFriends = [...this.state.friends];

        this.setState(prevState => {
            const indexOfPerson = currentFriends.findIndex(
                friend => friend.id === badId
            );
            const remainingFriends = [...prevState.friends];

            if (indexOfPerson >= 0) {
                remainingFriends.splice(indexOfPerson, 1);
            }
            return { friends: remainingFriends };
        });
    };

    editFormData = e => {
        //console.log(e.currentTarget.value, e.currentTarget.name);
        let value = e.currentTarget.value;
        let inputName = e.currentTarget.name;

        this.setState(prevState => {
            let newState = { ...prevState.display };

            // console.log(newState);
            newState.editFriendPayload[inputName] = value;

            return { display: newState };
        });
    };

    onEditClick = (e, id) => {
        e.preventDefault();
        let payload = this.state.display.editFriendPayload;
        payload.id = id;

        //console.log(e.currentTarget, id);
        FriendsService.editFriend(payload, id)
            .then(this.onEditOk)
            .catch(err => console.error(err));
    };

    onEditOk = res => {
        console.log("FriendUpdated: ", res);
        let editFriendId = res.id;
        let currentFriends = [...this.state.friends];
        //console.log(editFriendId, currentFriends);
        for (let i = 0; i < currentFriends.length; i++) {
            const friend = currentFriends[i];
            if (friend.id === editFriendId) {
                console.log("BeforeSplice", currentFriends);
                let oldFriend = currentFriends.findIndex(item => {
                    return item.id === editFriendId;
                });
                console.log(oldFriend);
                currentFriends.splice(oldFriend, 1);
                console.log("afterSplice", currentFriends);
                currentFriends.push(res);
                console.log("afterPush", currentFriends);
            }
        }

        //FIX THIS SHIT ASAP (GET A GRIP ON WHAT YOU'RE MODIFYING.. QUE FIRST THING TOMORROW)

        // this.setState(prevState => {
        //     let newState = { ...prevState.friends };
        //     //let displayOptions = {...prevState.display}
        //     newState.friends = currentFriends;
        //     // displayOptions: {
        //     //     ShowFriends: false,
        //     //     AddFriend: false,
        //     //     ShowNewFriend: false,
        //     //     EditFriend: false,
        //     //     editPayload: false,
        //     // }

        //     return {...prevState.friends: newState};
        // });
    };

    render() {
        let user = this.props.appState.currentUser.firstName;
        let pic = this.props.appState.currentUser.photo;
        const newFriend = this.state.friends[this.state.friends.length - 1];

        return (
            <React.Fragment>
                <main>
                    <div className="container-fluid">
                        <div className="d-flex" id="wrapper">
                            {/* Sidebar */}
                            <div
                                className="bg-light border-right"
                                id="sidebar-wrapper"
                            >
                                <div className="sidebar-heading">
                                    Welcome {user}
                                    <div>
                                        <img
                                            id="user-img"
                                            src={pic}
                                            alt={user}
                                        />
                                    </div>
                                </div>

                                <div className="list-group list-group-flush">
                                    <button
                                        className="btn link-button"
                                        onClick={this.onRenderClicked}
                                        button-type="button"
                                        name="ShowFriends"
                                    >
                                        Show my Friends
                                    </button>
                                    <button
                                        className="btn link-button"
                                        onClick={this.onRenderClicked}
                                        button-type="button"
                                        name="AddFriend"
                                    >
                                        + Add A Friend
                                    </button>
                                </div>
                            </div>
                            {/* /#sidebar-wrapper */}
                            {/* Page Content */}
                            <div id="page-content-wrapper">
                                <div
                                    id="friend-box"
                                    className="container-fluid"
                                >
                                    {/* != important today -- next impliment pagination (horizontal or scroll) for multiple pages of friends---*/}
                                    {this.state.display.ShowFriends && (
                                        <UserFriends
                                            friends={this.state.friends}
                                            delete={this.onDeleteClick}
                                            edit={this.onRenderClicked}
                                        />
                                    )}
                                    {this.state.display.AddFriend && (
                                        <AddFriend
                                            handler={this.onRenderClicked}
                                            form={this.onFormChange}
                                            fData={this.state.postFriend}
                                            delete={this.onDeleteClick}
                                        />
                                    )}
                                    {this.state.display.ShowNewFriend && (
                                        <ShowNewFriend
                                            friend={newFriend}
                                            delete={this.onDeleteClick}
                                            edit={this.onRenderClicked}
                                        />
                                    )}
                                    {this.state.display.EditFriend && (
                                        <EditFriends
                                            appState={this.state}
                                            formControl={this.editFormData}
                                            handler={this.onEditClick}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default Friends;
