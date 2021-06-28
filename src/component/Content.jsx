import React from "react";
import * as userService from "../services/userService"



class Content extends React.Component{
    onButtonClicked =(e)=> {
        e.preventDefault()
        console.log("It is clicked")
        const payload = {
            email: "yshwan87@gmail.com",
            password: "Sabiopassword1!",
            tenantId: "bootcamp1"
        };   

        userService.logIn(payload)
        .then(this.onActionSuccess)
        .catch(this.onActionError);
    }

componentDidMount(){
  const payload = {
    email: "yshwan87@gmail.com",
    password: "Sabiopassword1!",
    tenantId: "bootcamp1"
};   

userService.logIn(payload)
.then(this.onActionSuccess)
.catch(this.onActionError);

}


onActionSuccess = (response) => {
    console.log(response)
  }
 onActionError= (errResponse) => {
    console.warn(errResponse)
  }

    render (){
        

    
    
   
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
                <div>
                <button type="button" onClick={this.onButtonClicked} className="btn btn-primary">Click</button>
                </div>
              </div>
            </div>
            <hr />
          </div>

        </React.Fragment>

        );


    };
};

export default Content