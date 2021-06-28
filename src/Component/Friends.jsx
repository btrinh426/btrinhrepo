import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as friendService from "../services/FriendService";
import SingleFriend from "./SingleFriend";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: "",
        primaryImage: "",
      },
    };
  }

  componentDidMount() {
    friendService
      .getFriends()
      .then(this.onGetFriendSuccess)
      .catch(this.onGetFriendError);
  }

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    let friendTitle = this.state.formData.title;

    friendService
      .searchFriend(friendTitle, this.state.pageIndex, this.state.pageSize)
      .then(this.onGetFriendSuccess)
      .catch(this.onGetFriendError);
  };

  onGetFriendSuccess = (response) => {
    let friends = response.data.item.pagedItems;
    console.log(friends);
    console.log(
      response.data.item.pageIndex,
      response.data.item.pageSize,
      response.data.item.totalCount,
      response.data.item.totalPages
    );

    this.setState((prevState) => {
      return {
        mappedFriends: friends.map(this.mapFriend),
        totalCount: response.data.item.totalCount,
        pageSize: response.data.item.pageSize,
        pageIndex: response.data.item.pageIndex,
        totalPages: response.data.item.totalPages,
      };
    });
  };

  onGetFriendError = () => {
    console.log("could not retreive friends");
  };

  onSearchFriendError = () => {
    toast.error("Sorry, no friends matched the search criteria");
  };

  onFriendClicked = (friend) => {
    let id = friend.id;
    console.log(friend);

    this.props.history.push("/friends/" + friend.id + "/edit", friend);
  };

  onFriendClickedFull = (friend) => {
    let id = friend.id;
    console.log(friend);

    friendService
      .deleteFriend(id)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onDeleteFriendSuccess = (id) => {
    toast.success("Successfully deleted friend from contact");
    console.log("success in deletion of: ", id);
    // this.props.history.push("/friends/new");
    // this.props.history.push("/friends");

    this.setState((prevState) => {
      console.log("mapped friends", prevState.mappedFriends);

      const indexOfFriend = prevState.mappedFriends.findIndex(
        (friend) => friend.key === id
      );

      const oldFriends = [...prevState.mappedFriends];

      if (indexOfFriend) {
        const updateFriends = oldFriends.slice(indexOfFriend, -1);

        return {
          mappedFriends: updateFriends,
        };
      }
    });
  };

  onDeleteFriendError = () => {
    toast.error("Sorry, no friends were deleted");
  };

  componentDidUpdate(prevProps) {}

  mapFriend = (oneFriend) => {
    return (
      <SingleFriend
        key={oneFriend.id}
        friend={oneFriend}
        edit={this.onFriendClicked}
        delete={this.onFriendClickedFull}
      />
    );
  };

  onChange = (page) => {
    console.log(page);
    this.setState(
      () => {
        return {
          current: page,
        };
      },
      () =>
        this.getPaginatedFriends(this.state.current - 1, this.state.pageSize)
    );
  };

  render() {
    return (
      <>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={this.onFormFieldChange}
            value={this.state.formData.title}
            name="title"
            id="title"
          />
          <button
            onClick={this.submitForm}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Search
          </button>
        </form>

        <div className="col-md-12 p-5">
          <h1>Friends List</h1>
          <hr />
          <div className="row">{this.state.mappedFriends}</div>
        </div>
      </>
    );
  }
}

export default Friends;
