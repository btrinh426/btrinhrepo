import React from "react";
import {
  showFriends,
  deleteCard,
  searchFriends,
} from "../../services/UserService";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

class FriendsList extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      friends: [],
      formData: {
        name: "",
      },
    };
  }

  onChange = (page) => {
    this.setState((prevState) => {
      var pageIndex = prevState.current;
      pageIndex = page - 1;
      showFriends(pageIndex, 3).then(this.onGetSuccess).catch(this.onGetError);
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
      return;
    } else {
      searchFriends(searchTerm).then(this.onGetSuccess).catch(this.onGetError);
    }
  };

  componentDidMount() {
    showFriends(0, 3).then(this.onGetSuccess).catch(this.onGetError);
  }
  onGetSuccess = (response) => {
    console.log(response);
    var friends = response.data.item.pagedItems;
    this.setState(() => {
      return { mappedFriends: friends.map(this.mapFriends) };
    });
  };
  onGetError = (err) => {
    console.error(err);
  };
  editCard = (e) => {
    var cardId = e.currentTarget.name;
    this.props.history.push("/Friends/" + cardId + "/edit");
  };
  deleteBtn = (e) => {
    var cardId = e.currentTarget.name;
    swal({
      title: "Confirm Delete",
      text: "Once deleted, you will not be able to recover this file",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCard(cardId).then(this.onDeleteSuccess).catch(this.onDeleteError);
        swal("File Has Been Successfully Deleted", {
          icon: "success",
        });
      } else {
        swal("File Has Not Been Deleted");
      }
    });
  };
  onDeleteSuccess = (response) => {
    console.log(response);
    showFriends().then(this.onGetSuccess).catch(this.onGetError);
  };
  onDeleteError = (errResponse) => {
    console.log(errResponse);
  };

  mapFriends = (oneFriend) => {
    return (
      <React.Fragment key={`Fren-${oneFriend.slug}`}>
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
                onClick={this.editCard}
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
      </React.Fragment>
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
              <div className="row">
                {this.state.mappedFriends}
                <Pagination
                  currentPage={1}
                  defaultPageSize={1}
                  onChange={this.onChange}
                  current={this.state.current}
                  total={3}
                />
              </div>
              <div
                style={{
                  margin: "3rem",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div>
                  <Link to="/Friends/new">
                    <button className="btn btn-light">Add A New Friend</button>
                  </Link>
                  <div>
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
                      <button
                        className="btn btn-light btn-outline-secondary"
                        type="button"
                        onClick={this.search}
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default FriendsList;
