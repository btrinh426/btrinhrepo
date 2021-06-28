import React from "react";
import * as userService from "../services/userService";

class Content extends React.Component {
  onLogClicked = () => {
    console.log("I was clicked.", new Date());
    const data = {
      email: "charo@modernhuge.com",
      password: "Password777!",
      tenantId: "U021HA9HES0",
    };

    userService
      .logIn(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    console.log(response);
  };

  onActionError = (errResponse) => {
    console.log(errResponse);
  };

  componentDidMount() {
    console.log("MountFiring");
    const data = {
      email: "charo@modernhuge.com",
      password: "Password777!",
      tenantId: "U021HA9HES0",
    };

    userService
      .logIn(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }
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
                <h2>Heading</h2>
                <p>
                  Donec id elit non mi porta gravida at eget metus. Fusce
                  dapibus, tellus ac cursus commodo, tortor mauris condimentum
                  nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                  malesuada magna mollis euismod. Donec sed odio dui.
                </p>
                <p>
                  <button
                    style={{ marginRight: "12px" }}
                    className="btn btn-secondary"
                  >
                    View details &raquo;
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={this.onLogClicked}
                  >
                    Log
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
        </main>
      </React.Fragment>
    );
  }
}

export default Content;
