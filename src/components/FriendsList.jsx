import React, { Component } from "react";
import friendsService from "../services/friendsService";
import NavBar from "./NavBar";
import OneFriendCard from "./OneFriendCard";
import { NavLink } from "react-router-dom";

class FriendsList extends Component {
    state = {};


    componentDidMount() {
        friendsService.allFriends()
            .then(this.onAllFriendsSuccess)
            .catch(this.onAllFriendsError)
    }

    onAllFriendsSuccess = (response) => {
        console.log("all friends success", response.data.item.pagedItems)
        const myFriends = response.data.item.pagedItems;

        this.setState((preState) => {
            return { mappedFriends: myFriends.map(this.mapFriend) }
        })
        console.log("this is mappedFriends", myFriends.map(this.mapFriend))
    }
    onAllFriendsError = (response) => {
        console.log("all friends error", response)
    }

    mapFriend = (oneFriend) => {
        return (
            // functional component from that child component
            <OneFriendCard
                key={oneFriend.id}
                title={oneFriend.title}
                imgSrc={oneFriend.primaryImage.imageUrl}
                headline={oneFriend.headline}
                summary={oneFriend.summary}
                id={oneFriend.id}
                onDeleteButtonClicked={this.onDeleteClick}
                onEditButtonClicked={this.onEditClick}
            />
        )
    };
    onEditClick = (e) => {
        console.log("you clicked edit")

    }




    onDeleteClick = (e) => {
        const friendId = e.currentTarget.dataset.friendId;
        console.log("friend Id: ", friendId);
        const passIdToSuccessHandler = this.onDeleteSuccess(parseInt(friendId));
        friendsService.delete(friendId)
            .then(passIdToSuccessHandler)
            .catch(this.onDeleteError)
    }

    onDeleteSuccess = (deletedFriendId) => {
        console.log("in delete Success: ", deletedFriendId)

        this.setState((prevState) => {
            console.log(prevState.mappedFriends[0].props.id)

            const indexOfFriend = prevState.mappedFriends.findIndex(
                (singleArrayFriend) => singleArrayFriend.props.id === deletedFriendId
            );
            const updatedFriend = [...prevState.mappedFriends];

            if (indexOfFriend >= 0) {
                updatedFriend.splice(indexOfFriend, 1);
            }
            return {
                mappedFriends: updatedFriend
            };
        });
    }

    onDeleteError = (deletedFriendId) => {
        console.log("in delete success: ", deletedFriendId)


    };
    onDeleteError = (response) => {
        console.warn("delete did not work", response)
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div
                    className="jumbotron jumbotron-fluid"
                    id="friendsJumbo"
                >
                    <div className="container">
                        <h1
                            className="display-3"
                            style={{ color: "white" }}
                        ><strong>Your Friends</strong></h1>
                        <p
                            className="lead"
                            style={{ color: "white" }}
                        >
                            <strong id="listFriendsHeader">Below, a list of all your current friends <NavLink to="/friendForm">Click here to add a New Friend</NavLink></strong>
                        </p>

                    </div>
                </div>
                <div className="col-md-12 p-5">
                    <hr />
                    <div className="row">
                        {this.state.mappedFriends}
                    </div>
                </div>
            </React.Fragment >
        );
    }
}


export default FriendsList;