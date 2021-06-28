import React from "react";

import * as friendService from "../services/appService";
import Friend from "./Friend";
import { NavLink } from "react-router-dom";
import Pagination from "rc-pagination";

class FriendsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [""],
      search: "",
      current: 1,
    };
  }

  componentDidMount() {
    this.getAllFriends();
    console.log("mount");
  }

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
      };
    });
  };

  onGetFriendsError = (err) => {
    console.log(err);
  };

  getSearchFriends = () => {
    const data = this.state.formData.search;
    const page = this.state.current - 1;
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
      };
    });
  };

  onSearchFriendsError = (response) => {
    console.log(response);
  };

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

  editFriendFull = (friend) => {
    this.props.history.push("/register-friend/" + friend.id, {
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
        if (this.state.formData.search) {
          let query = this.state.formData.search;
          this.getSearchFriends(query);
        } else {
          //axios call regular pagination
          const page = this.state.current - 1;
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
    });
  };

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <div className="row">
            <div className="col-md-12">
              <div style={{ padding: 20 }}>
                <h1>Friends</h1>
              </div>
              <NavLink to="/friends">
                <button className="btn btn-primary">Go Back</button>
              </NavLink>
              <hr />
              <form className="form-group my-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search"
                  name="search"
                  onChange={this.onFormFieldChanged}
                  value={this.state.formData}
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
                  total={100}
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
