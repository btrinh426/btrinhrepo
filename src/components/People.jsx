import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import React from "react";
import * as FaIcons from "react-icons/fa";
import * as friendServices from "../services/friendServices";
import Person from "./Person";

class People extends React.Component {
  state = {
    mappedFriends: [],
    current: 1,
    totalCount: 0,
    pageSize: 0,
  };

  componentDidMount() {
    console.log("Component Did Mount firing..");
    friendServices
      .getAll()
      .then(this.onFriendsSuccess)
      .catch(this.onFriendsError);
  }
  onFriendsSuccess = (response) => {
    console.log(response);
    let friendsList = response.data.item.pagedItems;
    let totalCount = response.data.item.totalCount;
    let pageSize = response.data.item.pagedSize;
    this.setState(() => {
      return {
        mappedFriends: friendsList.map(this.mapFriends),
        totalCount: totalCount,
        pageSize: pageSize,
      };
    });
  };
  onFriendsError = (err) => {
    console.warn({ error: err });
  };

  onDelete = (id) => {
    console.log(id);
    friendServices
      .deleteFriend(id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (keyId) => {
    console.log("delete firing...");
    this.setState((prevState) => {
      const IndexOfFriend = prevState.mappedFriends.findIndex(
        (mappedFriend) => mappedFriend.key === keyId
      );
      const UpdatedList = [...prevState.mappedFriends];
      if (IndexOfFriend >= 0) {
        UpdatedList.splice(IndexOfFriend, 1);
      }
      return { mappedFriends: UpdatedList };
    });
  };
  onDeleteError = (err) => {
    console.warn({ error: err });
  };

  handleEdit = (friend) => {
    console.log("edit", friend);
    this.props.history.push(`/people/${friend.id}/edit`, friend);
  };

  onAddNewFriend = () => {
    this.props.history.push("/people/new");
  };

  mapFriends = (friend) => {
    return (
      <Person
        key={friend.id}
        friend={friend}
        handleDelete={this.onDelete}
        handleEdit={this.handleEdit}
      />
    );
  };

  onChange = (page) => {
    console.log(page);
    this.setState({ current: page });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container" id="titleboxPeople">
          <h3 id="peopletitle">People</h3>
          <input type="text" className="form-control" id="searchbox" />
          <FaIcons.FaSearch id="searchicon" />
          <input
            id="addbtn"
            type="button"
            className="btn btn-primary"
            value="Add"
            onClick={this.onAddNewFriend}
          />
        </div>
        <div className="container card-container">
          <div className="row card-row"></div>
        </div>
        {/* <Pagination
          onChange={this.onChange}
          total={this.state.totalCount}
          pageSize={this.state.pageSize}
          current={this.state.current}
        /> */}
      </React.Fragment>
    );
  }
}

export default People;
