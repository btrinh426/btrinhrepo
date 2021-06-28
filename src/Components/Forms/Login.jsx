import React from "react";
import { logIn } from "../../services/UserService";
import { toast } from 'react-toastify';

   
class Login extends React.Component{

    state = {
        user: {
        email: "",
        password: "",
        tenantId:"U01GYCKSGAV",
        }  
      }
    
      onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;
    
        this.setState(() => {
          let user = { ...this.state.user };
          user[inputName] = newValue 
          return {user};
        })
      }

    onButtonClicked = (e) =>{
        e.preventDefault();
        const data = (this.state.user);
        logIn(data)
        .then(this.onLoginSuccess)
        .catch(this.onLoginError);
      }


      onLoginSuccess = (response)=>{
        toast.success("Login Successful", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        this.props.history.push('/Home')
        console.log(response); 
      }
      onLoginError = (errResponse)=>{
        toast.warning("Unsuccessful Login", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        console.log(errResponse)
      }



    render(){
        return(
          
            <div className="container">
              <div style={{ marginLeft: '8rem', padding: '8rem' }}> 
           
            
            <h5>Login:</h5>
            <form id="formRegister">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="enter your email" onChange={this.onFormFieldChanged} value={this.state.user.email} />
              </div>
              <div className="form-group"> 
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="enter the password" onChange={this.onFormFieldChanged} value={this.state.user.password} />
              </div> 
                <button id="login" type="submit" className="btn btn-primary mx-6" onClick={this.onButtonClicked}>Login</button>

              </form>
              </div>
            </div>
           
        )
    }
}
export default Login