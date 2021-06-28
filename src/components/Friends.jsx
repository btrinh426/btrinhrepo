import React from "react";
import Pagination from "rc-pagination";
import SingleFriend from "./SingleFriend";
import "rc-pagination/assets/index.css";
import { toast } from "react-toastify";
import * as friendService from "../services/friendService";

class Friends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      searchTerm: "",
      current: 0,
      totalNumber: 1,
      currentPage: 1,
    };
  }

  //--- first call---
  componentDidMount() {
    friendService
      .getAll(this.state.currentPage - 1, 10)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsFail);
  }

  onGetFriendsSuccess = (res) => {
    let friendsArr = res.data.item.pagedItems;
    let friendsArrLength = res.data.item.totalCount;
    this.setState((prevState) => {
      console.log("prevState for onGetFriendSuccess:", prevState);
      return {
        totalNumber: friendsArrLength,
        mappedFriends: friendsArr.map(this.mapFriend),
      };
    });
  };

  onGetFriendsFail = (err) => {
    console.error("friendsArr onGetFriendFail", err);
  };

  onAddClicked = (e) => {
    e.preventDefault();
    console.log("clicked on Add", e.currentTarget.dataset);
    this.props.history.push("/people/add"); // (route specified in App Comp) fires/renders EditProfile Comp
    // state is already bound to form inputs
  };

  //---------Edit------------
  onEditClicked = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let inputId = currentTarget.id;
    this.props.history.push("/people/" + inputId + "/edit");
  };

  //-------Edit ,   capture full object ----

  onEditClickedFull = (frnd) => {
    console.log(frnd);
    //pass entire friend obj as a second param in hist.push
  };

  //-------Delete ,  capture full object ----

  onDeleteClickedFull = (frnd) => {
    console.log(frnd);
  };

  //---------Delete----------

  onDeleteClicked = (e) => {
    //
    console.log("clicked on delete:", e.currentTarget.dataset);
    let currentTarget = e.currentTarget;
    let id = currentTarget.id;
    const pointerToFx = this.onDeleteSuccessCur(id);
    console.log("pointerToFx:", pointerToFx, "friend id:", id);
    friendService
      .deleteById(id)
      .then(pointerToFx)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onDeleteSuccessCur = (id) => {
    return (data) => {
      console.log("return data from called onDeleteCur:", data);
      console.log("id param sent to onDeleteSuccessCur:", id);
      this.setState((prevState) => {
        const friendIndexToDelete = prevState.mappedFriends.findIndex(
          //returns the index of the first element in the array that satisfies the provided testing function
          (oneFriend) => oneFriend.id === id //compare each id in Arr with clicked on id
        ); // auto returns resulting index

        console.log("friendIndexToDelete:", friendIndexToDelete);
        const updatedFriends = [...prevState.mappedFriends];
        console.log("prevStateMappedFriends:", updatedFriends);

        if (friendIndexToDelete >= 0) {
          updatedFriends.splice(friendIndexToDelete, 1); // remove 1 element at the specified index
        }
        return {
          idDeleted: id,
          mappedFriends: updatedFriends,
        };
      }, this.stateChanged);
      console.log("Successful Delete", data);
    };
  };

  onDeleteFriendSuccess = (res) => {
    console.log("onDeleteFriendSuccess:", res);
    window.location.reload();
    toast["success"]("You Deleted A Friend", "Delete Friend");
  };
  onDeleteFriendError = (err) => {
    console.error(err);
    toast["error"]("Friend Not Deleted", "Delete Friend");
  };

  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`Friend-${oneFriend.id}`}>
        <SingleFriend
          friend={oneFriend}
          onEditClick={this.onEditClickedFull}
          onDeleteClicked={this.onDeleteClickedFull}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  //------Search-------

  onFormFieldChanged = (e) => {
    let newValue = e.currentTarget.value; //  capture prop value
    let inputName = e.currentTarget.name; // assn prop name of input val
    console.log("newValue:", newValue, "inputName:", inputName);

    this.setState(() => {
      let newState = {};
      newState.searchTerm = newValue;
      return newState;
    });
  };

  onSearchClicked = (e) => {
    e.preventDefault();
    console.log("search clicked:", e.currentTarget);
    const input = this.state.searchTerm;
    console.log("searchTerm:", input);
    this.props.history.push("/friends/&q=" + input);
    friendService
      .search(0, 5, input)
      .then(this.onSearchSuccess)
      .catch(this.onSeachFail);
  };

  onSearchSuccess = (searchRes) => {
    console.log(
      "server search Response:",
      searchRes,
      "searched response Array:",
      searchRes.data.item.pagedItems
    );
    this.setState(() => {
      return {
        mappedFriends: searchRes.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };

  onSeachFail = (searchRes) => {
    console.error("search fail:", searchRes);
  };

  //-----Pagination-----

  onChange = (page) => {
    console.log(page);
    const searchResult = this.state.searchTerm;
    this.setState((prevState) => {
      if (searchResult) {
        console.log(page - 1);
        friendService
          .search(page - 1, 4, searchResult)
          .then(this.searchFriendSuccess)
          .catch(this.searchFriendError);
        return {
          current: page,
        };
      } else {
        console.log(page - 1);
        friendService
          .getAll(page - 1, 4)
          .then(this.onGetFriendsSuccess)
          .catch(this.onGetFriendsFail);
        return {
          current: page,
        };
      }
    });
    console.log(this.state.current);
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Friends</h1>
            <h3 className="float-right p-2">Search Friend</h3>
            <h3 className="float-left p-2"> Add Friend</h3>
            <form className="form-inline my-2 my-lg-0 float-right">
              <input
                className="form-control clear-fields"
                type="text"
                name="search"
                onChange={this.onFormFieldChanged}
                value={this.state.searchTerm}
              />

              <button
                className="btn btn-secondary my-2 my-sm-0"
                type="submit"
                onClick={this.onSearchClicked}
              >
                Search
              </button>
            </form>

            <button
              className="btn btn-success my-2 my-sm-0"
              type="submit"
              onClick={this.onAddClicked}
            >
              Add
            </button>

            <div className="friend-container">
              {/* the parent needs to know how the child wants to receive data... send it to render it */}
              {/* passing down props {...this.props} */}
              <div className="row">{this.state.mappedFriends}</div>
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <Pagination
                    className="pagination"
                    currentPage={1}
                    defaultPageSize={4}
                    onChange={this.onChange}
                    current={this.state.current}
                    total={this.state.totalNumber}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
