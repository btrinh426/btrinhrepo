import React from "react";
import * as userServices from "../services/userServices"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

class Login extends React.Component
{
    state = {
        formData: {
            "email": "",
            "password" : "",
            "tenantId":"U017V0HP8A2"
        }
        , isUserLoggedIn: ""
    };  

    toastrOptions = {
        position: toast.POSITION.BOTTOM_RIGHT,
        showDuration: 500,
        timeOut: 1000,
    };

    onLoginClicked = e =>
    {
        e.preventDefault();

        var payload = JSON.stringify({...this.state.formData});

        userServices.logIn(payload)
            .then(this.onLoginSuccess)
            .catch(this.onLoginError);
    }
    
    onLoginSuccess = response => {
        toast.success("Welcome Back!", 
            this.toastrOptions
            );
        
        this.props.setCurrentUser()
        this.props.history.push("/")
      };
    
    onLoginError = response => {
        toast.error("Log in failed. Please Try Again", 
        this.toastrOptions
        );
      };

    onRegisterClicked = e =>
    {
        this.props.history.push("/register")
    };

    onFormFieldChange = e => 
    {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = e.currentTarget.name;

        this.setState(()=>
        {
            let formData = {...this.state.formData};

            formData[inputName] = newValue;

            return { formData };
        })
    }

    render()
    {
        toast.configure()
        return (
            <React.Fragment>

                <div className="container login">
                    <h1 className="component-header"> Log In </h1>
                    <form className="form">
                        <div className="form-header">Sign in to continue.</div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input 
                                type="email" 
                                id="email" 
                                className="form-control" 
                                name="email" 
                                aria-describedby="emailHelp"
                                onChange={this.onFormFieldChange} 
                                value={this.state.formData.email}
                                required
                            />
                            <small id="emailHelp" className="form-text text-danger"></small>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                name="password"
                                aria-describedby="passwordHelp" 
                                onChange={this.onFormFieldChange} 
                                value={this.state.formData.password}
                                required
                            />
                            <small id="passwordHelp" className="form-text text-danger"></small>
                        </div>
                        
                        <button
                            type="submit" 
                            className="form-control btn btn-primary" 
                            id="login"
                            onClick={this.onLoginClicked}
                            >
                                Login
                            </button>
                            <br/><br/>
                        <div className="form-group">
                            <label htmlFor="register">Don't have an Account?</label>
                            <button 
                                type="button" 
                                className="form-control btn btn-outline-secondary" 
                                id="register" 
                                aria-describedby="registerHelp" 
                                value="Register"
                                onClick={this.onRegisterClicked}
                            >Register</button>
                            <small id="registerHelp" className="form-text text-mute"></small>
                        </div>
                            
                    </form>
                    <hr/>
                </div>
                
            </React.Fragment>
        )
    }
}

export default Login;