import React from "react";
import * as friendService from "../services/friendService";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Friend from "./Friend";

class ViewFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mappedFriends: [],
      pageInfo: { pageIndex: 0, pageSize: 3, totalCount: 0, totalPages: 0 },
    };
  }

  componentDidMount() {
    this.requestFriends(1);
  }

  onEditClick = (person, event) => {
    console.log(person);
    this.props.history.push(`/EditFriend/${person.id}`);
  };

  requestFriends = (page) => {
    let idx = page - 1;
    friendService
      .paginatedFriendList(idx, this.state.pageInfo.pageSize)
      .then(this.onListSuccess)
      .catch(this.onListError);
  };

  onListSuccess = (response) => {
    console.log({ goodList: response });
    this.setState(() => {
      return {
        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
        pageInfo: {
          pageIndex: response.data.item.pageIndex,
          pageSize: response.data.item.pageSize,
          totalCount: response.data.item.totalCount,
          totalPages: response.data.item.totalPages,
        },
      };
    }, console.log("it is done", this.state.listOfFriends));
  };

  mapFriend = (friend) => (
    <Friend key={friend.id} friend={friend} selectFriend={this.onEditClick} />
  );

  onListError = (response) => {
    console.log({ badList: response });
  };

  onChange = (page) => {
    console.log(page);
    this.requestFriends(page);
  };

  addFriendClick = (e) => {
    this.props.history.push("/AddNewFriend");
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-6">
            <h1>Friends list</h1>
            <div>
              <button
                className="btn-outline-primary"
                onClick={this.addFriendClick}
              >
                Add Friend
              </button>
            </div>
            <div className="panel panel-default" style={{ marginTop: "5px" }}>
              <div className="pannel-heading"></div>
              <div className="pannel-body">
                {this.state.mappedFriends}
                <Pagination
                  current={this.state.pageInfo.pageIndex}
                  total={this.state.pageInfo.totalCount}
                  pageSize={this.state.pageInfo.pageSize}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="panel panel-default">
              <div className="pannel-heading"></div>
              <div className="pannel-body"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewFriends;
