import React from "react";

import * as friendService from "../services/friendService";
import Friend from "./SingleFriend";
import { NavLink } from "react-router-dom";
import Pagination from "rc-pagination";
import { ToastContainer, toast } from "react-toastify";

class FriendsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      formData: "",
      current: 1,
      totalCount: 0,
    };
  }

  componentDidMount() {
    this.getAllFriends();
  }

  mapFriend = (friend) => {
    return (
      <React.Fragment key={`Friend-${friend.id}`}>
        <Friend
          friend={friend}
          editFriend={this.editFriendFull}
          deleteFriend={this.deleteFriend}
        ></Friend>
      </React.Fragment>
    );
  };

  getAllFriends = () => {
    let page = this.state.current - 1;
    friendService
      .getFriends(page)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  onGetFriendsSuccess = (response) => {
    console.log(response);
    this.setState((prevState) => {
      return {
        ...prevState,
        friends: response.data.item.pagedItems.map(this.mapFriend),
        totalCount: response.data.item.totalCount,
      };
    });
  };

  onGetFriendsError = (err) => {
    console.log(err);
    toast.error("Cannot find friends");
  };

  getSearchFriends = (page) => {
    const data = this.state.formData.query;
    if (!page) {
      page = 0;
    }
    friendService
      .searchFriends(data, page)
      .then(this.onSearchFriendsSuccess)
      .catch(this.onSearchFriendsError);
  };

  onSearchFriendsSuccess = (response) => {
    console.log(response);
    this.setState((prevState) => {
      return {
        ...prevState,
        friends: response.data.item.pagedItems.map(this.mapFriend),
        totalCount: response.data.item.totalCount,
      };
    });
  };

  onSearchFriendsError = (response) => {
    console.log(response);
  };

  editFriendFull = (friend) => {
    this.props.history.push(`/friend/${friend.id}/edit`, {
      type: "FRIEND_EDIT",
      payload: friend,
    });
  };

  deleteFriend = (friend) => {
    friendService
      .deleteFriend(friend)
      .then(this.onDeleteSuccessCurry)
      .catch(this.onDeleteError);
  };

  onDeleteSuccessCurry = (friendId) => {
    this.setState((prevState) => {
      const indexOfFriend = prevState.friends.findIndex(
        (friend) => friend.props.children.props.friend.id === friendId
      );

      const updatedFriends = [...prevState.friends];

      if (indexOfFriend >= 0) {
        updatedFriends.splice(indexOfFriend, 1);
      }
      return {
        friends: updatedFriends,
      };
    }, this.stateChanged);
  };

  onDeleteError(err) {
    console.log(err);
  }

  onChange = (page) => {
    console.log(page);

    this.setState(
      {
        current: page,
      },
      () => {
        const page = this.state.current - 1;
        if (this.state.formData.query && this.state.formData !== "") {
          this.getSearchFriends(page);
        } else {
          //axios call regular pagination
          this.getAllFriends(page);
        }
      }
    );
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    }, this.getSearchFriends);
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <div className="text-center">
          <div className="row">
            <div className="col-md-12">
              <div style={{ padding: 20 }}>
                <h1>Friends</h1>
              </div>
              <NavLink to="/friend/new">
                <button className="btn btn-primary mx-1">Add a friend</button>
              </NavLink>
              <hr />
              <form className="form-group my-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search"
                  name="query"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData.query}
                />
              </form>
              <div className="row justify-content-center">
                {this.state.friends}
              </div>
              <div className="row justify-content-center">
                <Pagination
                  className="m-3"
                  onChange={this.onChange}
                  current={this.state.current}
                  total={this.state.totalCount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendsIndex;

//overall pretty happy with this guy, but wanted to know how to reset
//the pagination on the searchFriends--when you're on a page greater than
//one, how do you reset the page to one on search without locking it
//in to one.
