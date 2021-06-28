import React from "react";
import * as friendsService from "../services/friendsService";
import { withRouter } from "react-router-dom";
import SingleFriend from "./SingleFriend";
import SearchBox from "../friends/SearchBox";

class FriendsList extends React.Component {
  state = {
    friendsData: null,
    searchField: "",
  };

  componentDidMount() {
    console.log("componeneDidmount firing ");
    friendsService.getList().then(this.onGetSuccess).catch(this.onGetError);
  }

  onGetSuccess = (response) => {
    console.log({ response: response.data.items });

    this.setState(() => {
      const newState = {
        friendsData: response.data.item.pagedItems,
      };

      return newState;
    });

    this.setState((preState) => {
      return {
        mappedFriends:
          preState.friendsData && preState.friendsData.map(this.mapFriend),
      };
    });
  };

  onGetError = (response) => {
    console.log({ error: response });
  };

  editButton = (friendsUpdate) => {
    console.log("editbutton");
    console.log(friendsUpdate);

    this.props.history.push("/Profile/" + friendsUpdate.id + "/edit", {
      type: "ADD_TO_UPDATE",
      payload: friendsUpdate,
    });
  };

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    console.log("FriendList", { currentPath, previousPath });
  }

  deleteButton = (deleteFriendId) => {
    console.log(deleteFriendId.id);
    friendsService
      .deleteFriend(deleteFriendId.id)
      .then(this.ondeleteSuccessCurry)
      .catch(this.ondeleteError);

    this.setState((prevState) => {
      const indexOfperson = prevState.friendsData.findIndex(
        (singleStorage) => singleStorage.id === deleteFriendId.id
      );

      const updatedPeople = [...prevState.friendsData];

      if (indexOfperson >= 0) {
        updatedPeople.splice(indexOfperson, 1);
      }

      return {
        friendsData: updatedPeople,
        formData: null,
      };
    }, this.stateChanged);
  };

  ondeleteSuccessCurry = (response) => {
    console.log({ response: response.data });
    console.log("onDeleteSuccessCurry Wrapper");
  };

  ondeleteError = (response) => {
    console.log({ error: response });
  };

  mapFriend = (friend) => {
    const { searchField } = this.state;
    let code = friend.title.toLowerCase();
    console.log(this.state);

    if (searchField !== "" && code.indexOf(searchField.toLowerCase()) === -1) {
      return null;
    }
    return (
      <React.Fragment key={`fr-${friend.id}`}>
        <SingleFriend
          propsFriend={friend}
          onClickForEdit={this.editButton}
          onClickForDelete={this.deleteButton}
        ></SingleFriend>
      </React.Fragment>
    );
  };
  render() {
    console.log("friends", this.state.friendsData);
    return (
      <React.Fragment>
        <SearchBox
          placeholder="Enter Friend Name"
          handleChange={(e) => this.setState({ searchField: e.target.value })}
        ></SearchBox>

        {this.state.mappedFriends}
      </React.Fragment>
    );
  }
}
export default withRouter(FriendsList);
