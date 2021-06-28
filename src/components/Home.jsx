import React, { Component } from "react";
import { currentUser } from "../services/userService";

class Home extends Component {
  state = {
    formData: {
      name: "",
    },
  };

  // NOW THIS AUTOMATICALLY GETS THE INFO
  // FROM THE USER LOGGED IN AKA CURRENT USER
  componentDidMount = () => {
    console.log("run");
    currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  };
  onCurrentUserSuccess = (response) => {
    console.log(response.data.item.name);

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData.name = response.data.item.name;
      console.log(formData);
      return { formData };
    });
  };
  onCurrentUserError = (Response) => {
    console.log("fail");
  };

  //THIS BUTTON NOW LOGS THE STATE WHEN CLICKED(JUST FOR EX )
  // handleClick = (e) => {
  //   e.preventDefault();
  //   console.log(this.state);
  // };

  render() {
    return (
      <div>
        <h1>Welcome {this.state.formData.name}</h1>
      </div>
    );
  }
}
export default Home;
