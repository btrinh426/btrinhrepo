import React, { Component } from "react";
import { logout, getCurrent, getById } from "../services/userService";

class Home extends Component {

  state = {
    currentUser: {
      firstName: "",
      lastName: ""
    }
  };

  componentDidMount() {
    console.log('Home Component did Mount')
    // I don't want to get the current user after logging out
    getCurrent()
      .then(this.onGetCurrentSuccess)
      .catch(this.onGetCurrentError);
  };

  onGetCurrentError = (err) => {
    console.warn({ err });
  };

  onGetCurrentSuccess = (response) => {
    console.log('response.data.item.id: ', response.data.item.id);
    let userId = response.data.item.id;
    getById(userId)
      .then(this.onGetUserByIdSuccess)
      .catch(this.onGetUserByIdError)
  }

  onGetUserByIdSuccess = (response) => {
    console.log('response data from getUserById', response)

    this.setState(() => {
      let currentUser = { ...this.state.currentUser }
      currentUser.firstName = response.data.item.firstName;
      currentUser.lastName = response.data.item.firstName 
      return { currentUser }; 
    });
  };

  onGetUserByIdError = (err) => {
    console.warn({ err });
  }

  onLogoutClicked = (e) => {
    e.preventDefault();
    console.log("Logout was clicked");
    this.props.history.push("/logout");
    logout().then(this.onLogoutSuccess).catch(this.onLogoutError);
  };

  onLogoutSuccess = () => {
    this.props.history.push("/login");
    // render the login component
  };

  onLogoutError = (err) => {
    console.warn({ err });
  };

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    console.log("currentPath: ", currentPath);
    let prevPath = prevProps.location.pathname;
    console.log("Home", { currentPath, prevPath });
  }

  render() {
    return (
      <React.Fragment>
        <h1>
          Welcome {this.state.currentUser.firstName}{" "}
          {this.state.currentUser.lastName}
        </h1>
        <div>
          <button
            type="button"
            className="btn btn-info"
            onClick={this.onLogoutClicked}
          >
            Logout
          </button>
        </div>
        <p></p>
        <div className='sidenav'>
          <p><a href='#section'> Friends </a></p>
          <p><a href='#section'> Blogs </a></p>
          <p><a href='#section'> Tech Companies </a></p>
          <p><a href='#section'> Jobs </a></p>
          <p><a href='#section'> Events </a></p>
          <p><a href='#section'> Register </a></p>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
