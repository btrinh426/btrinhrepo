import React from "react";
import axios from "axios";

class Content extends React.Component {
  onButtonClicked = (e) => {
    console.log("Button clicked", e.currentTarget);
    var payload = { email: "user@google.com", password: "password" };
    let logIn = (payload) => {
      const config = {
        method: "_PICK_A_HTPP_METHOD",
        url: "_A_URL_GOES_HERE",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
      };

      return axios(config);
    };
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
              <button
                className="btn btn-secondary"
                onClick={this.onButtonClicked}
              >
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
              <button
                className="btn btn-secondary"
                onClick={this.onButtonClicked}
              >
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
              <button
                className="btn btn-secondary"
                onClick={this.onButtonClicked}
              >
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
