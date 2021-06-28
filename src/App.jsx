import React, { Component } from "react";
import NavBar from "./Components/NavBar";

import Footer from "./Components/Footer";

import * as usersService from "./services/userService";

import { withRouter } from "react-router-dom";

import "./App.css";
// ----- Assessment .js File -----
import * as carService from "./services/entityService";
import { toast } from "react-toastify";

class App extends Component {
  state = {
    userData: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "email@gmail.com",
      password: "Password1!",
      passwordConfirm: "Password1!",
      avatarUrl:
        "https://i.pinimg.com/236x/52/90/26/529026138c2df5897e4f758082b5a3bd.jpg",
      tenantId: "TrelloUser",
      isLoggedIn: false,
    },
    // ----- State for Assessment -----
    carData: {
      name: "Car Name",
      manufacturer: "Car Manufacturer",
      description: "Describe Car",
      cost: "$$",
    },
  };

  componentDidMount = () => {
    console.log(this.state);
    usersService
      .currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  };

  getCurrentUser = () => {
    usersService
      .currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Previous Props", prevProps);
    console.log("Current Props", this.props);
    if (
      this.props.location.state &&
      this.props.location.state.type === "LOGOUT" &&
      this.state.userData.isLoggedIn
    ) {
      console.log("Request to Logout");
      this.setState((prevState) => {
        let userData = { ...prevState.userData };

        userData.firstName = "";
        userData.lastName = "";
        userData.avatarUrl = "";
        userData.isLoggedIn = false;
        userData.id = 0;
        return { userData };
      });
    }
    // else if for login, similar to how we did the logout
    else if (
      this.props.location.state &&
      this.props.location.state.type === "LOGIN" &&
      !this.state.userData.isLoggedIn
    ) {
      console.log("Request to Login");
      this.getCurrentUser();
    }
  }

  // when get user is successful, change state
  onCurrentUserSuccess = (response) => {
    console.log({ response });
    var id = response.data.item.id;
    usersService
      .currentUserById(id)
      .then(this.onCurrentUserByIdSuccess)
      .catch(this.onCurrentUserByIdError);
  };
  onCurrentUserError = (error) => {
    console.error("App User not Logged In", error);
  };
  onCurrentUserByIdSuccess = (response) => {
    console.log({ response });

    this.setState((prevState) => {
      let userData = { ...prevState.userData };

      userData.firstName = response.data.item.firstName;
      userData.lastName = response.data.item.lastName;
      userData.avatarUrl = response.data.item.avatarUrl;
      userData.isLoggedIn = true;
      userData.id = response.data.item.id;
      return { userData };
    });
  };
  onCurrentUserByIdError = (error) => {
    console.error(error);
  };

  // ----- Assessment Functions -----
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputData = currentTarget.id;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = { ...this.state.carData };
      newState[inputData] = newValue;
      //   console.log({ carData: newState });
      return { carData: newState };
    });
  };

  onSubmitClicked = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state.carData);
    const data = this.state.carData;
    carService.add(data).then(this.onAddCarSucess).catch(this.onAddCarError);
  };

  onAddCarSucess = (response) => {
    console.log({ submitted: response.data });
    toast["success"](
      ` The Product was created ${response.data.item}`,
      "New Car"
    );
  };
  onAddCarError = (err) => {
    console.error(err);
    toast["error"]("The Product wasn't created", "New Car");
  };

  render() {
    console.log("App is rendering");
    return (
      <React.Fragment>
        <NavBar {...this.props} user={this.state.userData}></NavBar>

        <main role="main">
          <h5 className="assessment"> Cars Assessment</h5>
          <form className="form-assessment">
            <div className="form-group">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="nameHelp"
                placeholder="Enter Name"
                onChange={this.onFormFieldChanged}
                value={this.state.carData.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputManufacturer">Manufacturer</label>
              <input
                type="text"
                className="form-control"
                id="manufacturer"
                placeholder="Enter Manufacturer"
                onChange={this.onFormFieldChanged}
                value={this.state.carData.manufacturer}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputDescription">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Enter Description"
                onChange={this.onFormFieldChanged}
                value={this.state.carData.description}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputCost">Cost</label>
              <input
                type="integer"
                className="form-control"
                id="cost"
                placeholder="Enter Cost"
                onChange={this.onFormFieldChanged}
                value={this.state.carData.cost}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onSubmitClicked}
            >
              Submit
            </button>
          </form>
        </main>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
