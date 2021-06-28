import React from "react";
import * as UserService from "../services/AxiosService"
import swal from 'sweetalert';

class RegisterB extends React.Component
{
    
    constructor(props) {
        super(props);
        this.state = { 
            firstName: "",
            "lastName": "",
            "email": "",
            "password": "",
            "passwordConfirm": "",
            "avatarUrl": "",
            "tenantId": "U01JS43TSAJ"
        };

      }
      textValHandler = (event) => {
        //   let gitUsername=  this.setState({gitUsername: event.target.value}); 
         
        let nam = event.target.name;
        let val = event.target.value;
            this.setState({[nam]: val});
        
        
           }
            captureData=(e)=> {
                e.preventDefault();
                        console.log("The link was clicked.");
                        UserService.register(this.state)
                        .then(this.registerSubmitSuccess)
                        .catch(this.registerSubmitError)                        
                         }
                         registerSubmitSuccess= (result)=> {console.log("Success ",result)
                         swal({
                            title: "Account Registered",
                            text: "Your information was submitted successfully!",
                            icon: "success",
                            button: "Good Job Finish",
                          });
                        };
                         registerSubmitError=(result)=>{
                           
                            swal({
                                title: "Error, some information was incorrect",
                                text:""+ result,
                                icon: "error",
                                button: "Retry",
                              });
    
                            console.log("Error ",result)};



                        
      render()
      {   
      return(

<div >
        <div style={{marginLeft:"20%", float:"center", width:"90%"}}>
        <br></br>       
               
        <form style={{padding:"30px",  backgroundColor: 'white', width:"50%", border:"2px solid grey", margin:"auto", borderRadius:"3%" }}>
        <hr style={{width:"90%", backgroundColor:"powderblue"}}></hr>
    <div style={{textAlign:"center",backgroundColor:"grey",color:"white", borderRadius:"50%",width:"50%",margin:"auto"}}><br></br><h4 > Registration Form:</h4>
    <br></br></div>
    
    <hr style={{width:"90%", backgroundColor:"powderblue"}}></hr>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 2fr)", gridGap: 1 }}>
        <div></div>
        <div >
        <label>First Name:</label>
        <br></br>
          <input type="text" name='firstName' onChange={this.textValHandler} ></input>
           <br></br><br></br>
          
           
          <label>Last Name:</label>
          <br></br>
          <input type="text" name="lastName" onChange={this.textValHandler}></input>
          <br></br><br></br>
         
          <label>Email:</label>
        <br></br>        
          <input type="text" name="email" onChange={this.textValHandler} ></input>

          <br></br> <br></br>
        
        {/* <label>Tenant Id (Min Length 2):</label>
        <br></br>
        <input type="text" name="tenantId" onChange={this.textValHandler}></input> */}

          </div>
          <hr  style={{width: 2, height: 220, backgroundColor: 'powderblue'}}></hr>
        
          <div className="columnB">       
                   
          <label>Password:</label>
          <br></br>
          <input type="text" name="password" onChange={this.textValHandler}></input>
         
          <br></br> <br></br>

        <label >Password Confirm:</label>
        <br></br>
        
          <input type="text" name="passwordConfirm" onChange={this.textValHandler} ></input>
           <br></br> <br></br>
        
          <label>Avatar Url:</label>
          <br></br>
          <input type="text" name="avatarUrl" onChange={this.textValHandler}></input>
      
          </div>
          </div>
         
          <br></br> <br></br>
          <span style={{float: 'right', paddingRight:"18%"}}>
          <button className="btn btn-primary btn-md" onClick={this.captureData}  >Submit Form</button>          
          </span>
         
          <br></br>  
        </form>
        <br></br><br></br>
        </div>
        
        </div>
        
        );

}
}
export default RegisterB;