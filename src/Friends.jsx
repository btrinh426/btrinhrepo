import React from "react";
import Pagination from "rc-pagination";
import SingleFriend from "./SingleFriend";
import * as friendService from "./services/friendService";

class Friends extends React.Component
{
    state = {
        friendInfo: {
        title: "Friend Name:",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        primaryImage: ""
        },
        searchQuery: ""
    }

    componentDidMount(){
        friendService.getAll()
            .then(this.onGetFriendsSuccess)
            .catch(this.onGetFriendsError);
    }

    onFormFieldChanged = (e) =>
    {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;

        this.setState(()=>{
            let searchQuery = {...this.state.searchQuery};

            searchQuery = newValue;

            return {searchQuery};
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        console.log(this.state.searchQuery);
        friendService.search(this.state.searchQuery)
            .then(this.onSearchSuccess)
            .catch(this.onSearchError);
    }

    onSearchSuccess = (response) => {
        console.log(response.data.item.pagedItems);
        this.setState(() => {
            return {friends: response.data.item.pagedItems.map(this.mapFriend)}
        });
    }
    onSearchError = (error) => {
        console.error(error);
    }

    mapFriend = (friend) => {


        return (
            <React.Fragment key={friend.id}>
                <SingleFriend aPerson={friend} onEdit={this.onEditFriend} onDelete={this.onDeleteFriend}></SingleFriend>
            </React.Fragment>
        )
    }

    onGetFriendsSuccess = (response) => {
        console.log(response.data.item.pagedItems);

        this.setState(() => {
            return {friends: response.data.item.pagedItems.map(this.mapFriend)}
        });
    }
    onGetFriendsError = (response) => console.warn({error: response});

    onEditFriend = (person) => {
        console.log(person);
        this.props.history.push("/friendedit/" + person.id);
    }
    onDeleteFriend = (person) => {
        console.log(person.id);
        friendService.remove(person.id)
            .then(this.onDeleteSuccess)
            .catch(this.onDeleteError);
    }
    onDeleteSuccess = (response) => console.log(response);
    onDeleteError = (error) => console.error(error);

    // onDeleteFriendV1 = (e) => {
    //     console.log(e.currentTarget.dataset.friendId);
    // }

    render(){
        return (
            <React.Fragment>
                <div className="container pt-5 pb-5">
                    <div className="row pb-5 text-center">
                        <h1 className="col-12">Friends</h1>
                    </div>
                    <div className="row input-group pb-5 mx-auto justify-content-center">
                        <input type="search" className="col-9 form-control" onChange={this.onFormFieldChanged}></input>
                        <button type="button" className="btn btn-primary mx-auto" onClick={this.submitForm}>Search Friends</button>
                    </div>
                    <div className="row">
                        {this.state.friends}
                    </div>
                    <Pagination defaultPageSize defaultCurrent></Pagination>
                </div>
            </React.Fragment>
        )
    }
}

export default Friends;