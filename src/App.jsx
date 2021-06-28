import React, { Component } from "react";
import SiteNav from "./examples/SiteNav";
import Footer from "./examples/Footer";
import userService from "./services/usersServices";
import entityService from "./services/EntityServices";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";

import "./App.css";

class App extends Component {
  state = { newEntity: {} };

  componentDidMount() {
    let payload = {
      email: "luis_a_garcia27@yahoo.com",
      password: "@Iceman13!",
    };
    userService
      .logIn(payload)
      .then(this.onLoginSuccess)
      .catch(this.onLoginError);
  }
  onLoginSuccess = (response) => {
    console.log("Logged In.", response);
  };
  onLoginError = (err) => {
    console.warn({ error: err });
  };

  onRegisterFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let newEntity = { ...prevState.newEntity };

      newEntity[inputName] = newValue;

      return { newEntity };
    });
  };

  onSubmitClick = () => {
    let payload = { ...this.state.newEntity };

    console.log(payload);
    entityService
      .addEntity(payload)
      .then(this.onEntityPostSuccess)
      .catch(this.onEntityPostError);
  };

  onEntityPostSuccess = (response) => {
    console.log(response);
    toast.success("Post Successful!");
    toast.success(`Post Id: ${response.data.item}`);
  };
  onEntityPostError = (response) => {
    console.log({ error: response });
  };

  render() {
    return (
      <BrowserRouter>
        <SiteNav />

        <main role="main" style={{ marginTop: "80px" }}>
          <div className="container">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="Name"
                  className="form-control"
                  onChange={this.onRegisterFieldChanged}
                />
              </div>
              <div className="form-group">
                <label>Manufacturer</label>
                <input
                  type="text"
                  name="Manufacturer"
                  className="form-control"
                  onChange={this.onRegisterFieldChanged}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="Description"
                  className="form-control"
                  onChange={this.onRegisterFieldChanged}
                />
              </div>
              <div className="form-group">
                <label>Cost</label>
                <input
                  type="text"
                  name="Cost"
                  className="form-control"
                  onChange={this.onRegisterFieldChanged}
                />
              </div>
              <div className="form-group">
                <input
                  type="button"
                  className="btn btn-primary"
                  value="Submit"
                  onClick={this.onSubmitClick}
                />
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
