import React from "react";
import SingleUser from "./SingleUser";
import UserForm from "./UserForm";
import * as userService from "../services/userService";
import debug from "sabio-debug";

//css,notifs
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const _logger = debug.extend("Users");

class Users extends React.Component {
  state = {
    mappedUsers: [],
    searchInput: { query: " " },
  };

  onInputChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let searchData = { ...this.state.searchInput };
      searchData[inputName] = newValue;
      return { searchInput: searchData };
    });
  };

  componentDidMount() {
    _logger("logger mounted...");
    userService
      .showUsers()
      .then(this.onShowUsersSuccess)
      .catch(this.onShowUsersError);
  }
  onShowUsersSuccess = (response) => {
    let allUsers = response.items;
    _logger(allUsers);
    this.setState(() => {
      return { mappedUsers: allUsers.map(this.mapUser) };
    });
  };
  onShowUsersError = (err) => {
    console.log(err);
    toast["error"]("No Users to show...");
  };
  onNewUserClicked = (e) => {
    e.preventDefault();
    //console.log(".userform....");
    this.props.history.push("/users/new");
  };
  onEditClicked = (user) => {
    let userId = user.id;
    this.props.history.push(`/users/${userId}/edit`, user, this.props.UserForm);
  };
  onDeleteClicked = (user) => {
    let userId = user.id;
    userService
      .deleteUser(userId)
      .then(this.onDeleteUserSuccess)
      .catch(this.onDeleteUserError);
  };
  onDeleteUserSuccess = (id) => {
    toast["success"](`"Deleted User (id:${id})"`);
    this.setState((prevState) => {
      const indexOfPerson = prevState.mappedUsers.findIndex(
        (user) => user.key == id
      );
      const updatedUsers = [...prevState.mappedUsers];
      if (indexOfPerson >= 0) {
        updatedUsers.splice(indexOfPerson, 1);
      }
      return {
        mappedUsers: updatedUsers,
        userForm: null,
      };
    });
  };
  onDeleteUserError = (err) => {
    console.log(err);
  };
  mapUser = (aUser) => {
    return (
      <SingleUser
        key={aUser.id}
        {...this.props}
        user={aUser}
        onClick={this.onDeleteClicked}
        onEditClicked={this.onEditClicked}
      ></SingleUser>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <input
            className="search form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            name="query"
            onChange={this.onInputChanged}
          />
          <button
            className="search btn btn-outline-success my-2 my-sm-0"
            type="submit"
            // onClick={this.onSearchClicked}
          >
            Search
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onNewUserClicked}
          >
            New User
          </button>
        </div>
        <div className="col-md-12 user-list">{this.state.mappedUsers}</div>
        <div className="container">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="..."
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/friends?pageIndex=0">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/friends?pageIndex=1">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/friends?pageIndex=2">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="...">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Users;
