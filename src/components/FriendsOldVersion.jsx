import React, { Component, useDebugValue } from "react";
import * as userService from "../services/userService";
import * as friendService from "../services/friendService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import SingleFriend from "../components/SingleFriend";

//*** Just for training!!!

class FriendsOldVersion extends Component {
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
    // console.log("From Delete: ", e.currentTarget.dataset.myfriendid);
    // console.log("From Delete: ", myFriendObj);
  };
  onEditeRequested = (myFriendObj) => {
    // console.log("From Edit: ", e.currentTarget.dataset.myfriendid);
    // console.log("From Edit: ", myFriendObj);
  };

  mapFriend = (aFriend) => {
    return (
      <div key={`friendId-${aFriend.id}`} className="card">
        <img
          className="card-img-top"
          src={aFriend.primaryImage.imageUrl}
          alt={aFriend.title}
        />
        <div className="card-body">
          <h5 className="card-title">{aFriend.title}</h5>
          <p className="card-text">{aFriend.summary}</p>
          <button
            type="button"
            className="btn btn-primary"
            // onClick={() => {
            //   this.onDeleteRequested(aFriend);
            // }} //** a way to access the whole chosen obj on click event (not efficient tho: on every render() it produces a new arr)
            // data-myfriendid={aFriend.id} //** a way to access the id of the chosen obj on click event
            onClick={this.onDeleteRequested} //** this way should always be used, but then we don't have access to the actual firend obj, so (see below!)
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-primary"
            // onClick={() => {
            //   this.onEditeRequested(aFriend);
            // }}
            // data-myfriendid={aFriend.id}
            onClick={this.onEditeRequested}
          >
            Edit
          </button>
        </div>
      </div>
    );
  };

  // **** So, for efficiency:we move the whole return part of this map function to  anew functional compo (SingleFriend)

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

export default FriendsOldVersion;
