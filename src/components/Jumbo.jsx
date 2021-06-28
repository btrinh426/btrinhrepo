import React from "react";
import userServices from "../services/userServices";
import { toast } from "react-toastify";

class Jumbo extends React.Component {
    render() {


      let payload = {
        "email": "maurice.g.washington@gmail.com",
        "password": "Kyocera6*",
        "tenantID": "U01TY0VT466"
      }

      let onLoginSuccess = response => {
        toast.success("Login was successful")
      }

      let onLoginError = response => {
        toast.error("Something went wrong")
      }

      let onBtnClick = () => {
        userServices.login(payload)
        .then(onLoginSuccess)
        .catch(onLoginError)
      }




        return(
            <div className="jumbotron">
            <div className="container">
              <h1 className="display-3">Hello, world!</h1>
              <p>
                This is a template for a simple marketing or informational
                website. It includes a large callout called a jumbotron and
                three supporting pieces of content. Use it as a starting point
                to create something more unique.
              </p>
              <p>
                <button className="btn btn-primary btn-lg" onClick={onBtnClick}>
                  Learn more &raquo;
                </button>
              </p>
            </div>
          </div>
        )
    }
}

export default Jumbo