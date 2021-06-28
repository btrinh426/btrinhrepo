import React, { Component } from "react";
import * as userService from "../services/userService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import Login from "../components/Login";
import { Route, NavLink } from "react-router-dom";

class Homepage extends Component {
  state = {
    currentUser: { id: null, name: null },
  };
  componentDidMount() {
    userService.current().then(this.onActionSuccess).catch(this.onActionError);
  }

  onActionSuccess = (response) => {
    let userIdFromCall = response.data.item.id;
    let UserNameFromCall = response.data.item.name;
    console.log("From sucess(): ", {
      currentUserId: userIdFromCall,
      currentUserName: UserNameFromCall,
    });

    this.setState(() => {
      let newCurrentUser = { ...this.state.currentUser };
      newCurrentUser.id = userIdFromCall;
      newCurrentUser.name = UserNameFromCall;
      console.log("Success currentUser: ", { newCurrentUser });

      return { currentUser: newCurrentUser };
    });
  };

  onActionError = (errResponse) => {
    Swal.fire("Welcome!", "Please login or register");
  };

  render() {
    console.log("Homepage Rendering ...");

    return (
      <React.Fragment>
        <div className="container">
          <div className="form-row text-center">
            <div className="col-sm-10">
              {this.state.currentUser.id && (
                <h5>Welcome back {this.state.currentUser.name}!</h5>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Homepage;
