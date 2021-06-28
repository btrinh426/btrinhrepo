import React, { Component } from "react";
import { currentUser, userById } from "../services/appService";

class Home extends Component {
  state = { person: 
    { firstName: "", lastName: "" } 
};

  componentDidMount() {
    currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  }

  onCurrentUserSuccess = (response) => {
    userById(response.data.item.id)
      .then(this.onUserByIdSuccess)
      .catch(this.onUserByIdError);
    console.log(response.data.item.id);
  };
  onCurrentUserError = (response) => console.warn(Response);

  onUserByIdSuccess = (response) => {
    console.log(response.data.item);

    this.setState(() => {
      let person = { ...this.state.person };
      person.firstName = response.data.item.firstName;
      person.lastName = response.data.item.lastName;

      return { person };
    });
  };

  onUserByIdError = (response) => console.warn(response);

  render() {
    return (
      <h1>
        Welcome {this.state.person.firstName} {this.state.person.lastName}
      </h1>
    );
  }
}

export default Home;
