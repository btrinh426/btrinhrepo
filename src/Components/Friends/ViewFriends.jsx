import React from "react";
import {
  getAll,
  deleteCard,
  searchFriends,
} from "../../services/FriendService";
import swal from "sweetalert";
import SingleFriend from "./SingleFriend";
import { Link } from "react-router-dom";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { toast } from "react-toastify";

class ViewFriends extends React.Component {
  state = {
    mappedFriends: [],
    currentPage: 0,
    pageCount: "",
    searchTerm: "",
    cardId: "",
    formData: {
      name: "",
    },
  };

  componentDidMount() {
    getAll(0, 3).then(this.onGetSuccess).catch(this.onGetError);
  }
  onGetSuccess = (response) => {
    console.log(response);
    var friends = response.data.item.pagedItems;
    var pageCount = response.data.item.totalPages;
    //update current page here
    this.setState(() => {
      return {
        mappedFriends: friends.map(this.mapFriends),
        friends,
        pageCount: pageCount,
      };
    });
  };
  onGetError = (err) => {
    console.error(err);
    toast.warning("Unable to locate record", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  onChange = (page) => {
    this.setState((prevState) => {
      //put an if statement here in case there are thousands of records being returned
      var pageIndex = prevState.currentPage;
      pageIndex = page - 1;
      getAll(pageIndex, 3).then(this.onGetSuccess).catch(this.onGetError);
      return { currentPage: page };
    });
  };

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
  search = (e) => {
    var searchTerm = this.state.formData.name;
    if (!searchTerm) {
      toast.warning("Please enter a valid search term", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      searchFriends(searchTerm).then(this.onGetSuccess).catch(this.onGetError);
    }
  };

  onEditFriend = (aFriend) => {
    var cardId = aFriend.id;
    this.props.history.push("/Friends/" + cardId + "/edit", {
      payload: aFriend,
      type: "EDITFRIEND",
    });
  };
  onDeleteFriend = (e) => {
    var id = e.currentTarget.name;
    swal({
      title: "Confirm Delete",
      text: "Once deleted, you will not be able to recover this file",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCard(id).then(this.onDeleteSuccess).catch(this.onDeleteError);
        swal("Deleting Now", {
          icon: "success",
        });
      } else {
        swal("File Has Not Been Deleted");
      }
    });
  };

  onDeleteSuccess = (idOfFriendDeleted) => {
    swal("File Has Been Successfully Deleted", {
      icon: "success",
    });
    console.log(idOfFriendDeleted);
    this.setState((prevState) => {
      const indexOfPerson = prevState.friends.findIndex(
        (mappedFriends) => mappedFriends.id === idOfFriendDeleted
      );
      const updatedFriends = [...prevState.friends];
      const moreUpdatedFriends = [...prevState.mappedFriends];
      console.log(moreUpdatedFriends);
      if (indexOfPerson >= 0) {
        updatedFriends.splice(indexOfPerson, 1);
        moreUpdatedFriends.splice(indexOfPerson, 1);
      }
      return {
        friends: updatedFriends,
      };
    }, this.stateChanged);
  };

  /*
  componentDidUpdate(prevState) {
    const mappedFriends = this.state.mappedFriends;
    const prevFriends = prevState.mappedFriends;
    const currentFriends = mappedFriends;
    if (prevFriends !== currentFriends && currentFriends.length < 3) {
      getAll(0, 3).then(this.onGetSuccess).catch(this.onGetError);
    }
  }
  */

  onDeleteError = (errResponse) => {
    console.log(errResponse);
    swal("Error", {
      icon: "warning",
    });
  };

  mapFriends = (oneFriend) => {
    return (
      <SingleFriend
        key={oneFriend.id}
        mappedFriends={oneFriend}
        onDeleteFr={this.onDeleteFriend}
        onEditFr={this.onEditFriend}
      ></SingleFriend>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            marginLeft: "7rem",
            padding: "7rem",
          }}
        >
          <div className="container">
            <div className="col-md-12 p-4">
              <h1>Friends</h1>
              <div className="row">{this.state.mappedFriends}</div>
              <Pagination
                currentPage={1}
                defaultPageSize={1}
                onChange={this.onChange}
                current={this.state.currentPage}
                total={this.state.pageCount}
              />
            </div>
            <div
              style={{
                margin: "3rem",
                display: "flex",
              }}
            >
              <Link to="/Friends/new">
                <button className="btn btn-light btn-outline-secondary">
                  Add A New Friend
                </button>
              </Link>
            </div>
            <div>
              <div
                style={{
                  margin: "3rem",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <form>
                  <input
                    className="bg-lightest-blue"
                    type="text"
                    placeholder="search friends"
                    name="name"
                    id="name"
                    onChange={this.onFormFieldChanged}
                    value={this.state.name}
                  />
                  <div
                    style={{
                      marginLeft: "1rem",
                    }}
                  >
                    <button
                      className="btn btn-light btn-outline-secondary"
                      type="button"
                      onClick={this.search}
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ViewFriends;
