import React from "react";
import defaultExport from "./serviceHandler";

class MainContent extends React.Component {
  componentDidMount = () => {
    console.log(this.props)
    defaultExport.logIn()
  }
  logInClick = () => {
    console.log('user logging in')
  }
   onButtonClick = () => {
        console.log("View Details button was clicked")
  };
    render() {
        return <React.Fragment>
          <div>
            <button type='button' onClick={this.logInClick} className="btn btn-primary">
              Log In
            </button>
          </div>
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
                  <button onClick={this.onButtonClick} className="btn btn-secondary" id="hdg1">
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
                  <button onClick={this.onButtonClick} className="btn btn-secondary " id="hdg2">
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
                  <button onClick={this.onButtonClick} className="btn btn-secondary " id="hdg3">
                    View details &raquo;
                  </button>
                </p>
              </div>
            </div>

            <hr />
          </div>
        </React.Fragment>
    }
}

export default MainContent