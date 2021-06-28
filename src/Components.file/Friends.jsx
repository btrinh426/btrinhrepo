import React from "react";
import * as userService from "../services/friendsServices";
import MappedFriends from "./MappedFriends";
import FriendsForm from "./FriendsForm";

class Friends extends React.Component {
  state = {
    getData: {
      pageIndex: 0,
      pageSize: 10,
    },
    friendsMapped: [],
    friendData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "1",
      primaryImage: "",
    },
  };

  componentDidMount() {
    userService
      .getFriend(this.state.getData.pageIndex, this.state.getData.pageSize)
      .then(this.onGetFriendSuccess)
      .catch(this.onGetFriendError);
  }

  mappedFriends = (aFriend) => {
    return <MappedFriends friend={aFriend} editFriend={this.editButtonClick} />;
  };

  editButtonClick = (e) => {
    e.stopPropagation();
    this.props.history.push("/friendsform");
  };

  onGetFriendSuccess = (response) => {
    console.log(response.data.item);

    this.setState(() => {
      var friends = {
        friendsMapped: response.data.item.pagedItems.map(this.mappedFriends),
      };
      return friends;
    });
  };
  onGetFriendError = (response) => {
    console.log({ error: response });
  };

  render() {
    return <div className="card col-md-12 p-5">{this.state.friendsMapped}</div>;
  }
}

export default Friends;
