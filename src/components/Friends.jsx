import React from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
//import { toast } from "react-toastify";
import * as friendService from "../services/friendService";

class Friends extends React.Component {
  state = {
    friends: [],
    searchTerm: "",
    current: 0,
    totalNumber: 1,
  };

  //--- first call---
  componentDidMount() {
    friendService
      .getTenFriends()
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsFail);
  }

  onGetFriendsSuccess = (res) => {
    let friendsArr = res.data.item.pagedItems;
    let friendsArrLength = res.data.item.totalCount;
    // console.log(
    //   "response:",
    //   res,
    //   "friendsArr:",
    //   res.data.item.pagedItems,
    //   "friendsArrLength:",
    //   friendsArrLength
    // );
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

  //---------Edit------------
  onEditClicked = (e) => {
    e.preventDefault();
    //console.log(e);
    let currentTarget = e.currentTarget;
    let inputId = currentTarget.id;
    this.props.history.push("/people/" + inputId + "/edit");
  };

  //---------Delete----------

  onDeleteClicked = (e) => {
    let currentTarget = e.currentTarget;
    let id = currentTarget.id;
    const pointerToFx = this.onDeleteSuccessCur(id);
    console.log("pointerToFx:", pointerToFx, "friend id:", id);
    friendService
      .deleteFriendById(id)
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
    //toast["success"]("You Deleted A Friend", "Delete Friend");
  };
  onDeleteFriendError = (err) => {
    console.error(err);
    //toast["error"]("Friend Not Deleted", "Delete Friend");
  };

  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`Friend-${oneFriend.id}`}>
        <div className="card-friends col-md-3">
          <img
            className="card-img-top"
            src={oneFriend.primaryImage.imageUrl}
            alt="Friend Avatar"
          />
          <div className="card-body">
            <h5 className="card-title">{oneFriend.title}</h5>
            <p className="card-text">{oneFriend.summary}</p>
            <button
              className="btn btn-secondary btn-md"
              id={oneFriend.id}
              onClick={(e) => this.onEditClicked(e)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-md"
              id={oneFriend.id}
              onClick={(e) => this.onDeleteClicked(e)}
            >
              Delete
            </button>
          </div>
        </div>
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
    
    this.props.history.push(
      "/friends/&q=" + input
    );
    friendService
      .searchForFriend(0, 5, input)
      .then(this.onSearchSuccess)
      .catch(this.onSeachFail);
  };

  onSearchSuccess = (searchRes) => {
    console.log("server search Response:", searchRes, "searched response Array:", searchRes.data.item.pagedItems);
    this.setState(() => {
      return {
        mappedFriends: searchRes.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };

  onSeachFail = (searchRes) => {
    console.warn("search fail:", searchRes);
  };

  //-----Pagination-----

  

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h3 className="text-center">Friends</h3>
            <form className="form-inline my-2 my-lg-0 float-right">
              <input
                className="form-control clear-fields"
                type="text"
                name="search"
                onChange={this.onFormFieldChanged}
                value={this.state.searchTerm}
              />

              <button
                className="btn btn-primary my-2 my-sm-0"
                type="submit"
                onClick={this.onSearchClicked}
              >
                Search
              </button>
            </form>

            <div className="friend-container">
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
