import React from "react";
import axios from "axios";


class Content extends React.Component
{

    componentDidMount(){

        console.log("componentDidMount")
        var payload = {
            "email": "user@google.com",
            "password": "password",
            "tenantId": "U01GA18K2E5"
        }

        const config = {
          method: "POST",
          url: "https://api.remotebootcamp.dev/api/users/login",
          data: payload,
          withCredentials: true,
          crossdomain: true,
          headers: { "Content-Type": "application/json" }
        };
      
        return axios(config);

        }

    login() {

        var payload = {
            "email": "user@google.com",
            "password": "password",
            "tenantId": "U01GA18K2E5"
        }

        const config = {
          method: "POST",
          url: "https://api.remotebootcamp.dev/api/users/login",
          data: payload,
          withCredentials: true,
          crossdomain: true,
          headers: { "Content-Type": "application/json" }
        };
      
        return axios(config);
      }

    onClickHandler() {
        console.log('Test Button was clicked');

        this.login()
            .then(this.onActionSuccess)
                .catch(this.onActionError);
    }

    onActionSuccess(response){
        console.log("Login Successful");
        console.log(response);
    }

    onActionError(errResponse){
        console.error("Login Failed");
        console.log(errResponse);
    }
    


    render(){

        return(
            <React-Fragment>



                <div className="container">

                    <div className="row">
                        <button onClick={() => this.onClickHandler()}>
                        Test Button
                        </button>
                    </div>

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
                    </div>

                    <hr />
                </div>
            </React-Fragment>
        )
    }
}

export default Content;