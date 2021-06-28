import React, { Component } from "react";
import { getFriends, deleteFriends } from "../services/friendsService";
import FriendCard from "./FriendCard";
import FriendsSearch from "./FriendsSearch";
import FriendsFilter from "./FriendsFilter";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
//import Pagination from "./Pagination";

class Friends extends Component {
  state = {
    friends: [],
    current: 1,
    pageSize: 2,
    totalCount: 10,
    searchTerm: "",
    mappedFriends: [],
  };
  componentDidMount() {
    this.onGetFriends();
  }

  onGetFriends = () => {
    getFriends(this.state.current - 1, this.state.pageSize)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };
  onGetFriendsSuccess = (response) => {
    let friends = response.data.item.pagedItems;
    this.setState((prevState) => {
      return {
        ...prevState,
        friends,
        mappedFriends: friends.map(this.friendMapped),
        totalCount: response.data.item.totalCount,
      };
    });
    console.log(friends);
  };

  // onFormField = (e) => {
  //   let currentTarget = e.currentTarget;
  //   let newValue = currentTarget.value;
  //   let inputName = currentTarget.name;
  //   console.log(newValue, inputName);

  // this.setState(() => {
  //   let query = { ...this.state.query };
  //   query[inputName] = newValue;
  //   console.log(query);
  //   return query;
  // });
  // };
  // onGetFriendsSuccess = (response) => {
  //   let friends = response.data.item.pagedItems;
  //   this.setState((prevState) => {
  //     return {
  //       ...prevState,
  //       friends,
  //       totalCount: response.data.item.totalCount,
  //     };
  //   });
  //   console.log(friends);
  // };
  onGetFriendsError = () => {
    console.warn();
  };
  onDeleteFriendsClick = (friendId) => {
    console.log("onDeleteFriendsClick");

    deleteFriends(friendId)
      .then(this.onDeleteFriendsSuccess)
      .catch(this.onDeleteFriendsError);
  };

  onDeleteFriendsSuccess = (idDeleted) => {
    console.log("onDeleteFriendsSuccess");
    this.setState((prevState) => {
      const indexOfFriends = prevState.mappedFriends.findIndex(
        (friends) => friends.props.friend.id === idDeleted
      );

      console.log(indexOfFriends);

      const updatedFriends = [...prevState.mappedFriends];
      if (indexOfFriends >= 0) {
        updatedFriends.splice(indexOfFriends, 1);
      }
      return {
        mappedFriends: updatedFriends,
        formData: null,
      };
    });
  };
  onDeleteFriendsError = (err) => console.log(err);

  friendMapped = (oneFriend) => {
    return (
      <FriendCard
        key={oneFriend.id}
        friend={oneFriend}
        onDeleteFriendsClick={this.onDeleteFriendsClick}
        handleEditClick={this.onEdit}
      />
    );
  };

  onEdit = (oneFriend) => {
    this.props.history.push(`/friends/${oneFriend.id}/edit`, {
      type: "friend_Obj",
      payload: { oneFriend },
    });
  };
  handleInput = (e) => {
    console.log(e.target.value);
    this.setState({ searchTerm: e.target.value });
  };

  onFriendsFilter = (props) => {
    let friends = props.filteredFriends.map((friend, item) => {
      console.log(friend);
      return <FriendsFilter key={item} friend={friend} />;
    });

    return <div>{friends}</div>;
  };
  // onShowAllFriendsClick = (e) => {
  //   e.preventDefault();
  //   this.setState({ showFriends: true });
  // };

  onPaginationChange = (page) => {
    this.setState(
      (prevState) => {
        return { ...prevState, current: page };
      },
      () => this.onGetFriends()
    );
  };

  render() {
    //let friendsToDisplay = this.state.friends;
    // if (this.state.searchTerm) {
    //   friendsToDisplay = this.state.friends.filter((friend) => {
    //     return JSON.stringify(friend).includes(this.state.searchTerm);
    //     //return car.year.toString().includes(this.state.searchTerm);
    //   });
    // }
    // console.log(friendsToDisplay);
    return (
      <React.Fragment>
        <FriendsSearch handleInput={this.handleInput}> </FriendsSearch>

        <div className="row">
          {/* <button
            id="showFriends"
            className="btn btn-sml edit"
            onClick={this.onShowAllFriendsClick}
            href="button"
          >
            {" "}
            Show All Friends
          </button> */}
          <div className="row">{this.state.mappedFriends}</div>
          {/* {this.state.showFriends && (
            <FriendsFilter filteredFriends={friendsToDisplay}></FriendsFilter>
          )}{" "} */}
        </div>
        <Pagination
          total={this.state.totalCount}
          onChange={this.onPaginationChange}
          current={this.state.current}
          pageSize={this.state.pageSize}
        />
      </React.Fragment>
    );
  }
}

export default Friends;
