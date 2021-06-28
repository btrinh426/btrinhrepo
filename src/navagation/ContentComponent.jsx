import React from "react";
// import * as userService from "../services/userService";



class ContentComponent extends React.Component
{
    state = {name:"Miguel Garcia", city: "Los Angeles", zipCode: 90001};



    onButtonClicked = (e) =>
{
    e.preventDefault();
    e.stopPropagation();
    
    // const data = {
    //   "email": "clandestine@gov.com",
    //   "password": "CodeOfHonor!64",
    //   "tenantId": "JohnClancyInc64"
    // }
    
    
    // userService.logIn(data)
    // .then(this.onActionSuccess)
    // .catch(this.onActionError);
    
    
    
    // console.log("Clicked-button was clicked", new Date(), e.currentTarget);
    // console.log("Here is state:", this.state)

    console.log(e.currentTarget);
}

onActionSuccess = (response) => {
      console.log(response.data) }
 
 onActionError= (response) => {

  console.warn({ error: response });


}
    
    
    
    
    
    render()
    {

    return(
        <React.Fragment>
             <div className="container">
            <div className="row">
              <div className="col-md-4">
              <button type="button" className="btn btn-primary" onClick={this.onButtonClicked}>CLICK</button>
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
        </React.Fragment>
    )
    }
}















export default ContentComponent;