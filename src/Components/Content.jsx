import { data } from "jquery";
import React from "react"
import * as usersService from "../services/userService"

class Content extends React.Component{

    onButtonClicked = () => {
        console.log("I was Clicked");
        usersService.logIn(data).then(this.onLoginSuccess).catch(this.onLoginError);
    };

    onLoginSuccess = (response) => {
      console.log({ login: response.data })
     }
     
     onLoginError = (errResponse) => {
      console.error("error")
     }

    onSecondButtonClicked = () => {
        console.log("I was Clicked too")
    };
    onThirdButtonClicked = () => {
        console.log("Please stop clicking us")
    };

    render(){
        return <React.Fragment>
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
                  <button className="btn btn-secondary" onClick={this.onButtonClicked}>
                    Login &raquo;
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
                  <button className="btn btn-secondary" onClick={this.onSecondButtonClicked}>
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
                  <button className="btn btn-secondary" onClick={this.onThirdButtonClicked}>
                    View details &raquo;
                  </button>
                </p>
              </div>
            </div>

            <hr />
          </div>
        </React.Fragment>
    };
};

export default Content