import React, {Component} from "react";
import {currentUser,userById} from "../services/appService"


class Home extends Component{

componentDidMount(){
    currentUser()
    .then(this.onCurrentUserSuccess)
    .catch(this.onCurrentUserError)
}
    

    onCurrentUserSuccess = (Response) =>{
        userById(Response.data.item.id)
        .then(this.onUserByIdSuccess)
        .catch(this.onUserByIdError)
        console.log(Response.data.item.id);
    }
    onCurrentUserError = (Response) => console.warn(Response);
    onUserByIdSuccess = (Response) =>{
        
        console.log(Response.data.item);
      } 
      onUserByIdError = (Response) => console.warn(Response);


    render(){
        return (
            <h1>hi  </h1>
        )

        
    }
}

export default Home;