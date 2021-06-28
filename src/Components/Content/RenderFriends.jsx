import React from "react";
import { getAll, deleteCard, searchFriends } from "../../services/UserService";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { toast } from "react-toastify";

class FriendsList extends React.Component {
  constructor() {
    super();
    this.state = {
      mappedFriends: [],
      current: 0,
      pageCount: "",
      cardId: "",
      formData: {
        name: "",
      },
    };
  }

  onChange = (page) => {
    this.setState((prevState) => {
      var pageIndex = prevState.current;
      pageIndex = page - 1;
      getAll(pageIndex, 3).then(this.onGetSuccess).catch(this.onGetError);
      return { current: page };
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

  componentDidMount() {
    getAll(0, 3).then(this.onGetSuccess).catch(this.onGetError);
  }

  onGetSuccess = (response) => {
    console.log(response);
    var friends = response.data.item.pagedItems;
    var pageCount = response.data.item.totalPages;
    this.setState(() => {
      return {
        mappedFriends: friends.map(this.mapFriends),
        pageCount: pageCount,
      };
    });
  };

  onGetError = (err) => {
    console.error(err);
    toast.warning("Please enter a valid search term", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  onEditCard = (aFriend) => {
    var cardId = aFriend.id;
    this.props.history.push("/Friends/" + cardId + "/edit", {
      payload: aFriend,
      type: "EDITFRIEND",
    });
  };

  deleteBtn = (e, deletedPerson) => {
    deletedPerson = e.currentTarget.name;
    console.log("onDelete", { deletedPerson: deletedPerson });

    this.setState((prevState) => {
      console.log("prevState", prevState);
      const indexOfPerson = prevState.mappedFriends.findIndex(
        (singleArrayMember) => singleArrayMember.id === deletedPerson.id
      );

      const updatedFriends = [...prevState.mappedFriends];

      if (indexOfPerson >= 0) {
        //do not slice or otherwise mutate the objects in array
        updatedFriends.splice(indexOfPerson, 1);
      }

      return {
        people: updatedFriends,
        formData: null,
      };
    }, this.stateChanged);
    swal({
      title: "Confirm Delete",
      text: "Once deleted, you will not be able to recover this file",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCard(deletedPerson)
          .then(this.onDeleteSuccess)
          .catch(this.onDeleteError);
        swal("Deleting Now", {
          icon: "success",
        });
      } else {
        swal("File Has Not Been Deleted");
      }
    });
  };

  onDeleteSuccess = (response) => {
    swal("File Has Been Successfully Deleted", {
      icon: "success",
    });
    console.log(response);
    //  getAll(0, 3).then(this.onGetSuccess).catch(this.onGetError);
    //   this.setState({
    //   mappedFriends: this.state.mappedFriends.filter(
    //   (f) => f.cardId !== this.state.cardId
    //  ),
    // });
  };

  onDeleteError = (errResponse) => {
    console.log(errResponse);
    swal("Error", {
      icon: "warning",
    });
  };

  mapFriends = (oneFriend) => {
    return (
      <div key={`Fren-${oneFriend.slug}`}>
        <div
          id="root"
          className="card"
          style={{ width: "19rem", margin: "1rem" }}
        >
          <img
            src={oneFriend.primaryImage.imageUrl}
            className="card-img-top"
            alt="a thing here"
          />
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h4>{oneFriend.title}</h4>
              </li>
              <li className="list-group-item">{oneFriend.bio}</li>
            </ul>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <button
                className="btn btn-light btn-outline-secondary"
                name={oneFriend.id}
                onClick={() => this.onEditCard(oneFriend)}
              >
                Edit
              </button>
              <button
                className="btn btn-light btn-outline-secondary"
                name={oneFriend.id}
                onClick={this.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
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
              current={this.state.current}
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
                  value={this.state.formData.name}
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
    );
  }
}
export default FriendsList;
