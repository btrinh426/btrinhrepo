import React from "react";
import * as userService from "../services/userService";





class Register extends React.Component
{
    state = {
        formData: {
        firstName: "", 
        lastName: "", 
        email: "",
        password: "",
        passwordConfirm: "",
        avatarUrl: "",
        tenantId: ""
    }
    }
    
    
    onFormFieldChange = (e) =>
    {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;


        this.setState( () =>
        {

            let formData = {...this.state.formData};

            formData[inputName] = newValue;

            return {formData};
        }


        )
    
    }

    
    registerButtonClicked = (e) =>
    {
        e.preventDefault();
        
       
        
        userService.register(this.state.formData)
        .then(this.onRegisterSuccess)
        .catch(this.onRegisterError);
       
    }
    
    onRegisterSuccess = (response) => {
          console.log(response.data) 
        }
     
    onRegisterError= (response) => {
    
      console.warn({ error: response })
    }

    
    render()
    {
        let styles = {
            marginRight: '520px',
            marginLeft: '480px',
            marginTop: '10px'
            
        }
        let titleStyle = {
            marginRight: '520px',
            marginLeft: '580px',
            marginTop: '10px'
            
        }
        return(
            <React.Fragment>     
        
        
        <h1 style={titleStyle}>Register!</h1>
        <form style={styles}>
        <div className="col-auto" >
          <label className="visually-hidden"  htmlFor="autoSizingInput">First Name</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.firstName} 
          name="firstName"
          id="firstName" 
          placeholder="Jane" 
          />
        
          <label className="visually-hidden" htmlFor="autoSizingInput">Last Name</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.lastName} 
          name="lastName"
          id="lastName" 
          placeholder="Doe" 
          />
        
          <label className="visually-hidden" htmlFor="autoSizingInput">Email</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.email} 
          name="email"
          id="email" 
          placeholder="@example.com" 
          />
       
          <label className="visually-hidden" htmlFor="autoSizingInput">Password</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.password} 
          name="password"
          id="password" 
          placeholder="password" 
          />
        
          <label className="visually-hidden" htmlFor="autoSizingInput">Confirm Password</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.passwordConfirm} 
          name="passwordConfirm"
          id="passwordConfirm" 
          placeholder="confirm password" 
          />
        
          <label className="visually-hidden" htmlFor="autoSizingInput">Avatar</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.avatarUrl} 
          name="avatarUrl"
          id="avatarUrl" 
          placeholder="avatar url" />

          <label className="visually-hidden" htmlFor="autoSizingInput">Tenant Id</label>
          <input 
          type="text" 
          className="form-control" 
          style={{marginBottom: 10}} 
          onChange={this.onFormFieldChange}
          value={this.state.formData.tenantId} 
          name="tenantId"
          id="tenantId" 
          placeholder="tenant id" />
        
          <button type="submit" className="btn btn-primary" style={{marginTop: 5}} onClick={this.registerButtonClicked} >Submit</button>
        </div>
      </form>
          </React.Fragment>

           
        );
    }
}

export default Register;