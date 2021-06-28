import React from "react";
import userService from "../services/usersServices";

class Jumbo extends React.Component {
  onClickHandler = () => {
    const data = {
      email: "luis_a_garcia27@yahoo.com",
      password: "@Iceman13!",
    };

    userService
      .logIn(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log("You're In!");
  };
  onActionError = (response) => {
    console.warn({ error: response });
  };

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Hello, world!</h1>
            <p>
              This is a template for a simple marketing or informational
              website. It includes a large callout called a jumbotron and three
              supporting pieces of content. Use it as a starting point to create
              something more unique.
            </p>
            <p>
              <button className="btn btn-primary btn-lg">
                Learn more &raquo;
              </button>
            </p>
            <p>
              <button
                className="btn btn-primary btn-lg"
                onClick={this.onClickHandler}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Jumbo;
