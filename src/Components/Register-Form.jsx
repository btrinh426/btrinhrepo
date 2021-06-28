import React, {Component} from "react";
import { registerUser } from "../services/usersService";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


class RegisterForm extends Component {

    state = {
        formData: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            avatarUrl: "",
            tenantId: "U01CDE4FMBM"
        }
    };

    onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget
        let newValue = currentTarget.value
        let inputName = currentTarget.name
        
        this.setState(()=>{
            let formData = {...this.state.formData}

            formData[inputName] = newValue

            return {formData}

            // OR:
            // let newState = {...this.state.formData}
            // newState[inputName] = newValue
            // return {formData: newState}
            
        })

    };

    onSubmit = (e) =>{
        e.stopPropagation()
        e.preventDefault()
        console.log("submit clicked")

        const payload = this.state.formData

        registerUser(payload) 
            .then(this.onRegisterUserSuccess)
            .catch(this.onRegisterUserError)
    };

    onRegisterUserSuccess = (res) => {
        console.log("registerUser success", res)

        toast.success("Success! You are now registered.")

    };

    onRegisterUserError = (err) => {
        console.log("registerUser error", err.response)

        var errors = err.response.data.errors

        toast.error(errors[0], "Registration failed.")

    };

    render(){
        return (
            <div>
                <div className="page-header">
                    <h3>Register User</h3>
                </div>
                <div className="card" style={{width: "50rem"}}>
                    <div className="card-body">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">First Name</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="firstName"
                                    name="firstName"
                                    onChange={this.onFormFieldChanged}
                                    value={this.state.formData.firstName}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputLastName" className="col-sm-2 col-form-label">Last Name</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="lastName"
                                    name="lastName"
                                    onChange={this.onFormFieldChanged}
                                    value={this.state.formData.lastName}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    name="email"
                                    aria-describedby="emailHelp" 
                                    placeholder="name@example.com"
                                    onChange={this.onFormFieldChanged}
                                    value={this.state.formData.email}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password"
                                    name="password"
                                    onChange={this.onFormFieldChanged}
                                    value={this.state.formData.password}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPasswordConfirm" className="col-sm-2 col-form-label">Confirm Password</label>
                            <div className="col-sm-10">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    onChange={this.onFormFieldChanged}
                                    value={this.state.formData.passwordConfirm}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAvatarUrl" className="col-sm-2 col-form-label">Avatar</label>
                            <div className="col-sm-10">
                                <input 
                                    type="url" 
                                    className="form-control" 
                                    id="avatarUrl"
                                    name="avatarUrl"
                                    onChange={this.onFormFieldChanged}
                                    value={this.state.formData.avatarUrl}
                                />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            id="submit-button" 
                            onClick={this.onSubmit}
                            >Submit
                        </button>
                    </form>
                    </div>
                 </div>
                 
            </div>
            
        )


    }
};

export default RegisterForm;