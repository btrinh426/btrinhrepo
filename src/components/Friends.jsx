import React from "react";
//import debug from "sabio-debug";
import Pagination from "rc-pagination";
import SingleFriend from "./SingleFriend";
import "rc-pagination/assets/index.css";
import { toast } from "react-toastify";
import * as friendService from "../services/friendService";
//const _logger = debug.extend("SingleFriend");

class Friends extends React.Component {
  constructor(props) {
    super(props);
    //   _logger("constructor");
    this.state = {
      friends: [],
      searchTerm: "",
      current: 0,
      totalNumber: 1,
      currentPage: 1,
      currentUser: { ted: "bundy" },
      count: 0,
    };
  }

  //--- first call---
  componentDidMount() {
    let userCurrent = this.state.currentUser;
    console.log("component did mount", userCurrent);
    friendService
      .getAll(this.state.currentPage - 1, 10)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsFail);
  }

  onGetFriendsSuccess = (res) => {
    console.log(res);
    let friendsArr = res.data.item.pagedItems;
    let friendsArrLength = res.data.item.totalCount;
    this.setState((prevState) => {
      console.log("prevState for onGetFriendSuccess:", prevState);
      return {
        totalNumber: friendsArrLength,
        mappedFriends: friendsArr.map(this.mapFriend), // return the component elements to render
        friends: friendsArr, // push the array into state so I can run logic on its data later on
      };
    });
  };

  onGetFriendsFail = (err) => {
    console.error("friendsArr onGetFriendFail", err);
  };

  onAddClicked = (e) => {
    e.preventDefault();
    console.log("clicked on Add", e.currentTarget.dataset);
    this.props.history.push("/people/add"); // (route specified in App Comp) fires/renders EditProfile Comp
    // state is already bound to form inputs
  };

  //-------Edit ,   capture full object ----

  onEditClickedFull = (frnd) => {
    console.log(frnd, frnd.id);
    this.props.history.push("/people/" + frnd.id + "/edit", { frnd });
    //pass entire friend obj as a second param in hist.push
  };

  //-------Delete ,  capture full object ----

  onDeleteClickedFull = (frnd) => {
    console.log(frnd);
    const pointerToFx = this.onDeleteSuccessCur(frnd.id);
    this.setState({ idToBeDeleted: frnd.id }); // why is it not re-rendering?
    friendService
      .deleteById(frnd.id)
      .then(pointerToFx)
      .then(this.onDeleteFriendSuccess)
      .catch(this.onDeleteFriendError);
  };

  onDeleteSuccessCur = (id) => {
    // success handler  returning a success handler
    return (data) => {
      console.log("this.state.friends", this.state.friends);
      console.log("object clicked on in DOM", id);

      this.setState((prevState) => {
        const friendsState = this.state.friends;
        const friendIndexToDelete = friendsState.findIndex(
          //returns the index of the first element in the array that satisfies the provided testing function
          (elem) => elem.id === id //compare each id in Arr with clicked on id
        ); // auto returns resulting index

        console.log("friendIndexToDelete:", friendIndexToDelete);
        const updatedFriends = [...prevState.mappedFriends]; // if you check out the components tab, you will note
        console.log("prevStateMappedFriends:", updatedFriends); // that mappedFriends show the component elements (fragments)

        if (friendIndexToDelete >= 0) {
          updatedFriends.splice(friendIndexToDelete, 1); // remove 1 element at the specified index
        }
        return {
          idDeleted: id,
          mappedFriends: updatedFriends,
        };
      }, this.stateChanged);
      console.log("Successful Delete", data);
      //return{data};
    };
  };

  onDeleteFriendSuccess = () => {
    console.log("onDeleteFriendSuccess:");
    //window.location.reload();    // need to set state on this to have it render
    this.setState = (prevState) => {
      console.log("prevState", prevState);
      //return
    };

    toast["success"]("You Deleted A Friend", "Delete Friend");
  };

  onDeleteFriendError = (err) => {
    console.error(err);
    toast["error"]("Friend Not Deleted", "Delete Friend");
  };

  mapFriend = (oneFriend) => {
    return (
      <React.Fragment key={`Friend-${oneFriend.id}`}>
        <SingleFriend
          {...this.props}
          friend={oneFriend} // friend prop passed to child SingleFriend (tells parent how it wants data)
          onEditClick={this.onEditClickedFull} // (so inside SingleFriend, we declare const oneFriend = props.friend;)
          onDeleteClicked={this.onDeleteClickedFull}
        ></SingleFriend>
      </React.Fragment>
    );
  };

  //------Search-------

  onFormFieldChanged = (e) => {
    let newValue = e.currentTarget.value; //  capture prop value
    let inputName = e.currentTarget.name; // assn prop name of input val
    console.log("newValue:", newValue, "inputName:", inputName);

    this.setState(() => {
      let newState = {};
      newState.searchTerm = newValue;
      return newState;
    });
  };

  onSearchClicked = (e) => {
    e.preventDefault();
    console.log("search clicked:", e.currentTarget);
    const input = this.state.searchTerm;
    console.log("searchTerm:", input);
    this.props.history.push("/people?q=" + input);
    friendService
      .search(0, 5, input)
      .then(this.onSearchSuccess)
      .catch(this.onSeachFail);
  };

  onSearchSuccess = (searchRes) => {
    // console.log(
    //   "server search Response:",
    //   searchRes,
    //   "searched response Array:",
    //   searchRes.data.item.pagedItems
    // );
    let searchReturnArr = searchRes.data.item.pagedItems;

    //  const copyState = {...searchFriends}

    // put searchReturnArr into state   at  searchFriends

    this.setState(() => {
      // const newState = {...this.state.searchFriends}    //
      debugger;
      return {
        mappedFriends: searchReturnArr.map(this.mapFriend),
      };
    });
  };

  onSeachFail = (searchRes) => {
    console.error("search fail:", searchRes);
  };

  //-----Pagination-----

  onChange = (page) => {
    console.log(page);
    const searchResult = this.state.searchTerm;
    this.setState((prevState) => {
      if (searchResult) {
        console.log(page - 1);
        friendService
          .search(page - 1, 4, searchResult)
          .then(this.searchFriendSuccess)
          .catch(this.searchFriendError);
        return {
          current: page,
        };
      } else {
        console.log(page - 1);
        friendService
          .getAll(page - 1, 4)
          .then(this.onGetFriendsSuccess)
          .catch(this.onGetFriendsFail);
        return {
          current: page,
        };
      }
    });
    console.log(this.state.current);
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Friends</h1>
            <h3 className="float-left p-2"> Add Friend</h3>
            <h3 className="float-right p-2">Search Friend</h3>
            <form className="form-inline my-2 my-lg-0 float-right">
              <input
                className="form-control clear-fields"
                type="text"
                name="search"
                onChange={this.onFormFieldChanged}
                value={this.state.searchTerm}
              />

              <button
                className="btn btn-secondary my-2 my-sm-0"
                type="submit"
                onClick={this.onSearchClicked}
              >
                Search
              </button>
            </form>

            <button
              className="btn btn-success my-2 my-sm-0"
              type="submit"
              onClick={this.onAddClicked}
            >
              Add
            </button>

            <div className="friend-container">
              {/* the parent needs to know how the child wants to receive data... send it to render it */}
              {/* passing down props {...this.props} */}
              <div className="row">{this.state.mappedFriends}</div>
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <Pagination
                    className="pagination"
                    currentPage={1}
                    defaultPageSize={4}
                    onChange={this.onChange}
                    current={this.state.current}
                    total={this.state.totalNumber}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
