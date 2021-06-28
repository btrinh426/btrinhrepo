import React, { Component } from "react";
import userServices from "../services/userServices";
import { toast } from "react-toastify";
import { withRouter } from "react-router";



class Login extends Component {

    state = {
        email: "",
        password: "",
        tenantID: "U01TY0VT466",

    }

    onLoginChange = e => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name

        this.setState(() => {
            let newState = this.props.login;

            newState[inputName] = newValue

            return newState;
        })
    }



    onLoginSuccess = response => {
        toast.success("Login was successful");
        this.setState({isLoggedIn:true})
        this.props.history.push("/homepage")

    
       
    }
    onLoginError = response => {
        console.error(response)
    }

    handleClick = () => {
        let payload = this.state

        userServices.login(payload)
            .then(this.onLoginSuccess)
            .catch(this.onLoginError)
    }

    render() {
        return (
            <div className="section">

                <h5>This is the login page</h5>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        className="form-control" 
                        type="email" 
                        name="email"
                        onChange={this.onLoginChange} 
                        placeholder="Email"
                        value={this.props.login.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        className="form-control" 
                        type="text"
                        name="password"
                        onChange={this.onLoginChange} 
                        placeholder="Password"
                        value={this.props.login.password}
                    />
                </div>

                <button onClick={this.handleClick} type="button" className="btn btn-danger">Login</button>
        </div>
        )
    }
}

export default withRouter(Login)