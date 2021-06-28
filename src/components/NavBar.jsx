import React from "react";
import { NavLink,withRouter} from "react-router-dom";
import * as UserService from"../services/AxiosService"
import {toast } from 'react-toastify'; 

 class NavBar extends React.Component
{
    
    logOut=()=>{        
        UserService.userLogOut()
        .then(this.logOutSuccess)
        .catch(this.logOutError)
                   }

    logOutSuccess =(result)=>
    { this.props.history.push("/login")
        console.log("Success ",result)
        toast.success('User was Logged Out!');
      
    }

    logOutError =(result)=>
    {toast.error('User Already Logged Out!');  
    this.props.history.push("/login")
    }
    render(){
    return (
         
     <nav className="navbar navbar-dark " style={{paddingBottom:"-5px",height:"45px",  width:"",backgroundColor:" rgb(0, 184, 230)"}}>
              <div style={{width:"95vw",height:"45px"}}>
                  <span  style={{paddingRight:"30px"}} >
<button className="btn btn-link btn-sm" style={{fontSize:".8rem", padding:"-1%"}} ><NavLink  to="/home" style={{color: 'ButtonHighlight'}}  > 
<img src="

https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/545a691a-1ec2-4596-9acc-57d49f2c151f/d2x97wc-1e1e634a-c7fc-4461-83cb-1a4ca1ee4371.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNTQ1YTY5MWEtMWVjMi00NTk2LTlhY2MtNTdkNDlmMmMxNTFmXC9kMng5N3djLTFlMWU2MzRhLWM3ZmMtNDQ2MS04M2NiLTFhNGNhMWVlNDM3MS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.91RAne80uPlzzD-jlKbE6L7kZvaFc1ssjxP-xQjmNv8
"

alt="" style={{width:"27px", height:'25px'}}></img> Home Page </NavLink></button>
</span>


<img src="
https://toppng.com/uploads/preview/form-icon-icon-fill-the-form-11553518237ivbjdgs9as.png

"
alt="" style={{width:"22px", height:'21px'}}></img>

<span  style={{paddingRight:"30px"}} >
<button className="btn btn-link btn-sm" style={{}} >


    <NavLink to="/friendforms" style={{color: 'ButtonHighlight'}}>Friend Profile Form</NavLink></button>
</span>

<div style={{paddingRight:"0px",float:"right", marginLeft:"", marginRight:"6%"}}>
  <form className="form-inline my-2 my-md-0"  style={{width:"170%"}}>
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          aria-label="Search"
          style={{fontSize:".7em", width:"38%"}}
        />
        <button
          className="btn btn-primary btn-sm"
          type="submit"
          style={{width:"10%"}}    
        >
          <span style={{textAlign:"right",color:"blue"}} >Search</span>
          
        </button>
     
  <span style={{marginLeft:"0px"}}  >
<button className="btn btn-link btn-sm" style={{fontSize:".8rem", padding:"-1%",marginRight:"5px"}}  ><NavLink  to="/login" style={{color: 'ButtonHighlight'}} >


<img type="button" src="



https://cdn3.iconfinder.com/data/icons/UltimateGnome/256x256/actions/gnome-session-logout.png

" alt=""
style={{width:"26px", height:'25px',marginBottom:"3px",  padding:"-1.5%"}}>
      
</img>


       {} User Login </NavLink></button>
       </span>


       <span style={{fontSize:".7rem"}} onClick={this.logOut} >
<NavLink to="/home"  style={{color:"ButtonHighlight"}}> 

    <img type="button" src="
https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/38-512.png
" alt=""
style={{width:"26px", height:'25px', marginBottom:"5px"}} >
      
</img>User Logout
 </NavLink> 
</span>
</form>
</div>






{/* <span  style={{paddingRight:"30px"}} >
<button className="btn btn-link btn-sm"style={{}}>
<img src="

https://www.freeiconspng.com/uploads/register-button-png-0.png
"

alt="" style={{width:"27px", height:'25px', marginBottom:"3px"}}></img>
    <NavLink  to="/userregister"  style={{color:"ButtonHighlight"}}> User Register </NavLink></button>
</span> */}



</div>
</nav>
   
    );
}
}

export default withRouter(NavBar);