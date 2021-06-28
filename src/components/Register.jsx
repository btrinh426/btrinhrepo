import React from "react";

import NavBar from "./NavBar";
import "./css/NavBar.css"
import * as userService from "../services/userService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


class Register extends React.Component { 

    
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        avatarUrl: "",
        tenantId: "U01JV2XFH5K"
    }

    onFormFieldChange = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;
        
        this.setState(() => {
            let newState = {};
            newState[inputName] = newValue;      
            return newState;
        });
    }

    submitClicked = (e) => {
        e.preventDefault();
        userService.register(this.state)
            .then(this.submitClickSuccess)
            .catch(this.submitClickError);
    }

    submitClickSuccess = (response) => {
        console.log(response)
        this.onSuccessNotify()
    };
    onSuccessNotify = () => {toast.success('User Registered Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });}
    
    submitClickError = (response) => {
        console.error(response)
        this.onErrorNotify();
    };
    onErrorNotify = () => {toast.error('Something went wrong please look over your information and try again...', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });}


    render () {
        return (
                <React.Fragment>
                <NavBar />
                <div className="wrapper d-flex align-items-stretch">
                    <div className="w-50 mx-auto shadow p-3 mb-5 bg-white rounded">
                    <form id="form-content">
                        <div>
                            <div className="title mx-auto text-center shadow p-3 mb-5 bg-white rounded mt-5">
                                <h2>Register User</h2>
                            </div>
                            <div className="form-group mt-5">
                                <label>First Name</label>
                                <input type="text" name="firstName" value={this.state.firstName} onChange={this.onFormFieldChange} className="form-control"  placeholder="Enter First Name" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" name="lastName" value={this.state.lastName} onChange={this.onFormFieldChange} className="form-control"  placeholder="Enter Last Name" />                       
                            </div>
                            <div className="form-group">
                                <label >Email address</label>
                                <input type="email" name="email" value={this.state.email} onChange={this.onFormFieldChange} className="form-control"  placeholder="name@example.com" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" value={this.state.password} onChange={this.onFormFieldChange} className="form-control"  placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label >Confirm Password</label>
                                <input type="password" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.onFormFieldChange} className="form-control"  placeholder="Confirm Password" />
                            </div>
                            <div className="form-group">
                                <label>avatar URL</label>
                                <input type="text" name="avatarUrl" value={this.state.avatarUrl} onChange={this.onFormFieldChange} className="form-control" placeholder="Enter avatar URL" />                       
                            </div>
                            <button type="submit"  id="submitButton" onClick={this.submitClicked} className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                </div>
                </React.Fragment>
        )       
    }
}





export default Register;