import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
// import Pagination from "rc-pagination";
import { toast } from "react-toastify";
// import FriendCard from "./FriendCard";
import * as friendService from "../services/friendService";
import Swal from "sweetalert2";

class Friends extends React.Component {
  state = {
    friends: [],
    friendObjs: [],
    stringSearch: "",
    isSearchResult: false,
    // pagination: {
    //   currentPage: 1,
    //   totalFriends: 0,
    //   pageSize: 7,
    // },
  };

  componentDidMount = () => {
    this.getFriendsStored(0, 50);
  };

  clickCreateFriendButton = (e) => {
    e.preventDefault();
    this.props.history.push("/friends/create");
  };

  getFriendStored = (pageIndex = 0, pageSize = this.state.pageSize) => {
    friendService
      .getFriends(pageIndex, pageSize)
      .then(this.onGetFriendStoredSuccess)
      .catch(this.onGetFriendStoredError);
  };

  onGetFriendStoredError = (error) => {
    let errorMessage = error.response.data.errors.join(" ");
    console.error("Error getting friends stored.");
    console.error(errorMessage);
  };

  clickFriendCardEditButton = (friendId) => {
    const targetURL = `../friends/${friendId}/update`;
    let friendInfo = this.state.friends.find(
      (friend) => friend.id === friendId
    );
    this.props.history.push(targetURL, { friendInfo });
  };

  clickFriendCardDeleteButton = (friend) => {
    Swal.fire({
      title: "Are you sure you want to delete this friend?",
      showCancelButton: true,
      confirmButtonColor: "#f21e1e",
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        friendService
          .removeFriend(friend)
          .then(this.onRemoveFriendSuccess)
          .catch(this.onRemoveFriendError);
      }
    });
  };

  onRemoveFriendSuccess = (response) => {
    const friendId = this.searchResultFromAjaxResponse(response);
    toast.success(`Friend ID#: ${friendId} deleted.`);
    this.getFriendStored();
    console.log(response);
  };

  onRemoveFriendError = (error) => {
    toast.error("Friend not deleted. Please try again.");
    console.log(error);
  };

  render() {
    return (
      <div className="col">
        <div className="row">
          <h3 className="col" id="mainTitle">
            Friends
          </h3>
        </div>
        <div className="container" id="mainView">
          <div className="col">
            <div className="row">
              <Button
                className="col-1 btn"
                id="FriendButton"
                color="primary"
                onClick={this.clickAddFriendButton}
              >
                Add A Friend
              </Button>
              <div className="col">
                <Button
                  id="searchFriendsButton"
                  type="submit"
                  onClick={this.clickSearchFriendsButton}
                ></Button>
              </div>
            </div>
          </div>

          <div className="row" id="displayFriendCards">
            <div className="col">
              {/* <div className="row mb-3">
                  <Pagination
                    total={this.state.pagination.totalFriends}
                    defaultPageSize={this.state.pagination.pageSize}
                    current={this.state.pagination.currentPage}
                    onChange={this.changePage}
                  />
                </div> */}
              <div className="row">
                <div className="col nav-item">
                  <div className="row displayFriendCards">
                    {this.state.friendCards}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Friends);
