import React from"react";
import {NavLink} from "react-router-dom"
import * as UserServices from "../services/AxiosService"

class NavC extends React.Component
{
    state={
        name:"",
        avUrl:"http://www.small-icons.com/stock-icons/small-people/unknown_person.gif"
            }
        
            componentDidMount() {
                this.getCurrentUser();
              }
        
            getCurrentUser=()=>
        {   
            UserServices.userCurrent()
            .then(this.getCurrentSuccess)
        }
        
        getCurrentSuccess=(response)=>{
            // console.log(response.data.item);
            
            let userID=response.data.item.id;
            // console.log(userID);
            UserServices.getUserId(userID)
            .then(this.getIdSuccess)
        }
        
        getIdSuccess=(response)=>
        {
            // console.log(response.data.item)
            let cname = `${response.data.item.firstName} ${response.data.item.lastName}`
            let userUrl =response.data.item.avatarUrl
           
            this.setState({name:cname})
            this.setState({avUrl:userUrl})
            console.log(this.state.name)
        }
        

    render()
{
    
    return( 
       

       <div  style={{ margin:"0", width: "22rem"}}>
       <form style={{ backgroundColor: 'white', width:"60%", border:"1px solid grey", margin:"", height:"100vh", borderRadius:"1%"}}>
       <div className="alert alert-primary" role="alert">
       <h5 style={{color:"white", textAlign:"center"}}>Sabio Warmup</h5>
</div> 

<div style={{textAlign:"center"}} ><img alt="" src={this.state.avUrl} 
style={{borderRadius:"50%", boxShadow:"8px -1px 5px #ccc"}} ></img></div>
<div className=" text-muted"  style={{fontSize:".8em",textAlign:"center"}}>
    Hello, {this.state.name}</div>

<ul className="" style={{fontSize:".9em", color:"red", float:"center", marginLeft:"15%"}}>
<br></br><br></br>

<NavLink to="/friends"> 
   <li className="li " style={{backgroundColor:"#737373 ", color:"powderblue"}}>Friends</li>
   </NavLink>
   <br></br>
   <NavLink to="/cars"> 
   <li className="li " style={{backgroundColor:"#737373 ", color:"powderblue"}}>Cars</li>
   </NavLink>
   <br></br>
   <NavLink to="/blogs"> 
   <li className="li btn-link" style={{backgroundColor:"#737373", color:"wheat"}}>Blogs</li>
   </NavLink>
   <br></br>
   <NavLink to="/companies"> 
   <li className="li  btn-link" style={{backgroundColor:" #737373", color:"powderblue"}}>Tech companies</li>
   </NavLink>
   <br></br>
   <NavLink to="/jobs"> 
   <li className="li btn-link" style={{backgroundColor:"#737373", color:"wheat"}}>Jobs</li>
   </NavLink>
   <br></br>
   <NavLink to="/events"> 
   <li className="li btn-link onclick={this.show}" style={{backgroundColor:"#737373", color:"powderblue"}}>Events</li>
   </NavLink>
   <br></br>
   <NavLink to="/userregister"> 
   <li className="li btn-link" style={{backgroundColor:"#737373", color:"wheat" }}>Register </li>
   </NavLink>
   <br></br>
   <NavLink to="/userform"> 
   <li className="li btn-link" style={{backgroundColor:"#737373", color:"powderblue" }}>Product Info Form </li>
   </NavLink>
</ul>


         <br></br><br></br>
         {/* <br></br><br></br><br></br><br></br><br></br><br></br><br></br> */}
         <div style={{textAlign:"center", fontSize:".6em"}} className=" text-muted">Need to Signup?</div>
         
        <div style={{textAlign:"center", fontSize:".7em"}} ><a href="./userregister" className="btn btn-link btn-sm" > Register Now</a></div> 
       
       </form>
       
       </div>
       
      
       

       )
    }
    }
    
    export default NavC;