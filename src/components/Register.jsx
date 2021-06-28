import React from "react";
import * as userService from "../services/userService";
import Swal from "sweetalert2";
import { toast, ToastContainer } from 'react-toastify';

class Register extends React.Component
{
    state = {
        formData: { firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    passwordConfirm: "",
                    avatarUrl: "",
                    tenantId: "U01E6LHFVGW"
                }
    };

    onFormFieldChange = (e) =>
    {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState(() => {
            let formData = {...this.state.formData};

            formData[inputName] = newValue;

            return {formData};
        });
    }

    onSubmitClicked = (e) =>
    {
        e.preventDefault();
        console.log(this.state.formData);

        userService.register(this.state.formData)
            .then(this.onRegisterUserSuccess)
            .catch(this.onRegisterUserError);
    }

    onRegisterUserSuccess = (response) =>
    {
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You were successfully registered!'
      })
    }

    onRegisterUserError = (errResponse) =>
    {
      console.warn(errResponse.data);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'You were not able to be registered!'
      })
    }

    render()
    {
        return (
            <main role="main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 p-5">
                            <div>
                                <h2 className="text-muted">User Register</h2>
                            </div>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="firstName"
                                        onChange={this.onFormFieldChange} 
                                        placeholder="Enter first name"
                                        value={this.state.formData.firstName} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="lastName"
                                        onChange={this.onFormFieldChange} 
                                        placeholder="Enter last name"
                                        value={this.state.formData.lastName} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address:</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="email"
                                        onChange={this.onFormFieldChange} 
                                        placeholder="Enter email address"
                                        value={this.state.formData.email} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name="password"
                                        onChange={this.onFormFieldChange}  
                                        placeholder="Password"
                                        value={this.state.formData.password}  
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordConfirm">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name="passwordConfirm" 
                                        onChange={this.onFormFieldChange} 
                                        placeholder="Confirm password"
                                        value={this.state.formData.passwordConfirm}  
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="avatarUrl">Avatar</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="avatarUrl" 
                                        onChange={this.onFormFieldChange} 
                                        placeholder="Enter avatar url" 
                                        value={this.state.formData.avatarUrl}
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    onClick={this.onSubmitClicked}
                                    >
                                        Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Register;