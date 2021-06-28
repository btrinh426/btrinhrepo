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
      currentUser: {},
      friends: [],
      searchTerm: "",

      current: 0, //----Pagination---
      totalNumber: 1, 
      totalCount: 0, // copy state and change copied obj  ...in some cases only need change one or two prop values, then no need to create initial state prop for it
       // top level properties/ items  you can change
    };
  }

  //--- first call---
  componentDidMount() {
    let userCurrent = this.state.currentUser;
    console.log("component did mount userCurrent = ", userCurrent);
    friendService
      .getAll(this.state.totalNumber - 1, 10)
      .then(this.onGetFriendsSuccess)
      .catch(this.onGetFriendsError);
  }

  onGetFriendsSuccess = (res) => {
    let friendsArr = res.data.item.pagedItems;
    console.log("onGetFriendsSuccess response:", res);
    let friendsArrLength = res.data.item.totalCount;
    this.setState((prevState) => {
      // console.log("prevState for onGetFriendSuccess:", prevState);
      return {
        current: res.data.item.pageIndex + 1,
        totalCount: res.data.item.totalCount,
        totalNumber: friendsArrLength,
        mappedFriends: friendsArr.map(this.mapFriend), // pushes the component array into state (elements to render)
        friends: friendsArr, // pushes the vanilla, js array of data into state (for logic ops, etc...)
      };
    });
  };

  onGetFriendsError = (err) => {
    console.error("friendsArr onGetFriendFail", err);
  };

  onAddClicked = (e) => {
    e.preventDefault();
    //console.log("clicked on Add", e.currentTarget.dataset);
    this.props.history.push("/people/add"); // (route specified in App Comp) fires/renders EditProfile Comp
    // state is already bound to form inputs
  };

  //-------Edit ,   capture full object ----

  onEditClickedFull = (frnd) => {
    //console.log(frnd, frnd.id);
    this.props.history.push("/people/" + frnd.id + "/edit", { frnd });
    //pass entire friend obj as a second param in hist.push
  };

  //-------Delete ,  capture full object ----

  onDeleteClickedFull = (frnd) => {
    //console.log(frnd);
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
      //console.log("this.state.friends", this.state.friends);
     // console.log("object clicked on in DOM", id);

      this.setState((prevState) => {
        const friendsState = this.state.friends;
        const friendIndexToDelete = friendsState.findIndex(
          //returns the index of the first element in the array that satisfies the provided testing function
          (elem) => elem.id === id //compare each id in Arr with clicked on id
        );

        //console.log("friendIndexToDelete:", friendIndexToDelete);
        const updatedFriends = [...prevState.mappedFriends]; // if you check out the components tab, you will note
        //console.log("prevStateMappedFriends:", updatedFriends); // that mappedFriends show the component elements (fragments)

        if (friendIndexToDelete >= 0) {
          updatedFriends.splice(friendIndexToDelete, 1); // remove 1 element of Component Array at the specified index
          friendsState.splice(friendIndexToDelete, 1); // remove 1 element of Data Array at the specified index
        }
        return {
          idDeleted: id,
          mappedFriends: updatedFriends, // Component Array
          friends: friendsState, // Data Array
        };
      }, this.stateChanged);
      console.log("Successful Delete", data);
    };
  };

  onDeleteFriendSuccess = () => {
    console.log("onDeleteFriendSuccess:");
    //window.location.reload();    // not recommended - unnecessary network calls
    this.setState = (prevState) => {
      console.log("prevState", prevState);
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
    const data = this.state.friends; // array of data
    console.log("searchTerm:", input);
    this.props.history.push("/people?q=" + input, {
      // synchronous, but ajax call is asynchronous...so be careful to "stay put" on friends component, so there is no unmounting of component, otherwise you'll get an error "can't render on an unmounted component"
      type: "FRIEND_SEARCH", // what we intend to do
      payload: data, // loc state in child will be null (this.props.location.state) unless we
    }); // leverage cDM. + Set up state  e.g.  state = {newData={}}  see passing state via hist.push notes tab
    friendService
      .search(0, 4, input)
      .then(this.onSearchSuccess)
      .catch(this.onSeachError);
  };

  onSearchSuccess = (searchRes) => {
    console.log("search Response:", searchRes);
    this.setState(() => {       // code blows up if searchRes entered as a param... 
      return {
        mappedFriends: searchRes.data.item.pagedItems.map(this.mapFriend),
        current: searchRes.data.item.pageIndex + 1,
        totalCount: searchRes.data.item.totalCount,
      };
    });
  };

  onSearchError = (searchRes) => {
    console.error("search fail:", searchRes);
  };

  //-----Pagination-----

  onChangePage = (page) => {
    console.log("clicked on page number:", page);
    const searchText = this.state.searchTerm;
    console.log("search text:", searchText);
    this.setState(() => {
      if (searchText) {
        console.log(page - 1);
        friendService
          .search(page - 1, 4, searchText)
          .then(this.onSearchSuccess)
          .catch(this.onSearchError);
        return {
          current: page, // aaron returned as an obj
        };
      } else {
        console.log(page - 1);
        friendService
          .getAll(page - 1, 4)
          .then(this.onGetFriendsSuccess)
          .catch(this.onGetFriendsError);
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
                    defaultPageSize={4}                 /*number of obj's per DOM page*/
                    onChange={this.onChangePage}
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
