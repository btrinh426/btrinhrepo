import React from "react";
import * as friendService from "../services/friendService";
import FriendCard from "./FriendCard";
import FriendsForm from "./FriendsForm";
import debug from "sabio-debug";
const _logger = debug.extend("E-5-Ajax");

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      friends: [],
    };
  }

  componentDidMount() {
    friendService
      .getFriends()
      .then(this.onGetFriendSuccess)
      .catch(this.onGetFriendError);
  }

  onSelectedItemChange = (person) => {
    console.log("onSelectedItemChange", { person });
    this.setState(() => {
      console.log("updater in onSelectedItemChange");
      return { formData: person }
    }, this.stateChanged);
    console.log("end of onSelectedItemChange ")
  };

  onGetFriendSuccess = (response) => {
    console.log("onGetSuccess", { response });
    // this.setState({ friends: response.item.pagedItems });
    // this.setState(prevState => {
    //  return {
    //   ...prevState,
    //   friends: prevState.friends.map(this.mapFriend),
    //   };
    // });
    this.setState({ friends: response.item.pagedItems.map(this.mapFriend) });

    
    // console.log("friends", friends);
    // return friends;

  };
  onGetFriendError = (err) => {
    console.error(err);
  };

  mapFriend = (friends) => (
    <FriendCard
      key={friends.id}
      friends={friends}
      editHandle={this.onEditButtonClick}
      deleteHandle={this.onDeleteClick}
    />
  );

  onEditButtonClick = (friend) => {
    this.props.history.push(`/friends/${friend.id}/edit`, friend)
  };

  onDeleteClick = (delFriend) => {
    friendService
      .deleteFriend(delFriend)
      .then(this.deleteFriendSuccess)
      .catch(this.deleteFriendError);
  };
  deleteFriendSuccess = (idFriend) => {

    this.setState(prevState => {
     
      const indexOfPerson = prevState.friends.findIndex(
        friend => friend.id === idFriend.id
      );

      const updatedPeople = [...prevState.friends];

      if (indexOfPerson >= 0) {
        //do not slice or otherwise mutate the objects in array
        updatedPeople.splice(indexOfPerson, 1);
      }

      return {
        friends: updatedPeople,
        formData: null
      };
    }, this.stateChanged);
  };

  deleteFriendError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <React.Fragment>
        <div></div>
        <div className="col-me-12 p-5">
          <h1>Friends</h1>
          <hr />
            
          <div>
            <input type="text" placeHolder="search" />
          </div>
          <div className="p-3" />
          <div className="row">
            {this.state.friends}
          <div 
            onFriendClicked={this.onSelectedItemChange}
          />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
