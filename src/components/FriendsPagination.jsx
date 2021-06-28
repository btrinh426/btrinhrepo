import React from "react";
import Pagination from "rc-pagination";

class FriendsPagination extends React.Component {
  constructor(props) {
    super();

    this.state = { friends: [1, 2, 3], currentPage: 1, friendsPerPage: 3 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ currentPage: Number(e.target.id) });
  }

  render() {
    const { friends, currentPage, friendsPerPage } = this.state;

    const indexOfLastFriendsPage = currentPage * friendsPerPage;
    const indexOfFirstFriendsPage = indexOfLastFriendsPage - friendsPerPage;
    const currentFriendsPage = friends.slice(
      indexOfFirstFriendsPage,
      indexOfLastFriendsPage
    );

    const renderFriends = currentFriendsPage.map((friends, index) => {
      return <li key={index}>{friends}</li>;
    });

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(friends.length / friendsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    return (
      <div>
        <ul>{renderFriends}</ul>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default FriendsPagination;
