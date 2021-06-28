import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {register} from "../../services/UserService";
import { Link } from "react-router-dom";

class Register extends React.Component{
  state = {
    formData: { 
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "U01GYCKSGAV",
    }  
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue
       
      return { formData };
    })
  }

  onButtonClicked = (e) =>{
      e.preventDefault();
      register(this.state.formData)
      .then(this.onRegisterSuccess)
      .catch(this.onRegisterError)
  }
  onRegisterSuccess = (response)=>{
    toast.info("Successfully Registered", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    console.log(response);
  }
  onRegisterError = (errResponse)=>{
    toast.warning("FORM NOT SUBMITTED", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    console.log(errResponse)
  }

    render(){
        return(
            <React.Fragment>
            <div className="container"> 
            
               
              
              
            <div style={{ marginLeft: '8rem', padding: '8rem' }}> 
                <form>
               
                <h2>Register Here:</h2> 
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" name="firstName" id="firstName" placeholder="first name" onChange={this.onFormFieldChanged} value={this.state.formData.firstName} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" name="lastName" id="lastName" placeholder="last name" onChange={this.onFormFieldChanged} value={this.state.formData.lastName} />
                  </div>
                  <div className="form-group">
                  <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" id="email" placeholder="your email" onChange={this.onFormFieldChanged} value={this.state.formData.email} />
                  </div>
                  <div className="form-group">
                  <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password" placeholder="password" onChange={this.onFormFieldChanged} value={this.state.formData.password} />
                  </div>
                  <div className="form-group">
                  <label htmlFor="passwordConfirm"></label>
                    <input type="password" className="form-control" name="passwordConfirm" id="passwordConfirm" placeholder="confirm password" onChange={this.onFormFieldChanged} value={this.state.formData.confirm}/>
                  </div>
                  <div className="form-group">
                  <label htmlFor="avatarUrl">Enter an Avatar url</label>
                    <input type="url" className="form-control" name="avatarUrl" id="aavatarUrl" placeholder="avatar url" onChange={this.onFormFieldChanged} value={this.state.formData.avatar} />
                  </div>

                  <button type="submit" className="btn btn-primary" onClick={this.onButtonClicked}>Submit</button>
                  
                </form>
                <div style={{ marginTop: '1rem' }}> 
                <Link to="/Home">
                        <button className="btn btn-secondary">
                            Go Back &raquo;
                        </button>
                </Link>
                </div>
              </div>

              </div>
            

          
         
          </React.Fragment>
        )
    }
}
export default Register;

