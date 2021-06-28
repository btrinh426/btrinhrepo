import React from "react";
import * as registerUserService from "../services/registerUserService";
import Pagination from 'rc-pagination';
import "rc-pagination/assets/index.css";

class Friends extends React.Component {
    state = {
        friends: [],
        item: { pageIndex: 0, pageSize: 4 }
    };

    componentDidMount() {
        registerUserService.getFriends()
            .then(this.onFriendsSuccess)
            .catch(this.onFriendsError);
    }

    //    onChange = (page) => {
    //        console.log(page);
    //        this.setState(() => {
    //         return { current };

    onFriendsSuccess = (response) => {
        console.log("These are my friends", response);
        var friends = response.data.item.pagedItems;
        console.log(friends); // shows array of friends
        this.setState(() => {
            return { friends }; //property & value are the same

            // returns a new state; does not "change" the previous state!
            // return { friends: friends.map (a new, populated array!)}

            //updating an old array - don't do this!
            // const arr = []
            // arr.push('dog')
            // arr => ['dog']
        });
    };

    onFriendsError = (error) => {
        console.log("These are not my friends", error);
    };

    onEditCard = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(e.currentTarget.dataset); // dataset is property
        console.log(e.currentTarget.dataset.friendId); //data-friend-id & //friendId
        let friendIdData = e.currentTarget.dataset.friendId
        this.props.history.push(`/friends/${friendIdData}/edit`)

        // let friendData = this.state.friends;
        // console.log(friendData);
        // let friendIdData = e.currentTarget.dataset.friendId;
        // console.log(friendIdData)
        // registerUserService.editById(friendData, friendIdData)
        //     .then(this.onUpdateFriendsSuccess)
        //     .catch(this.onUpdateFriendsError)

    };

    onUpdateFriendsSuccess = (friend, friendId) => {
        console.log("I am going to update this friend", friend, friendId);
    }

    onUpdateFriendsError = (error) => {
        console.log("This is my registered friend error", error);
    }


    onDeleteCard = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(e); //button works
        console.log(e.currentTarget.dataset); // dataset is property
        console.log(e.currentTarget.dataset.friendId); //data-friend-id & //friendId
        let friendIdData = e.currentTarget.dataset.friendId;
        console.log(friendIdData);
        registerUserService.deleteFriends(friendIdData)
            .then(this.onDeleteFriendsSuccess)
            .catch(this.onDeleteFriendsError)
    };

    onDeleteFriendsSuccess = (response) => {
        console.log("I am deleting my friend", response);
        const filteredFriends = this.state.friends.filter(friend => {
            return friend.id !== response.config.friendId // need to have same type & number
        }) // Filter this.state.friends for friends with an id not equal to the id being removed
        console.log(filteredFriends);
        this.setState(() => {
            return { friends: filteredFriends };
        });
    }

    onDeleteFriendsError = (error) => {
        console.log("I wasn't able to delete my friend", error);
    }

    // {
    //     "item": {
    //       "pageIndex": 0,
    //       "pageSize": 1,
    //       "totalCount": 9,
    //       "totalPages": 9,
    //       "pagedItems": [
    //         {
    //           "id": 21685,
    //           "bio": "Michael Phelps the Olympian",
    //           "title": "Swimming",
    //           "summary": "Michael Phelps is the greatest Olympian of all time",
    //           "headline": "Michael Phelps won 8 gold medals at the 2008 Beijing Olympic Games",
    //           "entityTypeId": 1,
    //           "statusId": "Active",
    //           "slug": "PhelpsPhan1",
    //           "skills": null,
    //           "primaryImage": {
    //             "id": 9502,
    //             "entityId": 21685,
    //             "imageTypeId": "Main",
    //             "imageUrl": "https://image.cnbcfm.com/api/v1/image/106256323-1574268063058gettyimages-587852454.jpeg?v=1610468347&w=1400&h=950"
    //           },
    //           "dateCreated": "2021-02-22T07:06:23.53",
    //           "dateModified": "2021-02-22T07:06:23.53"
    //         }
    //       ],
    //       "hasPreviousPage": false,
    //       "hasNextPage": true
    //     },
    //     "isSuccessful": true,
    //     "transactionId": "dcc7048d-0b4f-4b4d-8a3c-dd0c654e8203"
    //   }



    onChange = (page) => {
        console.log("This is my page", page)
        // let myNewPageIndex = this.state.item.pageIndex
        // let myNewPageSize = this.state.item.pageSize
        this.setState((prevState) => {
            console.log(prevState.item);
            // var pageInfo = { ...this.state.item }
            // pageInfo.pageIndex = myNewPageIndex;
            // pageInfo.pageSize = myNewPageSize;
            // return { myNewPageIndex }

            registerUserService.getNumberFriends(page - 1, 4)
                .then(this.ongetNumberFriendsSuccess)
                .catch(this.ongetNumberFriendsError)
        })
    }


    ongetNumberFriendsSuccess = (response) => {
        console.log("This is my pagination", response);
        console.log(response.data.item.pagedItems)
        let pagedFriendResponse = response.data.item.pagedItems;
        this.setState((prevState) => {
            let newFriendState = { ...prevState.friends }
            newFriendState.pagedFriendResponse = pagedFriendResponse
            return { newFriendState }
        });
        // let friendPageIndex = response.item.pageIndex;
        // let friendPageSize = response.item.pageSize;
        // console.log(friendPageIndex);
        // console.log(friendPageSize);
    }
    ongetNumberFriendsError = (error) => {
        console.warn("This is my error for pagination", error);
    }

    onHandleChange(e) {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;
        console.log({ newValue, currentTarget, inputName });


    };

    mapFriends = (oneFriend) => {
        return (
            <React.Fragment key={`Friend-${oneFriend.slug}`}>
                <div className="card" style={{ width: "21rem" }}>
                    <img
                        src={oneFriend.primaryImage.imageUrl}
                        className="card-img-top"
                        alt="Something here"
                    />
                    <div className="card-body">
                        <center>
                            <h5 className="card-title">{oneFriend.title}</h5>
                            <p className="card-text">{oneFriend.bio}</p>
                        </center>
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <button
                                className="btn btn-info"
                                onClick={this.onEditCard}
                                data-friend-id={oneFriend.id}
                            >
                                Edit
              </button>
                            <button
                                className="btn btn-danger"
                                data-friend-id={oneFriend.id}
                                onClick={this.onDeleteCard}
                            >
                                Delete
              </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    //     })
    // }
    //array.map takes a function which runs on every element in the array, and returns a new array. It doesn't modify the old array!!
    //this.state.friends is the array
    //the function is this.mapFriends

    // this.state.friends.map(this.mapFriends) //array, take this function & and return new array, which is an array of DOM elements

    //pseudo code:
    // //this.state.friends.map((oneFriend) => return (
    //     <DOMElementThatRepresentsAFriend/>
    // /))

    //this function is this.mapFriends
    // (oneFriend) => return (
    //     //     <DOMElementThatRepresentsAFriend/>
    // /)

    render() {
        return (
            <div style={{ marginLeft: "2rem", padding: "2rem" }} >
                <div className="container">
                    <div className="col-md-12">
                        <div className="friend-info-container">
                            <h1>Friends</h1>
                            <input type="text"
                                className="form-control"
                                id="exampleFrriendSearch1"
                                name="friendSearch"
                                aria-describedby="friendSearchHelp"
                                placeholder="Find your Friend"
                                onChange={this.onHandleChange}
                            />
                        </div>
                        <div className="row">{this.state.friends.map(this.mapFriends)}</div>
                        {/*state.friends.map(this.mapFriends)*/}
                    </div>
                    <Pagination
                        currentPage={1}
                        defaultPageSize={4}
                        onChange={this.onChange}
                        current={this.state.item}
                        total={20}
                    />
                </div>
            </div >

        );
    }
}

export default Friends;
