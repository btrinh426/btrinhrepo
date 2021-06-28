import React from "react";
import * as userService from "../services/userService";

class Content extends React.Component {
  state = {
    userCredentials: { email: "sabio@sabio.la", password: "Sabiopassword1!" },
  };

  componentDidMount() {
    console.log(this.state);
  }

  onButtonClicked = (e) => {
    console.log("you clicked me");
    e.preventDefault();
    let userData = {
      email: this.state.userCredentials.email,
      password: this.state.userCredentials.password,
      tenantId: "U01RD0GNJKE",
    };

    userService
      .logIn(userData)
      .then(this.onLoginSuccess)
      .catch(this.onLoginFail);
  };

  onLoginSuccess = (res) => {
    console.log(res);
  };

  onLoginFail = (res) => {
    console.warn(res);
  };

  render() {
    console.log("rendering login");
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Heading</h2>
            <p>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus. Etiam porta sem malesuada
              magna mollis euismod. Donec sed odio dui.
            </p>
            <p>
              <button className="btn btn-secondary">
                View details &raquo;
              </button>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Heading</h2>
            <p>
              Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
              tellus ac cursus commodo, tortor mauris condimentum nibh, ut
              fermentum massa justo sit amet risus. Etiam porta sem malesuada
              magna mollis euismod. Donec sed odio dui.
            </p>
            <p>
              <button className="btn btn-secondary">
                View details &raquo;
              </button>
            </p>
          </div>
          <div className="col-md-4">
            <h2>Heading</h2>
            <p>
              Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Vestibulum id ligula porta felis euismod
              semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
              condimentum nibh, ut fermentum massa justo sit amet risus.
            </p>
            <p>
              <button className="btn btn-secondary">
                View details &raquo;
              </button>
            </p>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={this.onButtonClicked}
            >
              Click me
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
