import React from "react";
import { NavLink } from "react-router-dom";
import SingleFriend from "../SingleFriend";
import * as friendService from "../../services/friendServices";
import { toast } from "react-toastify";
import SearchFriends from "../SearchFriends";
import Paginate from "react-paginate";

class Friends extends React.Component {
  state = {};

  componentDidMount = () => {
    friendService
      .allFriends(0, 6)
      .then(this.onAllFriendsSuccess)
      .catch(this.onAllFriendsError);
  };

  onAllFriendsSuccess = (response) => {
    let friends = response.data.item.pagedItems;
    let payload = response.data.item;

    this.setState(() => {
      return {
        ...this.state,
        mappedFriends: friends.map(this.mapFriend),
        totalPages: payload.totalPages,
      };
    });
  };

  onAllFriendsError = (response) => {
    toast.error(response);
    console.warn(response);
  };

  onDeleteFriend = (friend) => {
    friendService
      .deleteFriend(friend.id)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onEditFriend = (friend) => {
    this.props.history.push(`/editfriend/${friend.id}`, {
      type: "FRIEND_TO_EDIT",
      payload: friend,
    });
  };

  onDeleteFriendSuccess = (response) => {
    let deletedFriendId = response;
    toast.success("Friend successfully deleted!", { autoClose: 1500 });

    this.setState((prevState) => {
      const indexOfPerson = prevState.mappedFriends.findIndex(
        (friend) =>
          friend.props.children.props.singleFriend.id === deletedFriendId
      );

      const updatedFriends = [...prevState.mappedFriends];

      if (indexOfPerson >= 0) {
        updatedFriends.splice(indexOfPerson, 1);
      }

      return { mappedFriends: updatedFriends };
    });
  };

  onDeleteFriendError = (response) => {
    toast.error(response);
    console.log(response);
  };

  onFriendSearch = (queryResults) => {
    let resuts = queryResults.pagedItems;

    this.setState((prevState) => {
      return {
        ...prevState,
        mappedFriends: resuts.map(this.mapFriend),
        searchPayload: { queryResults },
      };
    });
  };

  mapFriend = (friend) => {
    return (
      <React.Fragment key={`currentfriendId-${friend.id}`}>
        <SingleFriend
          singleFriend={friend}
          onDeleteFriend={this.onDeleteFriend}
          onEditFriend={this.onEditFriend}
        />
      </React.Fragment>
    );
  };

  handlePageClick = (data) => {
    friendService
      .allFriends(data.selected, 6)
      .then(this.onAllFriendsSuccess)
      .catch(this.onAllFriendsError);
  };

  render() {
    return (
      <>
        <div className="row justify-content-center m-2">
          <div className="col-lg-4">
            <h2 className="frnd-btn mr-5">Friends</h2>
            <NavLink to="/addfriend" className="btn btn-info frnd-btn">
              + Friend
            </NavLink>
          </div>
          <div className="col-lg-4">
            <SearchFriends query={this.onFriendSearch} />
          </div>
        </div>
        <div className="container">
          <div className="row">{this.state.mappedFriends}</div>
        </div>
        <div className="container">
          <div className="row">
            {!this.state.searchPayload && (
              <Paginate
                pageCount={this.state.totalPages}
                previousLabel={"< prev"}
                nextLabel={" next >"}
                breakLabel={"..."}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                marginPagesDisplayed={5}
                pageRangeDisplayed={10}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination justify-content-center"}
                activeClassName={"active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                nextClassName={"paged-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Friends;
