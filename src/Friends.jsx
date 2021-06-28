import React from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { toast, ToastContainer } from "react-toastify";
import SingleFriend from "./SingleFriend";
import * as friendService from "./services/friendService";

class Friends extends React.Component {
  state = {
    friendInfo: {
      title: "Friend Name:",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
    },
    searchQuery: "",
    pageSize: 4,
    pageIndex: 0,
    total: 0,
  };

  componentDidMount() {
    friendService
      .getPage(this.state.pageIndex, this.state.pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState(
      () => {
        let searchQuery = { ...this.state.searchQuery };

        searchQuery = newValue;

        return { searchQuery };
      },
      () => {
        if (this.state.searchQuery) {
          friendService
            .search(0, this.state.pageSize, this.state.searchQuery)
            .then(this.onGetFriendsSuccess)
            .catch(this.onGetFriendsError);
        }
      }
    );
  };

  submitForm = (e) => {
    e.preventDefault();
    console.log(this.state.searchQuery);
    friendService
      .search(0, this.state.pageSize, this.state.searchQuery)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  mapFriend = (friend) => {
    return (
      <SingleFriend
        key={friend.id}
        aPerson={friend}
        onEdit={this.onEditFriend}
        onDelete={this.onDeleteFriend}
      ></SingleFriend>
    );
  };

  onGetFriendsSuccess = (response) => {
    //console.log(response.data.item.pagedItems);
    //console.log(response.data.item.totalCount);

    this.setState(() => {
      return {
        friends: response.data.item.pagedItems.map(this.mapFriend),
        total: response.data.item.totalCount,
      };
    });
  };

  onGetFriendsError = (response) => console.warn({ error: response });

  onEditFriend = (person) => {
    console.log(person);
    this.props.history.push("/friends/" + person.id + "/edit", {
      type: "PERSON_DATA",
      payload: person,
    });
  };

  onDeleteFriend = (person) => {
    console.log(person.id);
    friendService
      .remove(person.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };
  onDeleteSuccess = (id) => {
    console.log(id);

    this.setState(
      (prevState) => {
        let friends = [...prevState.friends];
        let removedFriend = friends.findIndex((friend) => friend.key == id);

        if (removedFriend >= 0) {
          friends.splice(removedFriend, 1);
        }
        return {
          ...prevState,
          friends,
        };
      },
      () => toast.success("You didn't need that friend anyway, high-five!")
    );
  };
  onDeleteError = (error) => {
    toast.error("Tragedy strikes! Something went wrong...");
    console.error(error);
  };

  onPageChange = (page, pageSize) => {
    console.log(page - 1, pageSize);
    this.setState((prevState) => {
      let index = page - 1;
      if (this.state.searchQuery) {
        friendService
          .search(index, this.state.pageSize, this.state.searchQuery)
          .then(this.onGetFriendsSuccess)
          .catch(this.onGetFriendsError);
      } else {
        friendService
          .getPage(index, this.state.pageSize)
          .then(this.onGetFriendsSuccess)
          .catch(this.onGetFriendsError);
      }
      return { pageIndex: index, total: prevState.total };
    });
  };

  // onDeleteFriendV1 = (e) => {
  //     console.log(e.currentTarget.dataset.friendId);
  // }

  render() {
    return (
      <React.Fragment>
        <div className="container pt-5 pb-5">
          <ToastContainer />
          <div className="row pb-5 text-center">
            <h1 className="col-12">Friends</h1>
          </div>
          <div className="row input-group pb-5 mx-auto justify-content-center">
            <input
              type="search"
              className="col-9 form-control"
              onChange={this.onFormFieldChanged}
            ></input>
            <button
              type="button"
              className="btn btn-primary mx-auto"
              onClick={this.submitForm}
            >
              Search Friends
            </button>
          </div>
          <div className="row">{this.state.friends}</div>
          <Pagination
            pageSize={this.state.pageSize}
            current={this.state.pageIndex + 1}
            total={this.state.total}
            onChange={this.onPageChange}
          ></Pagination>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
