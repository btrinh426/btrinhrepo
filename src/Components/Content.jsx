import React, { Component } from "react";
import { usersService } from "../services/userService";

class Content extends Component {
  onNewButtonClicked = (e) => {
    console.log("Yay! You found Me!", new Date());
  };

  onLoginClicked = (e) => {
    console.log("Login clicked...", new Date());

    // var data = {}

    var onLoginSuccess = (response) => {
      console.log({ goodLoginResponse: response });
    };

    var onLoginError = (response) => {
      console.warn({ error: response });
    };

    usersService.userLogin().then(onLoginSuccess).catch(onLoginError);
  };

  render() {
    return (
      <div className="Content">
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
            </div>
          </div>
          <div>
            <p>
              <button
                className="btn btn-outline-primary"
                onClick={this.onNewButtonClicked}
              >
                New Button &raquo;
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={this.onLoginClicked}
              >
                Login &raquo;
              </button>
            </p>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default Content;
