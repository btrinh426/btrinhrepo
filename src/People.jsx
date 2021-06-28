import React from "react";
import PeopleService from "./services/PeopleService";
import SingleFriend from "./SingleFriend";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import "./page.css";

class People extends React.Component {
  state = { friends: [] };

  showFriend = () => {
    PeopleService.listFriend(0)
      .then(this.onShowFriendsSuccess)
      .catch(this.onShowFriendsError);
  };

  onShowFriendsSuccess = (response) => {
    // console.log(response.data.item.pagedItems); //my array
    console.log(response);
    let newData = response.data.item.pagedItems;
    let totalItem = response.data.item.totalCount;
    // let currentPage = response.data.item.pageIndex;
    // response.data.item.pageIndex = 2;
    this.setState(() => {
      let newState = {};

      newState.friends = newData;
      newState.total = totalItem;
      return newState;
    });
  };

  onShowFriendsError = (response) => {
    console.error(response);
  };

  onDelPeople = (friend) => {
    PeopleService.deleteFriend(friend.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (response) => {
    console.log(response);
    toast.success("Delete Friend Successful");

    this.setState((prevState) => {
      const indexOfFriend = prevState.friends.findIndex(
        (aFriend) => aFriend.id === response
      );
      console.log(indexOfFriend);

      const updatedFriend = [...prevState.friends];

      if (indexOfFriend >= 0) {
        updatedFriend.splice(indexOfFriend, 1);
      }

      return {
        friends: updatedFriend,
      };
    }, this.stateChanged);
  };

  onDeleteError = (response) => {
    console.log(response);
    toast.error("Delete Friend error");
  };

  editFriend = (friend) => {
    // console.log(e.currentTarget.name);
    // var title = friend.title
    // var summary = friend.summary
    // var payload = {title, summary}

    // console.log(title);
    this.props.history.push("/people/edit/" + friend.id, {
      type: "EDIT_FRIEND",
      payload: { ...friend },
    });
  };

  componentDidMount() {
    this.showFriend();

    // this.onGetPeopleSuccess();
  }

  searchAndGetFriendFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      return newState;
    });
  };

  searchAndGetFriend = () => {
    console.log(this.state.searchName);
    var data = this.state.searchName;
    if (data) {
      PeopleService.searchFriend(data)
        .then(this.searchAndGetFriendSuccess)
        .catch(this.searchAndGetFriendError);
    } else {
      this.showFriend();
    }
  };

  searchAndGetFriendSuccess = (response) => {
    console.log(response);
    let newData = response.data.item.pagedItems;
    let totalItem = response.data.item.totalCount;
    this.setState(() => {
      let newState = {};

      newState.friends = newData;
      newState.total = totalItem;
      return newState;
    });
  };

  searchAndGetFriendError = (response) => {
    console.log(response);
    toast.error("No result found");
    this.setState(() => {
      let newState = { friends: [] };

      return newState;
    });
  };
  mapFriend = (oneFriend) => {
    return (
      <SingleFriend
        key={oneFriend.id}
        friends={oneFriend}
        onDelete={this.onDelPeople}
        onEdit={this.editFriend}
      ></SingleFriend>
    );
  };
  // onPageChange = (response) => {
  //   console.log(response);
  //   var pageNumber = response.data.item.pageIndex;

  //   this.onChange(pageNumber);
  // };
  onChange = (page, pageSize) => {
    // console.log("on change page:", page);
    // let currentPage = page - 1;
    // console.log(pageSize);
    // console.log("current page", currentPage);
    // this.setState(
    //   () => {
    //     let newState = {};

    //     newState.current = currentPage;
    //     newState.pageSize = pageSize;
    //     return newState;
    //   },
    //   () => {
    //     PeopleService.listFriend(this.state.current)
    //       .then(this.onShowFriendsSuccess)
    //       .catch(this.onShowFriendsError);
    //   }
    // );
    
      this.setState((prevState) => {
        var pageIndex = prevState.current;
        pageIndex = page - 1;
        PeopleService.listFriend(pageIndex, 3).then(this.onShowFriendsSuccess).catch(this.onShowFriendsError);
        return { current: page };
      });
    };

  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <h1>Friends</h1>
          <form
            className="form-inline my-2 my-lg-0"
            style={{ padding: "10px" }}
          >
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search Friend"
              aria-label="Search"
              name="searchName"
              // value={this.state.searchName}
              onChange={this.searchAndGetFriendFieldChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              value={this.state.searchName}
              onClick={this.searchAndGetFriend}

              // onChange={this.searchAndGetFriend}
            >
              Search
            </button>
          </form>
        </div>
        <hr />
        <div className="container">
          <div className="row">{this.state.friends.map(this.mapFriend)}</div>
        </div>
        <div>
          <Pagination
            onChange={this.onChange}
            current={this.state.current}
            total={this.state.total}
            // pageSize={this.state.pageSize}
            pageSize={4}
          />
        </div>
        {/* <div className="pagination">

          
        </div> */}

        {/* <div>
          <RegisterPeople friend={this.state.friends} />
        </div> */}
      </React.Fragment>
    );
  }
}

export default People;
