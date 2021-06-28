import React from "react";
import { getUserById, currentUser } from "../services/usersService"; //don't i need userbyId from userService here?
import debug from "sabio-debug";
const _logger = debug.extend("App");

class Home extends React.Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatarUrl: "",
  };

  componentDidMount() {
    currentUser()
      .then(this.onCurrentUserSuccess)
      .then(getUserById)
      .then(this.onUserByIdSuccess)
      .catch(this.onCurrentUserError);
  }
  onCurrentUserSuccess = (response) => response.data.item.id;

  onCurrentUserError = (response) => {
    _logger("Current User Error", response);
  };
  onUserByIdSuccess = (response) => {
    _logger("userData is:", this.userData);
    _logger("User by Id success:", response.data.item);
    this.setState({
      id: response.data.item.id,
      firstName: response.data.item.firstName,
      lastName: response.data.item.lastName,
      email: response.data.item.email,
      avatarUrl: response.data.item.avatarUrl, //pass this to app, then props to navbar
    });
    // this.userData.firstName = response.data.item.firstName;
    // _logger("userData is:", this.userData);
  };

  render() {
    return (
      <div className="row">
        <img src={this.state.avatarUrl} alt="Profile"></img>
        <h1>
          Hello{" "}
          <span className="text-primary">
            {this.state.firstName} {this.state.lastName}
          </span>
          , what are we going to do today?
        </h1>
      </div>
    );
  }
}

export default Home;
