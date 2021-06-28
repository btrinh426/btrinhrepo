import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import * as userService from "../Service/userService";


export class GetUsers extends Component {
    constructor(props) {
       super(props);
       this.state = {
          data: []
       }
    }
    
    submitHandler = (e) => {
        e.preventDefault();
        userService
          .getUser()
          .then(this.ongetUserSuccess)
          .catch(this.ongetUserError);
    
        // make axios call. Bring in the file and call the method
      };
    
      ongetUserSuccess = (response) => {
        console.log(response);
        
      };
    
      ongetUserError = (response) => {
        console.log(response);
      };
 

      render() {
        const { data } = this.state;
        return (
           <div className="data">
             {Array.isArray(data.data) && data.map(data => (
                  <p key={data.name}>{data.email}</p>
              ))}
              
             {Array.isArray(data.data) && data.filter(data => (
                  <p key={data.name}>{data.email}</p>
              ))}

            
        <Button 
        variant="primary" 
       
        {...this.props} 
        onClick={this.submitHandler}>
        
          Submit
        </Button>
        </div>
    );
      }


};

export default GetUsers;