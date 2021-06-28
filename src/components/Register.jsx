import React, { Component } from "react";
import {postUser} from "../services/appService";
import {toast} from "react-toastify";
import { NavLink } from "react-router-dom";


class Register extends Component {

    

    state = {
       formData:{"firstName":""
       ,"lastName":""
       ,"email":""
       ,"password":""
       ,"passwordConfirm":""
       ,"avatarUrl":""
       ,"tenantId":"U01LFUP9KB4" } 
    };

    onFormFieldChanged = (e)=> 
    { 
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;
        //console.log(newValue)

        this.setState(()=>{
            let formData ={...this.state.formData};
            formData[inputName] = newValue;
          console.log(formData)
            return {formData};
            
        })
        
    }

    handleClick = e => {
        e.preventDefault();
          postUser(this.state.formData)
        .then(this.onPostUserSuccess)
        .catch(this.onPostUserError)
     }
 
     onPostUserSuccess= (Response) =>{
         toast.success(`Welcome ${this.state.formData.firstName} Registration was successful`)
         console.log(Response)
     };
     onPostUserError = (Response) =>{
         toast.error("Please fill out form correctly")
     };

    render(){
    return (
    <React.Fragment>
        <form id="formOne"/>
            <div className="mb-3"/>
                <label htmlFor="exampleInputEmail1" className="form-label">Register a new membership</label>
                <input type="text" className="form-control" id="firstName" name="firstName"
                    placeholder="First Name" value = {this.state.formData.firstName} onChange={this.onFormFieldChanged}/>

           
            <div className="mb-3"/>

                <input type="text" className="form-control"  placeholder="Last Name" name="lastName" 
                value={this.state.formData.lastName} onChange={this.onFormFieldChanged}/>
           
            <div className="mb-3"/>

                <input type="email" className="form-control" name="email" placeholder="Email"
                value={this.state.formData.email} onChange={this.onFormFieldChanged}/>
           
            <div className="mb-3"/>

                <input type="password" className="form-control" name="password" placeholder="Password"
                value={this.state.formData.password} onChange={this.onFormFieldChanged}/>
            
            <div className="mb-3"/>

                <input type="password" className="form-control" name="passwordConfirm" placeholder="Retype Password"
                value={this.state.formData.rePassword} onChange={this.onFormFieldChanged}/>
            
             
             <div className="mb-3"/>

                <input type="text" className="form-control" name="avatarUrl" placeholder="Avatar URL"
                value={this.state.formData.avatar} onChange={this.onFormFieldChanged}/>
           
            <div className="mb-3 form-check"/>
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1"><b/><strong>I agree to the <a href=" ">terms</a></strong></label>
          
            <button id="register2" type="submit" className="btn btn-primary" onClick={this.handleClick}>Register</button>
           <NavLink to="/login"> <p>Already have an account?</p></NavLink>
     
    </React.Fragment>
        
        
    );
    }
}

export default Register