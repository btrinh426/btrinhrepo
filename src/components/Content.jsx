import React from "react";
import * as userService from "../services/userService";

class Content extends React.Component
{
    handleClick = () => {
        console.log("Button is clicked");

        var payload = { email: "rafael_calderon25@yahoo.com", password: "Hello25!", tenantId: "U01E6LHFVGW"};

        userService.logIn(payload).then(this.onLogInSuccess).catch(this.onLogInError);
    }

    onLogInSuccess = (response) =>
    {
      console.log(response.data);
    }

    onLogInError = (errResponse) =>
    {
      console.warn(errResponse.data);
    }

    render() {
        return (
            <React.Fragment>
            <div className="container">
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
              <div>
                <button onClick={this.handleClick} className="btn btn-primary">My Button</button>
              </div>
            </div>

            <hr />
          </div>
        </React.Fragment>
        );
    }

    componentDidMount()
    {
      var payload = { email: "rafael_calderon25@yahoo.com", password: "Hello25!", tenantId: "U01E6LHFVGW"};

      userService.logIn(payload).then(this.onLogInSuccess).catch(this.onLogInError);
    }
}




export default Content;