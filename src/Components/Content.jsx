import React from "react";
import { logIn } from "../services/userService";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginResponse: "Login Not completed.",
    };
  }

  onButtonClick = (e) => {
    console.log("Button was clicked.");

    // logIn().then(this.onActionSuccess).catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    this.setState({
      loginResponse: response.statusText,
    });
    console.log("Success");
    console.log(response);
  };

  onActionError = (errResponse) => {
    console.log("Login Failed");
  };

  oncomponentDidMount = () => {
    console.log("CDM firing.");
    logIn().then(this.onActionSuccess).catch(this.onActionError);
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
            <button
              className="btn btn-primary btn-lg"
              onClick={this.onButtonClick}
            >
              Click Me for Console Log and Axios Call&raquo;
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Content;
