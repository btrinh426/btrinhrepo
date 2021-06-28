import React from "react";
import  { NavLink } from "react-router-dom"
import axios from "axios";

class JumboComponent extends React.Component
{

  
    test = 
    {
        name: "jason"
    }

    logClick = (location) =>{
        console.log(location)

      

        let getUser = () => {

            const config = {
              method: "GET",
              url: "https://api.remotebootcamp.dev/api/users/current",
              //data: payload,
              //withCredentials: true,
              crossdomain: true,
              headers: { "Content-Type": "application/json" }
            };
          
            return axios(config);
          };

          getUser().then(onGetUserSucces).catch(onGetUserFail);

          function onGetUserSucces(response)
          {
              console.log(response);
          }

          function onGetUserFail(error)
          {
              console.log(error.response);
          }

    };
    componentDidMount()
    {
        this.logClick("firing from mount");
    };
    
    render(){

        return (
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
                <NavLink to="/LearnMore" className="btn btn-primary btn-lg" onClick={()=>{this.logClick("Click")}}>
                  Learn more &raquo;
                </NavLink>
              </p>
            </div>
          </div>
        );
    }
}


export default JumboComponent;