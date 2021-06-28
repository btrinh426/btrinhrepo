import React from 'react'
import axios from "axios"

class Content extends React.Component { 

    login = () => {
        var payload = {
            email: "jim@pro-tecit.com",
            password: "#sabioTraining2",
            tenantId: "U01R71K7F19"
        };
    
        const config = {
            method: "POST",
            url: "https://api.remotebootcamp.dev/api/users/login",
            data: payload,
            crossdomain: true,
            headers: { "Content-Type": "application/json" }
        };
    
        return axios(config)
            .then(function (data) { console.log(data) })
            .catch(function (data) { console.warn(data) });
    };

    componentDidMount () {
        this.login();
    };

    onButtonClick = () => {
        this.login();
    };

    render(){
         return (
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
            </div>

            <button className="btn btn-secondary" onClick={this.onButtonClick}>CLICK ME</button>
            <hr />
          </div>
         );
    }
}

export default Content;