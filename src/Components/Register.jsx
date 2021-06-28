import React from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";



class Register extends React.Component {
    state = {
        newUser:{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            tenantId: "UKEU4037",
            avatarUrl: "http://www.justlandedcouriers.com/wp-content/uploads/2018/06/login-user-icon.png"
        },
    }
    
    onRegisterChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState((prevState) => {
            let newUser = { ...prevState.newUser };
            newUser[inputName] = newValue;
            return { newUser }
        })
    }; 

    onSubmit = () => {
        let payload = {...this.state.newUser}

        userService
            .userRegister(payload)
            .then(this.onSubmitSuccess)
            .catch(this.onSubmitError)
    }
    
    onSubmitSuccess = (response) => {
        console.log(response);
        toast.success("New Account Created!", {
            position: "top-right",
            pauseOnHover: true,
            draggable: true,
            closeOnClick: true,
        });   
    };

    onSubmitError = (response) => {
        console.warn( response.messages);
        toast.success("Submission Failed", {
            position: "top-right",
            pauseOnHover: true,
            draggable: true,
            closeOnClick: true,
        });   
    };
    
    render(){
        return (
            <div className="m-container">
                <h1>Register</h1>
            
             <div className="m-container">
                    <form onSubmit={this.submitForm}>  
                     <div>
                        <div className="col-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                             
                         <input
                            type='text'
                            className='form-control'
                            name='firstName'
                            aria-describedby='emailHelp'
                            placeholder='Keanu'
                            onChange={this.onRegisterChanged}
                            value={this.state.firstName}
                            />
                            </div> 
                      </div>
                      <div>
                      <div className="col-3">
                        <label htmlFor="lName">Last Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='lastName'
                            aria-describedby='emailHelp'
                            placeholder='Reeves'
                            onChange={this.onRegisterChanged}
                            value={this.state.newUser.lastName}
                            /></div>   
                        
                      </div>     
                        <div>
                        <div className="col-3">
                            <label htmlFor="email">Email</label>
                            <input
                              type='text'
                              className='form-control'
                              name='email'
                              placeholder='Enter Email'
                              onChange={this.onRegisterChanged}
                              value={this.state.newUser.email}
                            /></div> 
                            
                        </div>
                        <div>
                          <div className="col-3">
                            <label htmlFor="exampleInputPassword1">
                            Password
                        </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name='password' 
                            placeholder="********"
                            onChange={this.onRegisterChanged}
                            value={this.state.newUser.password} 
                        /></div> 
                        
                        </div>
                        <div>
                        <div className="col-3">
                            <label htmlFor="exampleInputPassword1">
                            Confirm Password
                        </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name='password' 
                            placeholder="********"
                            onChange={this.onRegisterChanged}
                            value={this.state.newUser.confirmPassword} 
                        /></div> 
                        <p className="p-1"></p>
                        </div>
                        <div className="col-3">
                        <button 
                            type="button" 
                            className="btn btn-primary btn-lg" 
                            onClick={this.onSubmit}>Create Account
                        </button>
                        <div className="p-3 bg" />
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;