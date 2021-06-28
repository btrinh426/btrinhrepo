import React from "react";
import debug from "sabio-debug";
import { logIn } from "../services/usersService";

const _logger = debug.extend("App");

class Content extends React.Component {
  componentDidMount() {
    var payload = {
      email: "aUsername1@dispostable.com",
      password: "123qwe!@#QWE",
      tenantId: "sabio123",
    };
    logIn(payload).then(this.onLogInSuccess).catch(this.onLogInError);
  }

  onLogInSuccess = (response) => {
    _logger("login success", response);
  };
  onLogInError = (response) => {
    _logger("login error", response);
  };

  handleClick = () => {
    _logger("this is:", this);
    const payload = {
      email: "aUsername1@dispostable.com",
      password: "123qwe!@#QWE",
      tenantId: "sabio123",
    };
    logIn(payload).then(this.onLogInSuccess).catch(this.onLogInError);
  };

  render() {
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
              <button className="btn btn-secondary" onClick={this.handleClick}>
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
              <button className="btn btn-secondary" onClick={this.handleClick}>
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
              <button className="btn btn-secondary" onClick={this.handleClick}>
                View details &raquo;
              </button>
            </p>
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

export default Content;
