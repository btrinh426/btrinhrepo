import React from"react"
import {BrowserRouter, Route, NavLink} from "react-router-dom";
import * as userService from "./serviceHelper"


class compLogin extends React.Component
{

    
    componentDidMount(){
        let data={  "email": "munib22@gmail.com",
        "password": "Wow2010#",
        "tenantId": "U01JS43TSAJ" };
        console.log("The login link was clicked.");
        userService.logIn(data)
      }

    render()
    {
    return ("Login SuccessFull")
 }
}

export default compLogin;