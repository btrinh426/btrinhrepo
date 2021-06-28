import React from "react";
import Axios from "axios";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "surekha@surekha.com", 
      password: "SurekhaW123!", 
      tenantId: "surekha"
    }
  }  
  
  componentDidMount() {
    var onLoginUserSuccess = (res) => {
      console.log({ LoginStatus: res.statusText });
      // toaster.info('hello world');
      alert("You have successfully logged in!!");
      // // Redirect to homepage
      // window.location = 'http://localhost:1932/SabioV3/Starter%20Tasks/homePage.html'
    }
    var onLoginUserError = (res) => {
      console.warn({ error: res });
      alert("Something went wrong");
    }
    var loginUser = () => {
      console.log(this.state);
      // post login data to endpoint
      var users = {
        endpoint: "https://api.remotebootcamp.dev/api/users/login"
      }
    
      users.login = payload => {
          console.log('login User is executing', payload);
          const config = {
              method: "POST",
              url: users.endpoint,
              data: payload,
              crossdomain: true,
              headers: { "Content-Type": "application/json" }
          };
          return Axios(config);
      }
      users.login(this.state)
          .then(onLoginUserSuccess)
          .catch(onLoginUserError);
    }
    loginUser();
  }
  render() {
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
          <hr />
          <button>Click Me</button>
      </div>
    )
  }
}

export default Content;