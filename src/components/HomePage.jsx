import React, { Component } from "react"
import { currentUser } from "../services/userServices"; 

class HomePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            registrationResponse: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            avatarUrl: ""
        };
    }
}

export default HomePage