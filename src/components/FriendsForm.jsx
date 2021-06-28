import React from "react"
import * as Userservices from"../services/AxiosService"
import * as Responseservices from"../services/serviceHelper"



class FriendsForm extends React.Component
{

    state=
    
    {
        currentFriend:{
          "title": "",
  "bio": "bio",
  "summary": "",
  "headline": "",
  "slug": "",
  "statusId": 1,
  "primaryImage": ""
        }
    }

textValHandler=(e)=>
{
let currentTarget = e.currentTarget;
let currentVal = currentTarget.value;
let currentName=currentTarget.name;

this.setState((a)=>
  {
let currentF={...a.currentFriend};
currentF[currentName]=currentVal;
return {currentFriend:currentF};
  })
}

onSubmit=()=>
{
 
}
submitRecord=(e)=>
{
  e.preventDefault();   
  Userservices.friendSubmit(this.state.currentFriend)
  .then(Responseservices.onGlobalSuccess)
  .catch(Responseservices.onGlobalError)

}

    render()
    {
return(
    <div style={{marginLeft:"20%"}}>
      
<form  style={{width:"50%",margin:"auto", border:"solid 2px grey", backgroundColor:"white", borderRadius:"3%"}}>

  <div className="form-group">
  <hr style={{width:"90%", backgroundColor:"powderblue"}}></hr>
    <div style={{textAlign:"center",backgroundColor:"#668cff",color:"white", borderRadius:"50%",width:"50%",margin:"auto"}}><br></br><h4 > Friend Profile</h4>
    <br></br></div>
    
    <hr style={{width:"90%", backgroundColor:"powderblue"}}></hr>
    <div className=" text-muted"  style={{fontSize:".7em",textAlign:"center"}}>Enter Friend Details Here:</div>

    <label className="text-muted" style={{fontSize:".8em", marginLeft:"5%"}}>Title:</label>
    <input type="text" className="form-control"
     name="title"
     value={this.state.currentFriend.title}
     onChange={this.textValHandler}    
    placeholder="Mr. MS. Mrs."
    style={{width:"40%", fontSize:".8em", marginLeft:"5%"}}
    ></input>
  </div>
  
<div>
  <label className="text-muted" style={{fontSize:".8em" , marginLeft:"5%"}}>Bio</label>
    <textarea 
    type="text" className="form-control"
     name="bio"
     value={this.state.currentFriend.bio}
     onChange={this.textValHandler}    
    placeholder="Bio"
    style={{width:"80%", fontSize:".8em", marginLeft:"5%"}}
    ></textarea>
  </div>
  
 

  <div className="form-group">
    <label className="text-muted" style={{fontSize:".8em" , marginLeft:"5%"}}>Summary:</label>
    <input type="text" className="form-control"
     name="summary"
     value={this.state.currentFriend.summary}
     onChange={this.textValHandler}    
   
    style={{width:"80%", fontSize:".8em", marginLeft:"5%"}}
    ></input>
  </div>

  <div className="form-group">
    <label className="text-muted" style={{fontSize:".8em", marginLeft:"5%"}}>Headline:</label>
    <input type="text" className="form-control"
     name="headline"
     value={this.state.currentFriend.headline}
     onChange={this.textValHandler}    
   
    style={{width:"80%", fontSize:".8em", marginLeft:"5%"}}
    ></input>
  </div>
  <div className="form-group">
    <label className="text-muted" style={{fontSize:".8em", marginLeft:"5%"}}>Slug:</label>
    <input type="text" className="form-control"
     name="slug"
     value={this.state.currentFriend.slug}
     onChange={this.textValHandler}    
    placeholder="www.yourwebsite.com"
    style={{width:"80%", fontSize:".8em", marginLeft:"5%"}}
    ></input>
  </div>
  <div className="form-group">
    <label className="text-muted" style={{fontSize:".8em", marginLeft:"5%"}}>Status</label>
    <input type="text" className="form-control"
     name="statusId"
     value={this.state.currentFriend.statusId}
     onChange={this.textValHandler}    
    
    style={{width:"80%", fontSize:".8em", marginLeft:"5%"}}
    ></input>
  </div>
  {/* <div className="form-group">
    <label className="text-muted" style={{fontSize:".8em", marginLeft:"5%"}}>Skills:</label>
    <input type="text" className="form-control"
     name="Skills"
     value={this.state.currentFriend.Skills}
     onChange={this.textValHandler}    
    placeholder="React, .Net, MangoDB"
    style={{width:"80%", fontSize:".8em", marginLeft:"5%"}}
    ></input>
  </div> */}

  <div className="form-group">
    <label className="text-muted" style={{fontSize:".6em", marginLeft:"5%"}}>Image URL:</label>
    <input type="input" className="form-control"
     name="primaryImage"
     value={this.state.currentFriend.primaryImage}
     onChange={this.textValHandler}        
    style={{width:"80%", fontSize:".8em", marginLeft:"5%"}}
    ></input>
  </div>


<button type="button" className="btn btn-primary btn-sm btn-block" onClick={this.submitRecord}>Submit Record</button>
<br/>
  
  

</form>

    </div>


)

    }
}

export default FriendsForm;