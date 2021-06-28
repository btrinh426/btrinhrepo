import React from "react";
import * as userServices from "../services/userServices";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import{NavLink} from "react-router-dom";


class Form extends React.Component{

    constructor(props){
        super(props)
            this.state ={
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordConfirm: "",
                avatarUrl: "",
                tenantId: "U01U83Z77D5"
        };
    };

    changeUserInfo=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    onSubmit =(e)=>{
        e.preventDefault();
        const data = this.state;
        console.log(this.state); 
    
        userServices.register(data)
            .then(this.onSubmitSuccess)
            .catch(this.onSubmitError);
    };
    
    onSubmitSuccess =(response)=>{
        console.log(response);
        toast.success("You have successfully registered!", {hideProgressBar:true});

        this.props.history.push("/login");
    };
    
    onSubmitError=(response)=>{
        console.error({"error":response});
        toast.error("Please try again.",{hideProgressBar:true});
    };

    render(){
        return(
            <React.Fragment>
            <form style={{margin: "5rem",}}>
                <div className="form-group">
                    <label htmlFor="firstNameInput">First Name</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="firstNameInput" 
                    name="firstName" 
                    placeholder="First Name"
                    value = {this.state.firstName}
                    onChange ={this.changeUserInfo}/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastNameInput">Last Name</label>
                    <input type="text" 
                    className="form-control" 
                    id="lastNameInput" 
                    name="lastName" 
                    placeholder="Last Name"
                    value = {this.state.lastName}
                    onChange ={this.changeUserInfo}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">Email address</label>
                  <input type="email" 
                  className="form-control" 
                  id="emailInput" 
                  aria-describedby="emailHelp" 
                  name = "email"
                  value = {this.state.email}
                  onChange ={this.changeUserInfo}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordInput1" className="form-label">Password</label>
                  <input type="password" 
                  className="form-control" 
                  id="passwordInput1" 
                  pattern="^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!$%^&*-]).{8,}" 
                  name="password"
                  value = {this.state.password}
                  onChange ={this.changeUserInfo}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput2" className="form-label">Confirm Password</label>
                    <input type="password" 
                    className="form-control" 
                    id="passwordInput2" 
                    name="passwordConfirm"
                    value = {this.state.confirmPassword}
                    onChange ={this.changeUserInfo}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="avatarUrlInput">Avatar URL</label>
                    <input type="text" 
                    className="form-control" 
                    id="avatarUrlInput" 
                    name="avatarUrl" 
                    placeholder="Avatar URL"
                    value = {this.state.avatar}
                    onChange ={this.changeUserInfo}/>
                </div>
                <button type="submit"
                className="btn btn-primary"
                form="submitForm" 
                onClick={this.onSubmit}>
                    Register
                </button>
                <p className="text-muted">
                    Already a user? <NavLink to="/login"> Login Here </NavLink> 
                </p>
              </form>
            </React.Fragment>
        )
    }
}

export default Form;