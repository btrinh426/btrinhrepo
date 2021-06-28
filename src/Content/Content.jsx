import React, { Component } from "react";
import * as userService from '../services/userService';

class Content extends Component {

  onButtonClicked = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Content Component click handler button");
    const data = { email: "user@google.com", password: "Reactpassword123!", tenantId: "bootcamp2" };
    const payload = data;
    userService.userLogin(payload)
      .then(this.onLogInSuccess)
      .catch(this.onLogInError)
  };

  onLogInSuccess = (response) => {
    console.log('Login Success @', new Date());
  };

  onLogInError = (response) => {
    console.warn({ error: response })
  };

  render() {
    return (
        <div className="container">
            <div className="row">
              <div className="col-md-4">
                <button type="button" className="btn btn-md btn-outline-primary" onClick={this.onButtonClicked}>
                    Meaningless Button &raquo;
                </button>
                <h2>Heading</h2>
                <p>
                  Donec id elit non mi porta gravida at eget metus. Fusce
                  dapibus, tellus ac cursus commodo, tortor mauris condimentum
                  nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                  malesuada magna mollis euismod. Donec sed odio dui.
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
                  Donec id elit non mi porta gravida at eget metus. Fusce
                  dapibus, tellus ac cursus commodo, tortor mauris condimentum
                  nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                  malesuada magna mollis euismod. Donec sed odio dui.
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

            <hr />
          </div>
    );
  }
}

export default Content;



