import React from "react";

import FriendsService from "../services/FriendsService";

import SingleFriend from "./SingleFriend";

import { toast } from "react-toastify";

import Pagination from "rc-pagination";

/*
friends list in same component as search box & button
concant to url + Id for Put url incorporate page index and page count as parameters for GET by pagination request (string concatenation or string interpolationin)
for pagination you are basically incrementing page with a certain amount of search results per pay () dont forget about the zero-based index
*/

class Friends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      current: 0,
      totalNumber: 1,
      pageCount: "",
      cardId: "",
      formData: {
        name: "",
      },
    };
  }
  // -----Get Friends Call-----
  componentDidMount() {
    FriendsService.getAllFriends(0, 3)
      .then(this.onGetAllFriendsSuccess)
      .catch(this.onGetAllFriendsError);
  }

  onGetAllFriendsSuccess = (response) => {
    console.log(response);
    this.setState((prevState) => {
      return {
        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };

  onGetAllFriendsError = (err) => {
    console.error(err);
  };
  //-----Single Friend-----
  mapFriend = (oneFriend) => {
    return (
      <SingleFriend
        key={`Friends-${oneFriend.id}`}
        friendData={oneFriend}
        onEditRequested={this.onAFriendEditClicked}
        onDeleteRequested={this.onAFriendDeleteClicked}
      ></SingleFriend>
    );
  };

  //-----Edit Click Handler----
  onAFriendEditClicked = (friend) => {
    console.log("Edit clicked friend", friend.id);
    this.props.history.push(`/AddFriends/${friend.id}/edit/`, {
      type: "FriendData",
      payload: friend,
    });
  };

  //-----Delete Click Handler-----
  onAFriendDeleteClicked = (friend) => {
    console.log(friend);
    FriendsService.deleteFriend(friend.id)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onDeleteSuccessCur = (id) => {
    return (data) => {
      console.log(data);
      console.log(id);
      this.setState((prevState) => {
        const indexOfFriends = prevState.mappedFriends.findIndex(
          (oneFriend) => oneFriend.id === data.id
        );
        debugger;
        const updatedFriends = [...prevState.mappedFriends];
        if (indexOfFriends >= 0) {
          updatedFriends.splice(indexOfFriends, 1);
        }
        return { idDeleted: id, mappedFriends: updatedFriends, formData: null };
      }, this.stateChanged);
      console.log("Successful Delete", data);
    };
  };

  onDeleteFriendSuccess = (response) => {
    window.location.reload();
    console.log(response);
    toast.success("You have deleted a friend", {
      position: toast.POSITION_TOP_RIGHT,
    });
  };

  onDeleteFriendError = (err) => {
    console.error(err);
    toast.warning("Unable to delete friend", {
      poistion: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  //-----Search input w/ handler-----
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onSearchClicked = (e) => {
    e.preventDefault();
    console.log(e);
    const searchResult = this.state.searchTerm;
    if (!searchResult) {
      toast.warning("Invalid search term", {
        poistion: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      FriendsService.searchFriends(searchResult)
        .then(this.onSearchFriendSuccess)
        .catch(this.onSearchFriendError);
    }
    this.props.history.push("/friends/?q=" + searchResult);
  };

  onSearchFriendSuccess = (response) => {
    console.log({ SearchedTerm: response.data.item.pagedItems });
    toast["success"]("Here is your Freind");
    this.setState((prevState) => {
      return {
        mappedFriends: response.data.item.pagedItems.map(this.mapFriend),
      };
    });
  };

  onSearchFriendError = (err) => {
    console.error({ err });
    toast["error"]("Unable to find friend");
  };

  //-----Pagination-----
  onChange = (page) => {
    console.log(page);
    const searchResult = this.state.searchTerm;
    this.setState((prevState) => {
      if (searchResult) {
        console.log(page - 1);
        FriendsService.searchByText(page - 1, 4, searchResult)
          .then(this.onSearchFriendSuccess)
          .catch(this.onSearchFriendError);
        return {
          current: page,
        };
      } else {
        console.log(page - 1);
        FriendsService.getAllFriends(page - 1, 4)
          .then(this.onGetAllFriendsSuccess)
          .catch(this.onGetAllFriendsError);
        return {
          current: page,
        };
      }
    });
    console.log(this.state.current);
  };

  //   onChange = (page) => {
  //     console.log(page);
  //   };

  //   componentDidUpdate(prevProps) {
  //     console.log("Previous Props", prevProps);
  //     console.log("Current Props", this.props);
  //     const searchResult = this.state.searchTerm;
  //     if (
  //       this.props.location.search === "" &&
  //       this.props.location.search !== prevProps.location.search
  //     ) {
  //       FriendsService.getAllFriends(0, 3)
  //         .then(this.onGetAllFriendsSuccess)
  //         .catch(this.onGetAllFriendsError);
  //     } else if (this.props.location.search !== prevProps.location.search) {
  //       console.log("Request to Return Index");
  //       FriendsService.searchFriends(0, 3, searchResult)
  //         .then(this.onSearchFriendSuccess)
  //         .catch(this.onSearchFriendError);
  //     }
  //   }

  //-----Add Friends Click Handler-----

  onAddFriendClicked = (e) => {
    this.props.history.push("/addFriends");
  };

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Friends</h1>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.onAddFriendClicked}
        >
          Add Friend
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control mr-sm-2"
          name="q"
          type="text"
          placeholder="search friends"
          aria-label="search friends"
          onChange={this.onFormFieldChanged}
          value={this.state.searchTerm}
        />
        <div>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={this.onSearchClicked}
          >
            Search
          </button>
        </div>
        <hr />
        <div className="row">{this.state.mappedFriends}</div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <Pagination
              className="pagination"
              currentPage={1}
              defaultPageSize={3}
              onChange={this.onChange}
              current={this.state.current}
              total={3}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;
