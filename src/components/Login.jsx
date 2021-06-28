import React,{Component} from "react"
import {login} from "../services/appService";
import {NavLink,Route} from "react-router-dom";





class Login extends Component {

    state = {
        formData:{
            "email":""
            ,"password":""
            ,"tenantId":"U01LFUP9KB4"
        }
    };

    onFormFieldChanged = (e) =>
    {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;


        this.setState(()=>{
            let formData = {...this.state.formData};
            formData[inputName] = newValue;

            return {formData};
        })
    };

    handleClick = e => 
    {
        login(this.state.formData)
        .then(this.onLoginSuccess)
        .catch(this.onLoginError)
    };

    onLoginSuccess = (Response) => {
        
        console.log(Response)}
    onLoginError = (Response) => console.warn(Response)

    render(){
        return(
            <React.Fragment>
                
                 <form id="form2"/>
            <div className="mb-3"/>
                <label htmlFor="title" className="form-label">Sign In</label>
                <input type="email" className="form-control" name="email" 
                value={this.state.formData.email} onChange={this.onFormFieldChanged}aria-describedby="emailHelp" placeholder="Email"/>

           
            <div className="mb-3"/>

                <input type="password" className="form-control" name="password" placeholder="Password" 
                value={this.state.formData.password} onChange={this.onFormFieldChanged}/>
           
            
            <button id="signIn" type="submit" className="btn btn-primary" onClick={this.handleClick}>Sign In</button>
         
            
          
            <a href=" ">I forgot my password</a>
           <NavLink to="/register"><p>Register a new membership</p></NavLink>
        
            </React.Fragment>
        )
    }
}

export default Login;