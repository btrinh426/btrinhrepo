import React, { Component } from "react";
import axios from "axios";
class Content extends Component {
  usersService = {
    endpoint: "https://api.remotebootcamp.dev/api/users",
    payload: {
      email: "name@example.com",
      password: "password",
      tenantId: "U01UAJY7BR7",
    },
  };

  config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login", //can also be `${this.usersService.endpoint}/login`
    data: this.usersService.payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  componentDidMount() {
    console.log("Test");
    return axios(this.config)
      .then(function (data) {
        console.log(data);
      })
      .catch(function (data) {
        console.warn(data);
      });
  }
  onButtonClicked = () => {
    console.log("i was clicked");
    return axios(this.config)
      .then(function (data) {
        console.log(data);
      })
      .catch(function (data) {
        console.warn(data);
      });
  };

  render() {
    return (
      <div className="container">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.onButtonClicked}
        >
          Click Me
        </button>

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

        <hr />
      </div>
    );
  }
}
export default Content;
