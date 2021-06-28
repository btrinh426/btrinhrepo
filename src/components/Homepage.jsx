import React from "react";
import * as userService from "../services/userService";
import SideNavBar from "./SideNavBar";

class Homepage extends React.Component {
  state = {
    name: "Hector",
  };

  componentDidMount() {
    userService
      .currUser()
      .then(this.onCurrUserSuccess)
      .catch(this.onCurrUserError);
  }

  onCurrUserError = (response) => {
    console.warn(response);
  };

  onCurrUserSuccess = (response) => {
    let currentUser = response.data.item;
    userService
      .userById(currentUser.id)
      .then(this.onUserByIdSuccess)
      .catch(this.onUserByIdError);
  };

  onUserByIdSuccess = (response) => {
    console.log(response.data);
    this.setState(() => {
      return {
        name: response.data.item.firstName,
      };
    });
  };

  onUserByIdError = (response) => {
    console.warn(response);
  };

  onLogOutClicked = () => {
    console.log("logged out");
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <SideNavBar />
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Welcome, {this.state.name}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
