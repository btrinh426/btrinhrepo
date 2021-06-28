import React from "react";
import {
  paginate,
  selectAll,
  remove,
  search,
  add,
  getById,
  update,
} from "../../services/friendService.js";
import FriendCard from "./FriendCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import FriendFormik from "./FriendFormik";
import { Route } from "react-router-dom";

class Friends extends React.Component {
  state = {
    mappedFriends: [],
    searchQuery: {
      q: "",
    },
    pageIndex: 1,
    totalCount: 4,
    pageSize: 4,
    formData: {
      id: null,
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: 1,
      primaryImage: "",
    },
  };

  componentDidMount = () => {
    console.log("componentDidMount is firing from Friends");
    //this.getPaginate(this.state.pageIndex, this.state.pageSize);

    // Paginate Call
    //getPaginate = (page, pageSize) => {
    // paginate(page - 1, pageSize)
    //   .then(this.onPaginateSuccess)
    //   .catch(this.onPaginateError);
    //}

    //Select All
    selectAll().then(this.onSelectAllSuccess).catch(this.onSelectAllError);

    //getById
    getById(1).then(this.onGetByIdSuccess).catch(this.onGetByIdError);
  };

  onGetByIdError = (err) => {
    console.log("onGetByIdError is firing with error: ", err);
  };

  onGetByIdSuccess = (response) => {
    console.log("onGetByIdSuccess is firing with response: ", response);
  };

  onSelectAllError = (err) => {
    console.log("onSelectAllError is firing with error: ", err);
  };

  onSelectAllSuccess = (response) => {
    console.log("onSelectAllSuccess is firing with response: ", response);
    let list = response.data.items;

    this.setState(
      (prevState) => ({
        ...prevState,
        friends: list,
        mappedFriends: list.map(this.mapFriend),
      }),
      () => console.log("This is the new state: ", this.state)
    );
  };

  mapFriend = (singleFriend) => {
    console.log("mapPresident is firing");

    return (
      <FriendCard
        key={`Friends-${singleFriend.id}`}
        friend={singleFriend}
        onEditClicked={this.onEditClicked}
        onDeleteClicked={this.onDeleteClicked}
      />
    );
  };

  onEditClicked = (friend) => {
    console.log("onEditClicked");
    console.log(friend.bio);

    this.props.history.push(`/friends/${friend.id}`, friend);
  };
  onDeleteClicked = (friend) => {
    console.log("onDeleteClicked", friend.id);

    remove(friend.id).then(this.onRemoveSuccess).catch(this.onRemoveError);
  };
  onRemoveError = (err) => {
    console.log("onRemoveError is firing", err);
  };
  onRemoveSuccess = (friendId) => {
    console.log("onRemoveSuccess is firing", friendId);

    this.setState((prevState) => {
      const indexOfMappedFriend = prevState.friends.findIndex(
        (singleFriend) => singleFriend.id === friendId
      );
      console.log("indexOfMappedFriend", indexOfMappedFriend);
      const updatedMappedFriends = [...prevState.mappedFriends];
      console.log("updatedMappedFriends", updatedMappedFriends);
      if (indexOfMappedFriend >= 0) {
        updatedMappedFriends.splice(indexOfMappedFriend, 1);
      }

      const indexOfFriend = prevState.friends.findIndex(
        (singleFriend) => singleFriend.id === friendId
      );

      console.log("indexOfFriend", indexOfFriend);
      const updatedFriends = [...prevState.friends];

      console.log("updatedFriends", updatedFriends);

      if (indexOfFriend >= 0) {
        updatedFriends.splice(indexOfFriend, 1);
      }

      return { friends: updatedFriends, mappedFriends: updatedMappedFriends };
    }, this.stateChanged);
  };

  onAddClicked = (e) => {
    console.log("onAddClicked is firing", e);
    this.props.history.push("/friends/add");
  };
  onCancelAddClicked = (e) => {
    console.log("onAddClicked is firing", e);
    this.props.history.push("/friends");
  };

  onPaginateError = (err) => {
    console.log("onPaginateError", err);

    //add Error Message
  };
  onPaginateSuccess = (response) => {
    console.log("onPaginateSuccess", response);
    console.log("Returned Items", response.data.item);
    let list = response.data.item.pagedItems;
    const totalCount = response.data.item.totalCount;
    this.setState(
      (prevState) => ({
        ...prevState,
        friends: list,
        mappedFriends: list.map(this.mapFriend),
        totalCount,
      }),
      () => console.log("This is the new state: ", this.state)
    );
  };

  //search
  onFormFieldChanged = (e) => {
    console.log("onFormFieldChanged is firing for search");
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          searchQuery: {
            ...prevState.searchQuery,
            q: newValue,
          },
        };
      },
      () => this.returnRenderCondition()
    );

    // if (newState[inputName] === "") {
  };
  onSearchFriendsClicked = (e) => {
    e.preventDefault();
    console.log("onSearchFriendsClicked is firing from search", e);

    let data = this.state.searchQuery.q;
    console.log("This is the data to search friends: ", data);

    this.getSearchPaginate(0, this.state.pageSize, data);
  };
  onSearchFriendsError = (err) => {
    console.log("onSearchFriendsError is firing", err);
  };

  getSearchPaginate = (pageIndex, pageSize) => {
    search(pageIndex - 1, pageSize, this.state.searchQuery.q)
      .then(this.onPaginateSuccess)
      .catch(this.onSearchFriendsError);
  };

  onPageChange = (page) => {
    //pagination controls
    this.setState(
      {
        pageIndex: page,
      },
      () => this.returnRenderCondition()
    );
  };

  returnRenderCondition = () => {
    return this.state.searchQuery.q.length > 0
      ? this.getSearchPaginate(this.state.pageIndex, this.state.pageSize)
      : this.getPaginate(this.state.pageIndex, this.state.pageSize);
  };

  // FORMIK FUNCTIONS TO PASS AS PROPS

  onCancelFormik = (event) => {
    console.log("onCancelFormik is firing from Friends", event);
    // this.props.onCancelFormik(event);
  };

  // callAddAsyncFromFriends = (friend) => {
  //   console.log("callAddAsyncFromFriends is firing from Friends", friend);

  //   this.setState((prevState) => {
  //     const formData = { ...prevState.formData, id: friend.item };
  //     return { ...prevState, formData: formData };
  //   });
  // };

  componentDidUpdate = () => {
    console.log("componentDidUpdate is firing", this.state.formData);
  };

  onSaveFormik = (data) => {
    console.log("onSaveFormik fired and retruned: ", data);
    this.setState((prevState) => {
      const formData = { ...prevState.formData, id: data.data.id };
      return { ...prevState, formData: formData };
    });
  };

  // onSaveFormik = (formValues) => {
  //   console.log("These are the form values: ", formValues);

  //   const that = this;
  //   // convert formData to the hierarchical format that
  //   const friend = {
  //     id: this.state.formData.id,
  //     title: formValues.title,
  //     bio: formValues.bio,
  //     summary: formValues.summary,
  //     headline: formValues.headline,
  //     slug: formValues.slug,
  //     statusId: formValues.statusId,
  //     primaryImage: formValues.primaryImage,
  //     //   others: {
  //     //     isNeutered: formValues.isNeutered,
  //     //     isMicrochipped: formValues.isMicrochipped,
  //     //},
  //   };

  //   if (this.state.formData.id) {
  //     console.log(
  //       `Detected an Id of: ${this.state.formData.id} - ${this.state.formData.title}s record will now be updated.`
  //     );

  //     update(friend)
  //       .then((data) => {
  //         console.log("updateAJAX.then is firing", data);
  //         // this.showSaveSuccess();
  //         that.props.onSave(data);
  //       })
  //       .catch(this.onSaveErrorGeneric);
  //   } else {
  //     console.log("onSave - Else is firing to create a new record");

  //     add(friend)
  //       .then((data) => {
  //         console.log("addAJAX.then is firing with Data: ", data);
  //         this.showSaveSuccess(data);
  //         // Modify state to reflect assigned id value
  //         this.setState((prevState) => {
  //           const formData = { ...prevState.formData, id: data.item };
  //           return { ...prevState, formData: formData };
  //         });

  //         that.props.onSave({ ...friend, id: data.item });
  //       })
  //       .catch(this.onSaveErrorGeneric);
  //   }
  // };

  // showSaveSuccess = (data) => {
  //   console.log("showSaveSuccess is firing", data);

  //   // this.props.notify({
  //   //   message: "Saved changes",
  //   //   level: "success",
  //   //   autoDismiss: 2,
  //   // });
  // };
  // onSaveErrorGeneric = (error) => {
  //   console.log("onSaveErrorGeneric is firing", error);
  //   // this.props.notify({
  //   //   message: "Failed to save changes: " + error.toString(),
  //   //   level: "error",
  //   //   autoDismiss: 0,
  //   //});
  // };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="container border-bottom p-2">
            <form>
              <div className="form-row align-items-center justify-content-between">
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-primary mb-2"
                    id="add-button"
                    onClick={this.onAddClicked}
                  >
                    Add Friend
                  </button>
                  <span></span>
                  <button
                    type="button"
                    className="btn btn-primary mb-2"
                    id="add-button"
                    onClick={this.onCancelAddClicked}
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-auto">
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="q"
                      name="q"
                      placeholder="Search Friends..."
                      onChange={this.onFormFieldChanged}
                      value={this.state.searchQuery.q}
                    />
                    <button
                      type="button"
                      className="btn btn-primary mb-2"
                      id="searchSubmit"
                      name="searchSubmit"
                      onClick={this.onSearchFriendsClicked}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="container pt-4">
            <Route path="/friends/add" exact={true}>
              <FriendFormik
                onSave={this.onSaveFormik}
                // callAddAsyncFromFriends={this.callAddAsyncFromFriends}
                onCancel={this.onCancelFormik}
                formData={this.state.formData}
              />
            </Route>
            <Route path="/friends/:friendId(\d+)" exact={true}>
              <FriendFormik
                onSave={this.onSaveFormik}
                onCancel={this.onCancelFormik}
                formData={this.state.formData}
              />
            </Route>
          </div>
          {/* Render Friends Container */}
          <div className="container pt-4">
            <div className="row d-flex flex-row">
              {this.state.mappedFriends}
            </div>
            <div className="row p-5">
              <div className="col d-flex justify-content-center">
                <Pagination
                  onChange={this.onPageChange}
                  current={this.state.pageIndex}
                  total={this.state.totalCount}
                  pageSize={this.state.pageSize}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
