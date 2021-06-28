import React from "react";
import * as userServices from "../services/userServices"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Footer from "./Footer.jsx";

class Register extends React.Component
{
    state ={
        formData: {
            "firstName": "" ,
            "lastName": "" ,
            "email": "" ,
            "password": "" ,
            "passwordConfirm": "" ,
            "avatarUrl": "" ,
            "tenantId": "U017V0HP8A2"
        }
    };

    toastrOptions = {
        position: toast.POSITION.BOTTOM_RIGHT,
        showDuration: 500,
        timeOut: 1000,
    };
    onRegisterClicked = e =>
    {
        console.log("registering here...");
        console.log(e);
        console.log(this.state);
        var newState = {...this.state.formData}
        e.preventDefault();
        var newUserInfo = JSON.stringify(newState);

        userServices.createNewUser(newUserInfo)
            .then(this.onNewUserSuccess)
            .catch(this.onNewUserError);
    };

    onNewUserSuccess = response => {

        console.log("Registration success!")
        console.log(response)
        toast.success(
            "You're Registered! Please log in", 
            this.toastrOptions
            );
        this.props.history.push("/login")
      };
    
    onNewUserError = response => {
    
        console.log("Registration failed")
        console.log(`${response}`)
        toast.error(
            `Failed to register.Try again later`, 
            this.toastrOptions
            );
    
      };


    onFormFieldChanged = (e) =>
    {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = e.currentTarget.name;
    

        this.setState((prevState)=>{
            let formData = {...prevState.formData};

            formData[inputName] = newValue;
            console.log({ formData })


            return { formData };

        })
    }


    render()
    {
        return (
            
            <React.Fragment>
                <div className="container register">
                    <h1 className="component-header">Register</h1>
                    <form className="form">
                        
                        <div className="form-group">
                            <label htmlFor="first-name">First Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="first-name" 
                                name="firstName" 
                                value={this.state.formData.firstName} 
                                placeholder="Enter First Name" 
                                onChange={this.onFormFieldChanged} 
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="last-name">Last Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="last-name" 
                                name="lastName" 
                                value={this.state.formData.lastName} 
                                placeholder="Enter Last Name"
                                onChange={this.onFormFieldChanged}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" name="email" 
                                value={this.state.formData.email} 
                                placeholder="Enter Email" 
                                aria-describedby="emailHelp" 
                                onChange={this.onFormFieldChanged}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                name="password" 
                                value={this.state.formData.password} 
                                placeholder="Enter Password" 
                                aria-describedby="passwordHelp"
                                onChange={this.onFormFieldChanged} 
                                required
                            />
                            <small id="passwordHelp" className="form-text text-danger">
                                Must include an uppercase character, a number, and a special character
                            </small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="confirm-password" 
                                name="passwordConfirm" 
                                value={this.state.formData.passwordConfirm} 
                                placeholder="Confirm Password"
                                onChange={this.onFormFieldChanged} 
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="avatar-url">Image for your Avatar</label>
                            <input 
                                type="url" 
                                className="form-control-file" 
                                id="avatar-url" name="avatarUrl" 
                                value={this.state.formData.avatarUrl} 
                                placeholder="Avatar Url" 
                                aria-describedby="avatarHelp"
                                onChange={this.onFormFieldChanged} 
                                required
                            />
                            <small id="avatarHelp" className="form-text text-danger">
                                Must be url of a picture
                            </small>
                            </div>

                        <br/>
                        
                        <button 
                            id="submit" 
                            type="submit" 
                            className="btn btn-primary" 
                            onClick={this.onRegisterClicked}
                        >
                            Register
                        </button>

                    </form>
                    <hr/>
                </div>
                <Footer/>
                <br/>
            </React.Fragment>   
                
        
           
        )
    };
};

export default Register;