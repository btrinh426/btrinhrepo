import React from "react";
import userService from "../services/userService";

class Content extends React.Component {
  buttonClicked() {
    var payload = { email: "danielm1013@gmail.com", password: "!QAZ2wsx", tenantId: "U01N8MYLM8C" };
    userService.logIn(payload)
      .then(this.onLogInSuccess).catch(this.onLogInError);
  }
  onLogInSuccess = () =>
  {
    console.log("Success")
  }
  onLogInError = () =>
  {
    console.log("Failed")
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row" id="cardContainer">
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
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={this.buttonClicked}
                >
                  Click me! &raquo;
                </button>
              </div>
            </div>
          </div>

          <hr />
        </div>
      </React.Fragment>
    );
  }
}
export default Content;
