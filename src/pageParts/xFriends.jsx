import React from "react";
import * as userService from "../services/userService";
import SingleFriend from "./SingleFriend";
//import AddFriend from "./AddFriend";

class Friends extends React.Component {
  state = {
    friends: [],
    searching: "Search your Frands",
  };

  componentDidMount() {
    console.log("Friends mounted");

    userService
      .getFriends()
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  }

  onGetFriendsSuccess = (response) => {
    console.log("gotcah' friends");
    console.log(response.data.item.pagedItems);
    let myFriends = response.data.item.pagedItems;

    this.setState((prevState) => {
      // return { mappedFriends: myFriends.map(this.mapFriend) };
      return { prevState, mappedFriends: myFriends.map(this.mapFriend) };
    });
  };

  onGetFriendsError = (errResponse) => {
    console.log("no friends");
  };
  onFriendDeleteClick = (friend) => {
    console.log(friend.id);
    //mappedFriends.delete(friend.id);
    //console.log(this.state);

    userService
      .deleteFriend(friend.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (response) => {
    console.log("An ally has been slain");
    userService
      .getFriends()
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };
  onDeleteError = (response) => {
    console.log("that didnt work");
  };
  onEditClick = (friend) => {
    console.log("edit: " + friend.id);
    this.props.history.push("/addfriend/" + friend.id);
  };

  mapFriend = (friend) => {
    return (
      <React.Fragment key={friend.id}>
        <SingleFriend
          oneFriend={friend}
          onClick={this.onFriendDeleteClick}
          onEditClick={this.onEditClick}
          onUpdate={this.onClearSearch}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  onOpenAddFriend = (e) => {
    // e.preventDefault();
    console.log("addFriend clciekd!");
    this.props.history.push("/addfriend/0");
  };

  onSearchFriend = (e) => {
    e.preventDefault();
    console.log("search friends pressed");
    let search = this.state.searching;

    userService
      .searchFriends(search)
      .then(this.onSearchSuccess)
      .catch(this.onSearchError);
  };

  onSearchSuccess = (response) => {
    console.log("search completed");
    console.log(response.data.item.pagedItems);
    let myFriends = response.data.item.pagedItems;

    this.setState((preState) => {
      return { mappedFriends: myFriends.map(this.mapFriend) };
    });
  };

  onSearchError = (response) => {
    console.log("Search fail");
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    //let inputName = currentTarget.name;

    console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = { ...this.state.searching };
      newState = newValue;
      //newState.firstName = newValue;
      //console.log({ newState });
      return { searching: newState };
    });
  };

  onClearSearch = (e) => {
    e.preventDefault();
    console.log("clearing search");
    userService
      .getFriends()
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  };

  render() {
    return (
      <React.Fragment>
        <div className="bg-blk-box">
          <h1>FriendBook</h1>
          <form className="container d-flex">
            <button
              type="button"
              id="openAddFriend"
              className="btn btn-primary"
              onClick={this.onOpenAddFriend}
            >
              Add New Friend
            </button>
            <input
              className="form-control me-2"
              style={{ width: "50%" }}
              name="searching"
              type="search"
              placeholder="Search your friends"
              aria-label="Search"
              onChange={this.onFormFieldChanged}
              value={this.state.searching}
            />
            <button
              className="btn btn-secondary"
              name="searchFriends"
              type="submit"
              onClick={this.onSearchFriend}
            >
              Search
            </button>
            <button
              className="btn btn-outline-success"
              id="searchClear"
              type="submit"
              onClick={this.onClearSearch}
            >
              Clear Search
            </button>
          </form>
        </div>
        <div className="test4 col">
          <h1>Look at all your friends!</h1>

          <div className="row pb-5 col-md-12 friend-container">
            {this.state.mappedFriends}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
//old form
{
  /* 
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-wrapper">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.title}
                  />
                </div>
                <div className="form-wrapper">
                  <label>Bio</label>
                  <input
                    type="text"
                    name="bio"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.bio}
                  />
                </div>
                <div className="form-wrapper">
                  <label>Summary</label>
                  <input
                    type="text"
                    name="summary"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.summary}
                  />
                </div>
                <div className="form-wrapper">
                  <label>Headline</label>
                  <input
                    type="text"
                    name="headline"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.headline}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-wrapper">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.slug}
                  />
                </div>
                <div className="form-wrapper">
                  <label>StatusId</label>
                  <input
                    type="text"
                    name="statusId"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.statusId}
                  />
                </div>
                <div className="form-wrapper">
                  <label>image</label>
                  <input
                    type="text"
                    name="imageUrl"
                    className="form-control"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.imageUrl}
                  />
                </div>
                {this.state.isAnEdit ? (
                  <label>no skills update right now</label>
                ) : (
                  <div className="form-wrapper">
                    <label>Skills</label>
                    <input
                      type="text"
                      name="skills"
                      className="form-control"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.skills}
                    />
                  </div>
                )}
              </div>
            </div>
            {this.state.isAnEdit ? (
              <button
                type="submit"
                id="newFriendBtn"
                className="btn btn-primary"
                onClick={this.onButtonClicked}
              >
                Edit Friend
              </button>
            ) : (
              <button
                type="submit"
                id="newFriendBtn"
                className="btn btn-primary"
                onClick={this.onButtonClicked}
              >
                Add Friend
              </button>
            )}
          </form>
          
            // onFormFieldChanged = (e) => {
  //   let currentTarget = e.currentTarget;
  //   let newValue = currentTarget.value;
  //   let inputName = currentTarget.name;

  //   this.setState(() => {
  //     let newState = { ...this.state.formData };
  //     newState[inputName] = newValue;

  //     return { formData: newState };
  //   });
  // };*/
}
export default Friends;
