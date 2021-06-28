import React from "react";
import PeopleService from "./services/PeopleService";
import SingleFriend from "./SingleFriend";
import { toast } from "react-toastify";
import Pagination from "rc-pagination";
import "./page.css";

class People extends React.Component {
  state = { friends: [], current: 6 };

  showFriend = () => {
    PeopleService.listFriend(0)
      .then(this.onShowFriendsSuccess)
      .catch(this.onShowFriendsError);
    console.log("show friend firing");
  };

  onShowFriendsSuccess = (response) => {
    // console.log(response.data.item.pagedItems); //my array
    console.log(response);
    let newData = response.data.item.pagedItems;
    // let currentPage = response.data.item.pageIndex;
    // response.data.item.pageIndex = 2;
    this.setState(() => {
      let newState = {};

      newState.friends = newData;
      return newState;
    });
  };

  onShowFriendsError = (response) => {
    console.error(response);
  };

  onDelPeople = (e) => {
    // console.log(e.currentTarget.name);
    console.log("firing");
    var getId = e.currentTarget.name;
    PeopleService.deleteFriend(getId)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (response) => {
    console.log(response);
    toast.success("Delete Friend Successful");

    this.setState((prevState) => {
      const indexOfPerson = prevState.friends.findIndex(
        (friends) => friends.id === response
      );

      const updatedPeople = [...prevState.friends];

      if (indexOfPerson >= 0) {
        //do not slice or otherwise mutate the objects in array
        updatedPeople.splice(indexOfPerson, 1);
      }

      return {
        friends: updatedPeople,
        formData: null,
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
    this.setState(() => {
      let newState = {};

      newState.friends = newData;

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
  onChange = (page) => {
    console.log(page);
    let currentPage = page - 1;
    this.setState({
      current: currentPage,
    });
    console.log(page);
    PeopleService.listFriend(currentPage)
      .then(this.onShowFriendsSuccess)
      .catch(this.onShowFriendsError);
    console.log("change page is firing");
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
            className="pagination row "
            onChange={this.onChange}
            current={this.state.current}
            total={50}
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
