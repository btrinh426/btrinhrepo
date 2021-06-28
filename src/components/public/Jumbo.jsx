import React from "react";

class Jumbo extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Hello, world!</h1>
          <p>
            This is a template for a simple marketing or informational website.
            It includes a large callout called a jumbotron and three supporting
            pieces of content. Use it as a starting point to create something
            more unique.
          </p>
          <p>
            <button className="btn btn-primary btn-lg">
              Learn more &raquo;
            </button>
          </p>
          <form id="loginForm">
            <div className="row col-12">
              <div className="form-row  align-items-center">
                <div className="form-group col-md-10">
                  <input
                    type="email"
                    className="form-control"
                    id="inputLoginEmail"
                    name="inputLoginEmail"
                    placeholder="username@example.com"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    id="inputLoginPassword"
                    name="inputLoginPassword"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-4">
              <button
                type="button"
                className="btn btn-dark btn-lg"
                id="btnLoadLogin"
              >
                Login
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="btn btn-light btn-lg btnLoadRegisterNew"
                id="btnLoadRegisterNew"
              >
                Register New User
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Jumbo;
