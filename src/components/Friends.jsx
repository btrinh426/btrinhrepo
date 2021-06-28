import React, { Component, useDebugValue } from "react";
import * as userService from "../services/userService";
import * as friendService from "../services/friendService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import SingleFriend from "../components/SingleFriend";

class Friends extends Component {
  state = { friendsArr: [], mappedFriendsArr: [] };

  onPlusFriendClicked = () => {
    console.log("onPlusFriendClicked btn clicked");
    this.props.history.push("/add-friends");
  };

  componentDidMount() {
    friendService
      .getAllFriendsPaginated(0, 20)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  }

  onGetAllSuccess = (response) => {
    // let totalRecords = response.data.item.totalCount;
    // for (let i = 0; i < totalRecords; i++) {
    //   console.log(`Friend no. ${i}: `, response.data.item.pagedItems[i].title);
    // }

    let myFriendsArr = response.data.item.pagedItems;
    this.setState((prevState) => {
      return {
        friendsArr: myFriendsArr,
        mappedFriendsArr: myFriendsArr.map(this.mapFriend),
      };
      //*** Overwrites "friendsArr" AND adds a new property, "mappedFriends"-which is another array- to the state.
    });
  };

  onGetAllError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong!");
  };

  onDeleteRequested = (myFriendObj) => {
    console.log("From Delete: ", myFriendObj);
    let myFriendObjId = myFriendObj.id;

    friendService
      .deleteById(myFriendObjId)
      .then(this.onDelFriendSuccess)
      .then(console.log(`friend w/ Id-${myFriendObjId} was deleted!`))
      .catch(this.onDelFriendError);
  };

  onDelFriendSuccess = (response) => {
    Swal.fire("Friend successfully deleted!");
  };

  onDelFriendError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong!");
  };

  onEditeRequested = (myFriendObj) => {
    console.log("From Edit: ", myFriendObj);
    let myFriendObjId = myFriendObj.id;
    this.history.push(`/friends/${myFriendObjId}/edit`);
  };

  mapFriend = (aFriend) => {
    return (
      <SingleFriend
        key={`friendId-${aFriend.id}`}
        firend={aFriend}
        deleteAFriend={this.onDeleteRequested}
        EditAFriend={this.onEditeRequested}
      />
    );
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md bg-blue sabio">
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <h5>Friends</h5>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-warning my-2 my-sm-0"
                  type="button"
                  onClick={this.onPlusFriendClicked}
                >
                  + Friend
                </button>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search Friends
              </button>
            </form>
          </div>
        </nav>
        <div className="col-md-12 p-5">
          <div className="row">{this.state.mappedFriendsArr}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
