import React, { Component } from "react";
import userServices from "../services/userServices";
import { toast } from "react-toastify";

class Registration extends Component {

    state ={
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    }

    onInputChange = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;
        //console.log({ newValue, currentTarget });
      
        this.setState(() => {
         let newState = {};
      
         newState[inputName] = newValue;
      
         return newState;
        });
      
      };
      
      onRegistrationSuccess = response => {
         toast.success("Registration was successful")
      }
      
      onRegistrationError = response => {
         toast.error("You done goofed up now")
      }
      
      handleClick = () => {
         let payload = {
             "firstName": this.state.firstName,
             "lastName": this.state.lastName,
             "email": this.state.email,
             "password": this.state.password,
             "passwordConfirm": this.state.passwordConfirm,
             "avatarUrl": "https://res.cloudinary.com/teepublic/image/private/s--M-X253Zf--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1481688345/production/designs/946321_1.jpg",
             "tenantId": /*"U01TY0VT466"*/Math.random().toString(11).replace('0.', '')
         }
      
          userServices.register(payload)
          .then(this.onRegistrationSuccess)
          .catch(this.onRegistrationError)
      }

    render() {

        return (
            <div className="section">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="firstName"
                        onChange={this.onInputChange} 
                        value={this.state.firstName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        id="lastName"
                        name="lastName"
                        onChange={this.onInputChange} 
                        placeholder="Last Name"
                        value={this.state.lastName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        className="form-control" 
                        type="email" 
                        id="email"
                        name="email"
                        onChange={this.onInputChange} 
                        placeholder="Email"
                        value={this.state.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        id="password"
                        name="password"
                        onChange={this.onInputChange} 
                        placeholder="Password"
                        value={this.state.password}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        id="passwordConfirm"
                        name="passwordConfirm"
                        onChange={this.onInputChange} 
                        placeholder="Confirm Password"
                        value={this.state.passwordConfirm}
                    />
                </div>

                <button onClick={this.handleClick} type="button" className="btn btn-danger">Submit</button>
        </div>
        )
    }
}

export default Registration