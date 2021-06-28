import 'bootstrap/dist/css/bootstrap.min.css';
import React from"react";
import swal from 'sweetalert';
import * as UserService from "../services/serviceHelper"
// import toastr from 'reactjs-toastr';
// import 'reactjs-toastr/lib/toast.css';-
import {toast } from 'react-toastify';  

import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component
{   
     state = {  
         currentUser:{
        email: "",
        password: "",
        tenantId: "U01JS43TSAJ"
    }
}

    textValHandler = (e) =>
    {       
        let currentTarget= e.currentTarget;
        let inputName = currentTarget.name;
        let newVal = currentTarget.value;

    this.setState((a)=>{

let currentUser={...a.currentUser};

currentUser[inputName]= newVal;

console.log({currentUser})
        return {currentUser};
        // return {nUser:currentUser};

    })
  
        console.log(this.state)
       
    }
   

    captureData=(e)=> {
        e.preventDefault();      
        UserService.logIn(this.state.currentUser)
        .then(this.logInSubmitSuccess)
        .catch(this.logInSubmitError) 
        
    }

    logInSubmitSuccess= (result)=> {
      toast.success('Log In was Successful!')
    // swal({
    //    title: "User Logged In",
    //    text: "Login was successful!",
    //    icon: "success",
    //    button: "Good Job",
    //  });
   };
   logInSubmitError=(result)=>{  
       swal({
           title: "Some information was incorrect",
         text:""+result,
           icon: "error",
           button: "Retry",
         });
       console.log("Error",result)
    };
        render()
        {   
        return(

            <React.Fragment>                

  
       
       
        <div  style={{ margin:"", width: "40%", marginLeft:"40%", float:"center"}}>
        
        <form style={{ backgroundColor: 'white', width:"75%", border:"1px solid grey"}}>
        <div className="alert alert-primary" role="alert">
        <h2 style={{color:"white", textAlign:"center"}}>Welcome</h2>
</div> 
<div className=" text-muted"  style={{fontSize:".7em",textAlign:"center"}}>SIGN IN TO CONTINUE</div>
        <div style={{marginLeft:"5%"}}>
     
        
        <div>
        <br></br>
          <label style={{fontSize:".9em", marginLeft:"20%"}}>Email:</label>
        <br></br>        
          <input          
          type="text" 
          name="email"          
          onChange={this.textValHandler}
 value={this.state.currentUser.email}
        
           style={{fontSize:".9em", marginLeft:"20%"}}
           
           ></input>

          <br></br> <br></br>
          <label style={{fontSize:".9em", marginLeft:"20%"}}>Password:</label>
          <br></br>
          <input type="text" name="password"
          value={this.state.currentUser.password}
           onChange={this.textValHandler}
            style={{fontSize:".9em", marginLeft:"20%"}}></input>
         
          <br></br> <br></br>

          </div>
                
                   </div>
         
          <br></br>  
          <div style={{ margin: 'auto', width:"80%"}}>
          <button className="btn btn-primary btn-md btn-block" onClick={this.captureData}  >Login</button>          
          </div>

          <br></br><br></br>
          <div style={{textAlign:"center", fontSize:".8em"}} className=" text-muted">Need to Signup?</div>
         
         <a href="./userregister" className="btn btn-link btn-sm" style={{marginLeft:"35%"}} > Register Now</a> 
         <br></br>
        </form>
        
        </div>
        
        
        
        </React.Fragment>
);

}
}
export default Login;