import React from "react";
import { withRouter } from "react-router-dom";
import * as userService from "../services/userService";

class Dashboard extends React.Component {
  state = {
    name: " ",
  };

  onLogOutClicked = (e) => {
    e.preventDefault();
    console.log("I was clicked.", new Date());

    userService.logOut().then(this.onLogOutSuccess).catch(this.onLogOutError);
  };
  onLogOutSuccess = (response) => {
    console.log(response);
    this.props.history.push("/login/");
  };

  onLogOutError = (errResponse) => {
    console.log(errResponse);
  };

  componentDidMount() {
    console.log("MountFiring");

    userService
      .currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  }

  onCurrentUserSuccess = (response) => {
    console.log(response);
    console.log(response.data.item.name);

    this.setState(() => {
      let name = response.data.item.name;

      return { name };
    });
  };

  onCurrentUserError = (errResponse) => {
    console.log(errResponse);
  };

  render() {
    return (
      <React.Fragment>
        <main role="main">
          <div
            style={{ position: "relative", top: "100px" }}
            className="container"
          >
            <div className="row">
              <div className="col-md-4">
                <h2>Welcome {this.state.name}</h2>
                <p>You're signed in!</p>
                <p>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={this.onLogOutClicked}
                  >
                    Log Out
                  </button>
                </p>
              </div>

              <hr />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(Dashboard);
