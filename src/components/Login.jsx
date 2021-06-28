import React from "react";
import * as userServices from "../services/userServices";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

class Login extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            email: "",
            password: "",
            tenantId: "U01U83Z77D5"
        };
    };

    logInUser =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    onSubmit=(e)=>{
        e.preventDefault();

        const data = this.state;
        console.log(this.state); 
    
        userServices.login(data)
            .then(this.onLoginSuccess)
            .catch(this.onLoginError);
    };

    onLoginSuccess=(response)=>{
        console.log(response);
        toast.success("You have successfully logged in!",{hideProgressBar:true});

        this.props.history.push("/userhome");
    };

    onLoginError=(response)=>{
        console.error({"error": response});
        toast.error("Please try again." ,{hideProgressBar:true});
    };


    render(){
        return(
            <React.Fragment>
                <div className="text-center" style={{margin: "25rem"}}>
                    <form className="form-signin">
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email address" 
                        required autoFocus 
                        name="email"
                        value={this.state.email}
                        onChange={this.logInUser}/>

                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password"
                        className="form-control"
                        placeholder="Password"
                        required 
                        name="password"
                        value={this.state.password}
                        onChange={this.logInUser}/>
                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onSubmit}>Sign in</button>
                        <p className="text-muted">Not a user? Register <NavLink to="/form"> here </NavLink> </p>
                    </form>
                </div>
            </React.Fragment>
        );
    };
};

export default Login;