import React from "react";
import * as friendService from "../services/friendService";
import SingleFriend from "./SingleFriend";

class FriendList extends React.Component
{
    state = {
        friends: {
            id: ""
            // bio: "",
            // summary: "",
            // headline: "",
            // slug: "",
            // statusId: "",
            // primaryImage: ""
        }
    }

    componentDidMount()
    {
        friendService.getByPage(0, 10)
            .then(this.onGetByPageSuccess)
            .catch(this.onGetByPageError)
    }

    onDeleteClicked = (friend) =>
    {
        console.log(friend);
    }

    onGetByPageSuccess = (response) =>
    {
        console.log(response.data);

        let myFriends = response.data.item.pagedItems;

        this.setState((prevState) => {
            return { mappedFriends: myFriends.map(this.mapFriend) };
        });
    }
    onGetByPageError = (errResponse) =>
    {
        console.error(errResponse);
    }

    mapFriend = (oneFriend) =>
    {
        return (
            <React.Fragment key={`Friend-${oneFriend.id}`}>
                <SingleFriend friend={oneFriend} onClick={this.onDeleteClicked}></SingleFriend>
            </React.Fragment>
        );
    }

    render()
    {
        return (
            <div className="col-md-12 p-5">
                <h1>Friends</h1>
                <hr />
                <div className="row">
                    {this.state.mappedFriends}
                </div>
            </div>
        );
    }
}

export default FriendList;