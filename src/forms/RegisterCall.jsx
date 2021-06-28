import React from "react";
import * as userService from "../services/userService";



class RegisterCall extends React.Component
{
    
    registerButtonClicked = (e) =>
{
    e.preventDefault();
    e.stopPropagation();
    
   
    
    userService.register()
    .then(this.onActionSuccess)
    .catch(this.onActionError);
    
    
    
    console.log("Clicked-button was clicked", new Date(), e.currentTarget);
    console.log("Here is state:", this.state)
}

onActionSuccess = (response) => {
      console.log(response.data) }
 
 onActionError= (response) => {

  console.warn({ error: response });


}
    
    
    render()
    {
        return null
    }
}

export default RegisterCall;