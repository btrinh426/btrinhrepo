import React, { Component } from "react"
import { toast } from "react-toastify";
import { register } from "../services/userServices"; 
import "react-toastify/dist/ReactToastify.css"

class Registration extends Component {
    
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

    onButtonClick (e) {
        register({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm,
            avatarUrl: this.state.avatarUrl,
        }).then((response) => {
            this.setState({
                registrationResponse: response.statusText        
            })
            if(response) {
                toast("Registration Successful!", {
                    className: "Success-toast",
                    draggable: true,
                    position: toast.POSITION.TOP_CENTER
                })
            }
        }).catch((error) => {
            if(error){
            toast("Registration Unsuccessfull", {
                className: "error-toast",
                draggable: true,
                position: toast.POSITION.TOP_CENTER
                })
            }
        })
    }

    onInputChange (e) {
        const stateObj = {}
        stateObj[e.currentTarget.id] = e.currentTarget.value
        this.setState(stateObj)
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="header">
                        <h1>Register</h1>
                    </div>
                    <form className="userRegisterForm pl3 pr3" style={{marginTop: "120px"}}>
                        <div className="col-auto">
                            <div className="form-group row align-items-center">
                                <label htmlFor="firstName" className="form-label my-label col-3" style={{minWidth: "68px"}}>
                                    First Name
                                </label>
                                <input
                                    type="text" 
                                    className="form-control my-input-control col" 
                                    id="firstName" 
                                    aria-describedby="firstNameHelp" 
                                    placeholder="First Name"
                                    onChange={this.onInputChange.bind(this)}>
                                </input>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group row align-items-center">
                                <label htmlFor="lasName" className="form-label my-label col-3" style={{minWidth: "68px"}}>
                                    Last Name
                                </label>
                                <input
                                    type="text" 
                                    className="form-control my-input-control col" 
                                    id="lastName" 
                                    aria-describedby="lastNameHelp" 
                                    placeholder="Last Name"
                                    onChange={this.onInputChange.bind(this)}>
                                </input>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group row align-items-center">
                                <label htmlFor="email" className="form-label my-label col-3" style={{minWidth: "68px"}}>
                                    Email
                                </label>
                                <input
                                    type="email" 
                                    className="form-control my-input-control col" 
                                    id="email" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Email"
                                    onChange={this.onInputChange.bind(this)}>
                                </input>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group row align-items-center">
                                <label htmlFor="password" className="form-label my-label col-3" style={{minWidth: "68px"}}>
                                    Password
                                </label>
                                <input
                                    type="password" 
                                    className="form-control my-input-control col" 
                                    id="password" 
                                    aria-describedby="passwordHelp" 
                                    placeholder="Password"
                                    onChange={this.onInputChange.bind(this)}>
                                </input>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="row align-items-center">
                                <label htmlFor="passwordConfirm" className="form-label my-label col-3" style={{minWidth: "68px"}}>
                                    Confirm Password
                                </label>
                                <input
                                    type="password" 
                                    className="form-control my-input-control col" 
                                    id="passwordConfirm" 
                                    aria-describedby="passwordConfirmHelp" 
                                    placeholder="Confirm Password"
                                    onChange={this.onInputChange.bind(this)}>
                                </input>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="form-group row align-items-center">
                                <label htmlFor="avatar" className="form-label my-label col-3" style={{minWidth: "68px"}}>
                                    Avatar Url
                                </label>
                                <input
                                    type="text" 
                                    className="form-control my-input-control col" 
                                    id="avatarUrl" 
                                    aria-labelledby="text" 
                                    placeholder="Avatar Url"
                                    onChange={this.onInputChange.bind(this)}>
                                </input>
                            </div>
                        </div>
                        <div>
                        <button type="button" className="btn btn-primary" onClick={this.onButtonClick.bind(this)}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
            
         )
    }
 }

export default Registration