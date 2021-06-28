import React from "react";
import friendService from "../services/friendService";
import FriendCard from "./FriendCard";

class PaginateFriends extends React.Component {
  state = {
    friendArray: [],
  };

  componentDidMount() {
    // e.preventDefault();
    console.log("It worked");
    friendService
      .friendsPaginated(0, 10)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }

  onActionSuccess = (response) => {
    console.log(response);
    var friends = response?.data?.item?.pagedItems;
    if (friends?.length > 0) {
      this.updateStateWithFriends(friends);
    }

    // this.setState({
    //   friendArry: {
    //     name: response.data.item.pagedItems.title,
    //     summary: response.data.item.pagedItems.sumary,
    //     avatarUrl: response.data.item.pagedItems.primaryImage,
    //   },
    // });

    // let friends = response.data.item.pagedItems;
    // const AllFriends = [];

    // for (let i = 0; i < friends.length; i++) {
    //   const friendData = friends[i];
    //   // console.log("hi there");
    //   console.log(friendData.title);

    //   let individual = {};
    //   individual.title = friendData.title;
    //   individual.summary = friendData.summary;
    //   individual.imgUrl = friendData.primaryImage.imageUrl;

    //   AllFriends.push(individual);
    // }

    // if (this.state.friends.length <= 0) {
    //   this.setState(() => {
    //     let newState = { ...this.state.friendArry };
    //     newState.friends = AllFriends;
    //     newState.haveFriendData = true;
    //     console.log(newState);
    //     return newState;
    //   });
    // }
    // console.log(friends);
  };

  updateStateWithFriends(friends) {
    this.setState((prevState) => (prevState.friendArray = [...friends]));
  }

  onActionError = (err) => {
    console.log("Denied", err);
  };

  friendMap = () => {
    console.log("I am here");
    return this.data.item.pagedItems;
  };

  // deleteFriend = () => {
  //   console.log("I delete");
  // };
  // updateFriend = () => {
  //   console.log("I update");
  // };

  render() {
    return (
      <FriendCard deleteMe={this.deleteFriend} editMe={this.updateFriend} />
    );
  }
}

export default PaginateFriends;
