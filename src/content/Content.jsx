import React from "react";
import axios from "axios";

class Content extends React.Component{
    componentDidMount(){
        var payload = {
            "email": "bunker@bunker.com",
            "password": "Bunker123!",
            "tenantId": "sabio123"
          };

        const config = {
            method: "POST",
            url: "https://api.remotebootcamp.dev/api/users/login",
            data: payload,
            withCredentials: true,
            crossdomain: true,
            headers: { "Content-Type": "application/json" }
          };

          return axios(config)
          .then(this.onLoginClickSuccess)
          .catch(this.onLoginClickError);
    }
    
    onLoginClick = (e) =>{
        //e.stopPropagation();
        //console.log("Log button was clicked...", new Date());
        var payload = {
            "email": "bunker@bunker.com",
            "password": "Bunker123!",
            "tenantId": "sabio123"
          };

        const config = {
            method: "POST",
            url: "https://api.remotebootcamp.dev/api/users/login",
            data: payload,
            withCredentials: true,
            crossdomain: true,
            headers: { "Content-Type": "application/json" }
          };

          return axios(config)
          .then(this.onLoginClickSuccess)
          .catch(this.onLoginClickError);
    }

    onLoginClickSuccess = (response) =>{
        console.log(response);
    }

    onLoginClickError = (response) =>{
        console.log(response);
    }


    render(){
        return <div className="row">
                <div className="col-md-4">
                    <h2>Heading</h2>
                    <p>
                    Donec id elit non mi porta gravida at eget metus. Fusce
                    dapibus, tellus ac cursus commodo, tortor mauris condimentum
                    nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                    malesuada magna mollis euismod. Donec sed odio dui.
                    </p>
                    <p>
                    <button className="log btn btn-secondary" onClick={this.onLoginClick}>
                        Log Button &raquo;
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
            </div>;
    }
}

export default Content;