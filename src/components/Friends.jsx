import React, { Component } from "react";
import * as friendService from "../services/friendService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import SingleFriend from "../components/SingleFriend";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../App.css";

class Friends extends Component {
  state = {
    friendsArr: [],
    mappedFriendsArr: [],
    q: "",
    currentPage: 0,
    totalCount: 20,
    pageSize: 2, //** has to be Fixed (hard-coded)????
  };

  onPlusFriendClicked = () => {
    console.log("We should re-direct to add/edit page");
    this.props.history.push("/add-friends");
  };

  //********Version -2 */

  componentDidMount() {
    this.getAllFriends();
  } //* to get the real totalCount for the state.

  onChange = (page) => {
    //*** Where does this "page" initially come from? From the btn number?!
    console.log("page from onChange : ", { page });
    let rightPageIndex = page - 1;

    this.setState((prevState) => {
      return {
        currentPage: rightPageIndex,
      };
    }, this.getAllFriends);
    //*** we call the getAll() as a "call back func" of setState, so that we are sure it wouldn't run until setState() is done!!!
  };

  getAllFriends = () => {
    //** defined it here, this way, so that we can call it more than once!!!***
    friendService
      .getAllFriendsPaginated(this.state.currentPage, this.state.pageSize)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  };

  onGetAllSuccess = (response) => {
    let myFriendsArr = response.data.item.pagedItems;
    // console.log("myFriendsArr (from success-response): ", myFriendsArr);
    let myTotalCount = response.data.item.totalCount;
    // console.log("myTotalCount (from success-response): ", myTotalCount);

    this.setState((prevState) => {
      return {
        friendsArr: myFriendsArr,
        mappedFriendsArr: myFriendsArr.map(this.mapFriend),
        //*** Overwrites "friendsArr" AND adds a new property, "mappedFriends"-which is another array- to the state.

        totalCount: myTotalCount,
      };
    });
  };

  onGetAllError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrongggggggggg!");
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
    this.refreshPage();
  };

  onDelFriendError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong!");
  };

  onEditeRequested = (myFriendObj) => {
    console.log("From Edit: ", myFriendObj);
    let myFriendObjId = myFriendObj.id;
    this.props.history.push(`/friends/${myFriendObjId}/edit`);
  };

  onSearchBoxChanged = (e) => {
    let searchField = e.currentTarget;
    let searchValue = searchField.value;

    this.setState(() => {
      return { q: searchValue };
    });
  };

  onSearchFriendRequested = () => {
    let searchTerm = this.state.q;
    console.log({ searchTerm });

    friendService
      .searchFriend(0, 20, searchTerm) //**********************************************************hard-code only???? */
      .then(this.onSearchFriendSuccess)
      .catch(this.onSearchFriendError);
  };

  onSearchFriendSuccess = (response) => {
    let matchArr = response.data.item.pagedItems;
    console.log("This is an array of your matched friends: ", matchArr);
  };

  onSearchFriendError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong!");
  };

  mapFriend = (aFriend) => {
    return (
      <SingleFriend
        {...this.props}
        key={`friendId-${aFriend.id}`}
        firend={aFriend}
        deleteAFriend={this.onDeleteRequested}
        EditAFriend={this.onEditeRequested}
      />
    );
  };

  refreshPage = () => {
    window.location.reload(false);
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
            <hr />
            <Pagination
              onChange={this.onChange}
              page={this.state.currentPage}
              total={this.state.totalCount}
              pageSize={this.state.pageSize}
            />
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
                name="search"
                value={this.state.q}
                onChange={this.onSearchBoxChanged}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="button"
                onClick={this.onSearchFriendRequested}
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
