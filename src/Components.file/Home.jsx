import React from "react";
import { toast } from "react-toastify";
import * as userService from "../services/userServices";
import "react-toastify/dist/ReactToastify.css";

class Home extends React.Component {
  state = {
    name: "Tyler",
  };

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = () => {
    userService
      .getCurrent()
      .then(this.currentUserSuccess)
      .catch(this.currentUserError);
  };

  currentUserSuccess = (response) => {
    const id = response.data.item.id;
    userService
      .getCurrentById(id)
      .then(this.onUserIdSuccess)
      .catch(this.onUserIdError);
  };

  onUserIdSuccess = (response) => {
    const newVal = "something";
    this.setState(() => {
      return { name: response.data.item.firstName };
    });
  };

  onUserIdError = (response) => {
    console.warn({ error: response });
  };

  /// we need to get id from the reponse and make another axios call GetById
  // on the success of getById we need to get the name from the response an put into DOM.

  currentUserError = (response) => {
    console.warn({ error: response });
    // this.props.history.push("/login");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Hello {this.state.name}</h1>
      </React.Fragment>
    );
  }
}

export default Home;
