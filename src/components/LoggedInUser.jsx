import React, { Component } from "react"
import userServices from "../services/userServices"

class LoggedInUser extends  Component {

    componentDidMount() {
        let payload = {
            email: "maurice.g.washington@gmail.com",
            password: "Kyocera6*",
            tenantID: "U01TY0VT466"
        }

        userServices.login(payload)
        .then(this.loginSuccess)
        .catch(this.loginError)

        userServices.currentUser()
            .then(this.currentUserSuccess)
            .catch(this.currentUserError)
    }
    currentUserSuccess = (response) => {
        console.log(response)
    }
    currentUserError = () => {
        console.log("try again")
    }

    loginSuccess = () => {
        console.log("we in there")
        userServices.currentUser()
            .then(this.currentUserSuccess)
            .catch(this.currentUserError)
    }

    loginError = () => {
        console.log("not in")
    }
    
    render() {

        return (<p>Hi</p>)
    }
}

export default LoggedInUser