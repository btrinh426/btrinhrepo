import React from "react";
import FriendCard from "./FriendCard";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import FriendsSearch from "./FriendsSearch";
import * as friendServices from "./../../services/friendServices";

class FriendsAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mappedFriends: [],
      pageCount: 0,
      pageIndex: 0,
    };
  }

  componentDidMount = () => {
    this.renderFriends(this.state.pageIndex);
  };

  renderFriends = (pageNumber) => {
    friendServices
      .grabAll(pageNumber)
      .then(this.onGrabAllSuccess)
      .catch(this.onGrabAllError);
  };

  onGrabAllSuccess = (response) => {
    const mappedFriends = response.data.item.pagedItems;
    const pageCount = response.data.item.totalPages;

    this.setState((prevState) => {
      return {
        ...prevState,
        pageCount,
        mappedFriends,
      };
    });
  };

  onGrabAllError = (response) => {
    console.error({ error: response });
  };

  onFriendInfo = (thatFriend) => {
    this.props.history.push(`/friends/edit/${thatFriend.id}`, {
      type: "EDIT_FRIEND_TO_FORM",
      payload: thatFriend,
    });
    // don't need to use a get by Id, if we didn't push the object, we would need to make that call
  };

  deleteFriend = (deletedFriend) => {
    let deleteFriend = deletedFriend;
    console.log(deleteFriend);

    friendServices
      .deleteFriend(deleteFriend)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (response) => {
    const deletedFriendInfo = response;

    this.setState((prevState) => {
      const mappedFriends = [...prevState.mappedFriends];
      const indexOfFriend = mappedFriends.findIndex(
        (friend) => friend.id === deletedFriendInfo.id
      );

      if (indexOfFriend >= 0) {
        mappedFriends.splice(indexOfFriend, 1);
      }
      return { mappedFriends };
    });
  };

  onDeleteError = (response) => {
    console.error({ error: response });
  };

  handlePageClick = (pageNumber) => {
    const selected = pageNumber.selected;

    this.renderFriends(selected);
  };

  onFriendSearch = (res) => {
    const mappedFriends = res;

    this.setState((prevState) => {
      return { ...prevState, mappedFriends };
    });
  };

  render() {
    return (
      <div className="container">
        <nav
          className="navbar justify-content-between"
          style={{ margin: "1rem 0rem" }}
        >
          <div>
            <Link to="/friends/new" className="btn btn-outline-primary">
              + Friend
            </Link>
          </div>
          <div>
            <FriendsSearch query={this.onFriendSearch} />
          </div>
        </nav>
        <hr></hr>
        <div className="row justify-content-between">
          {this.state.mappedFriends.map((friend) => (
            <FriendCard
              key={friend.id}
              friends={friend}
              onEditButton={this.onFriendInfo}
              onDeleteBtn={this.deleteFriend}
            ></FriendCard>
          ))}
        </div>
        <ReactPaginate
          previousLabel={"< prev"}
          nextLabel={" next >"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default FriendsAll;
