import React from "react";
import * as friendService from "../services/friendService";
import SingleFriend from "./SingleFriend";
// import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Friends extends React.Component {
  state = {
    friends: [],
    search: "",
    current: 0,
    totalNumber: 1,
    searchedFriend: [],
  };

  componentDidMount = (response) => {
    friendService
      .getFriends(0, 10)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    let friendsArr = response.data.item.pagedItems;
    this.setState((prevState) => {
      return {
        mappedFriends: friendsArr.map(this.mapFriend),
        friends: friendsArr, //vanilla JS array
      };
    });
    console.log(this.state);
  };
  onGetFriendsError = (err) => {
    console.log(err);
  };

  onAddFriendClick = (frnd) => {
    this.props.history.push("/Friends/Add");
  };

  onEditClickedFull = (frnd) => {
    console.log(frnd);
    this.props.history.push("/Friends/" + frnd.id + "/edit");
  };

  onEditSuccess = (response) => {
    toast.success("You have updated a friend.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onEditError = (errResponse) => {
    toast.error("You could not update friend.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onDeleteClickedFull = (frnd) => {
    //pass parameter object from edit profile component
    const pointerToFunc = this.onDeleteSuccessCur(frnd.id);
    friendService
      .deleteFriend(frnd.id)
      .then(pointerToFunc)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
    console.log(frnd);
  };

  onDeleteSuccessCur = (id) => {
    return (data) => {
      console.log(data);
      console.log(id);
      this.setState((prevState) => {
        const indexOfFriends = prevState.friends.findIndex(
          (oneFriend) => oneFriend.id === data.id
        );
        debugger;
        const updatedFriends = [...prevState.friends];

        if (indexOfFriends >= 0) {
          updatedFriends.splice(indexOfFriends, 1);
        }
        return { idDeleted: id, friends: updatedFriends, formData: null };
      }, this.stateChanged);
      console.log("Successful Delete", data);
    };
  };

  onDeleteSuccess = () => {
    window.location.reload();
    //Use set state to prevent ajax calls again
    toast.success("You have deleted a friend.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onDeleteError = (errResponse) => {
    toast.error("You could not delete friend.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onFormFieldChanged = (e) => {
    let inputName = e.currentTarget;
    let newValue = e.currentTarget.value;
    console.log("inputName", inputName, "newValue", newValue);

    this.setState(() => {
      let newState = {};
      newState.search = newValue;

      return newState;
    });
  };

  onSearchClicked = (e) => {
    e.preventDefault();
    console.log(e);
    const searchResult = this.state.search;
    this.props.history.push("/friends?q=" + searchResult);
    friendService
      .searchFriend(0, 4, searchResult)
      .then(this.searchFriendSuccess)
      .catch(this.searchFriendError);
  };

  searchFriendSuccess = (response) => {
    toast["success"]("You Found Your Friend");

    this.setState((prevState) => {
      return {
        mappedSearchedFriend: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
    console.log("success ajax call");
  };

  searchFriendError = (err) => {
    console.log({ err });
    toast["error"]("You couldn't locate Your Friend");
  };

  // componentDidUpdate(prevProps) {
  //   // console.log("Previous Props", prevProps);
  //   // console.log("Current Props", this.props);
  //   const searchResult = this.state.search;
  //   if (
  //     this.props.location.search === "" &&
  //     this.props.location.search !== prevProps.location.search
  //   ) {
  //     friendService
  //       .getFriends(0, 8)
  //       .then(this.onGetFriendsSuccess)
  //       .catch(this.onGetFriendsError);
  //   } else if (this.props.location.search !== prevProps.location.search) {
  //     console.log("Request to Return Index");
  //     // friendService
  //     //   .searchFriend(0, 8, searchResult)
  //     //   .then(this.searchFriendSuccess)
  //     //   .catch(this.searchFriendError);
  //   }
  // }

  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`Friends-${oneFriend.id}`}>
        <SingleFriend
          {...this.props}
          friend={oneFriend}
          onDeleteClick={this.onDeleteClickedFull}
          onEditClick={this.onEditClickedFull}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onAddFriendClick}
            >
              Add Friend
            </button>
            <p></p>
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Type Friend Name Here"
              aria-label="search"
              value={this.state.search}
              onChange={this.onFormFieldChanged}
            />
            <button
              className="btn btn-success my-2 my-sm-0"
              type="submit"
              onClick={this.onSearchClicked}
            >
              Search
            </button>
            <div className="row">{this.state.mappedSearchedFriend}</div>
            <div className="row">{this.state.mappedFriends}</div>
          </div>
        </div>
      </main>
    );
  }
}

export default Friends;
