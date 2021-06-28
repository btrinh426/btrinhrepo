import React from "react";
import * as friendService from "../services/friendService";
import SingleFriend from "./SingleFriend";
// import Pagination from "rc-pagination";

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

    onEditClicked = (friend) =>
    {
        console.log(friend);

        this.props.history.push(`/friendform/${friend.id}`);
    }

    onDeleteClicked = () =>
    {

    }

    onGetByPageSuccess = (response) =>
    {
        console.log(response.data);

        let myFriends = response.data.item.pagedItems;

        this.setState(() => {
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
                <SingleFriend 
                    friend={oneFriend} 
                    onClick={this.onEditClicked}
                ></SingleFriend>
            </React.Fragment>
        );
    }

    render()
    {
        return (
            <div className="col-md-12 p-5">
                <h1>Friends</h1>
                <hr />
                <div>
                    <input type="text" className="form-control" id="inputSearch" placeholder="Search" />
                    <button type="button" className="btn btn-primary searchItem" style={{ marginTop: 5 }}>Search</button>
                </div>
                <div className="row">
                    {this.state.mappedFriends}
                </div>
            </div>
        );
    }
}

export default FriendList;