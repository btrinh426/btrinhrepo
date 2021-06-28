import React, { Component } from "react";
import userServices from "../services/userServices";
import { toast } from "react-toastify";


class Login extends Component {
    state = {
        loginEmail: "",
        loginPassword: "",
        isLoggedIn: false,
    }

    onLoginChange = e => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name

        this.setState(() => {
            let newState = {};

            newState[inputName] = newValue

            return newState;
        })
    }

    onLoginSuccess = response => {
        toast.success("Login was successful");
        this.setState({isLoggedIn:true})
    
       
    }
    onLoginError = response => {
        toast.error("No account found")
    }

    handleClick = () => {
        let payload = {
            "email": this.state.loginEmail,
            "password": this.state.loginPassword,
            "tenantID": "U01TY0VT466"
        }

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
                        id="loginEmail"
                        name="loginEmail"
                        onChange={this.onLoginChange} 
                        placeholder="Email"
                        value={this.state.loginEmail}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        id="loginPassword"
                        name="loginPassword"
                        onChange={this.onLoginChange} 
                        placeholder="Password"
                        value={this.state.loginPassword}
                    />
                </div>

                <button onClick={this.handleClick} type="button" className="btn btn-danger">Login</button>
        </div>
        )
    }
}

export default Login