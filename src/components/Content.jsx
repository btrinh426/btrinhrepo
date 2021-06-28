import React, { Component } from "react";
import * as userService from "../services/userService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

class Content extends Component {
  clickHandler = () => {
    console.log("btn was clicked!");

    const data = {
      email: "aa.aaa@gmail.com",
      password: "AAaaa123!",
      tenantId: "U0190CX3XPW",
    };
    userService
      .logIn(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  // componentDidMount() {
  //   console.log("From Content: componentDidMount");
  //   const data = {
  //     email: "aa.aaa@gmail.com",
  //     password: "AAaaa123!",
  //     tenantId: "U0190CX3XPW",
  //   };
  //   userService
  //     .logIn(data)
  //     .then(this.onActionSuccess)
  //     .catch(this.onActionError);
  // }   //**********this gets executed instantly! (like startUp) */

  onActionSuccess = (response) => {
    Swal.fire("Good Job!");
  };

  onActionError = (errResponse) => {
    Swal.fire("Oops...", "Something went wrong!", "error");
  };

  render() {
    return (
      <React.Fragment>
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

          <hr />
          <div className="col-md-4">
            <button onClick={this.clickHandler}>Click Me</button>
            {/* whenever u r inside a clss compo, u need to call ur functions like this  */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Content;
