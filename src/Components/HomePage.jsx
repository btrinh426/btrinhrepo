import React from "react";

class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="loggedInPage">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4" id="helloUser">
                Welcome {}
              </h1>

              <p className="lead">Not really much to see here, huh?</p>
            </div>
          </div>

          <button
            className="float-right btn btn-primary d-none"
            id="logOutButton"
          >
            Logout
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
