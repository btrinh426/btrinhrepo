import React from "react";
import SingleFriend from "./SingleFriend";
import * as userService from "../services/userService";

class Friends extends React.Component {
  state = {
    friends: [],
  };

  state = { searchName: { search: "" } };

  onFormFieldChanged = (e) => {
    //console.log(e.currentTarget);
    //console.log("clicked on Search");
    let newValue = e.currentTarget.value; //  capture prop value
    let inputName = e.currentTarget.name; // 4. assn prop name of input value (i.e. eMail)
    //console.log(newValue, e.currentTarget);

    this.setState((prevState) => {
      //current most recent state object
      let searchName = { ...prevState.searchName }; // copying all of the properties of current state at this momenent in time
      searchName[inputName] = newValue; // bind state to each form field
      // as characters are entered
      return { searchName };
    });
  };

  searchFriends = () => {
    userService
      .searchForFriend(0, 1, "test")
      .then(this.onSearchSuccess)
      .catch(this.onSeachFail);
  };

  onSearchSuccess = (searchRes) => {
    console.log("search success:", searchRes.item);
  };

  onSeachFail = (searchRes) => {
    console.warn("search fail:", searchRes);
  };

  getCurrentFriends = () => {
    userService.getTenFriends().then(this.onGetSuccess).catch(this.onGetFail);
  };

  onGetSuccess = (res) => {
    console.log("friendsArr", res.data.item.pagedItems);
    var friendsArr = res.data.item.pagedItems;

    // set state and pass friendsArr into this state

    this.setState(() => {
      return { mappedFriends: friendsArr.map(this.mapFriend) };
    });
  };

  onGetFail = (err) => {
    console.log("friendsArr onGetFail", err);
  };

  onClickEditFriend = (friend) => {
    console.log("friend:", friend);

    //debugger;
    console.log("/people/" + friend.id + "/edit");
    this.props.history.push("/people/" + friend.id + "/edit");
  };

  componentDidMount() {
    this.getCurrentFriends();
  }

  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`Friend-${oneFriend.id}`}>
        <SingleFriend
          friend={oneFriend}
          onEditClicked={this.onClickEditFriend}
          data-friendelete-id={oneFriend.id}
        ></SingleFriend>
        {/* <div className="card col-md-3">
          <img
            src={oneFriend.primaryImage}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{oneFriend.title}</h5>
            <p className="card-text">{oneFriend.summary}</p> */}
        {/* <button
              className="btn btn-primary"
              type="submit"
              onClick={this.onClickEditFriend}
              //data-friendedit-id={oneFriend.id}   // don't have to use once i get friend
            >
              Edit
            </button> */}

        {/* </div>
        </div> */}
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h3 className="text-center">Friends</h3>
            <form className="form-inline my-2 my-lg-0 float-right">
              <input
                className="form-control clear-fields"
                type="text"
                name="search"
                onChange={this.onFormFieldChanged}
                value={this.state.searchName.search}
              />
              {/* <input
                      className="form-control clear-fields"
                      type="text"
                      name="headline"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.headline}
                    /> */}
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          {/* {this.state.friends.map(this.mapFriend)}  // renders EVEN if array is same */}
          {this.state.mappedFriends}
          {/* //optimum  does not re-render non-changed array value(s) */}
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
