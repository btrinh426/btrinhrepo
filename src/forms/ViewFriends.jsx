import React from "react";
import * as userService from "../services/userService";




class ViewFriends extends React.Component{
    state = {};

    onViewFriendsClick = (e) =>
    {
        userService.getFriends()
        .then(this.onGetFriendsSuccess)
        .catch(this.onGetFriendsError);
    }

    onGetFriendsSuccess = (response) => {
        console.log(response.data.item.pagedItems) 
      }
   
      onGetFriendsError= (response) => {
  
    console.warn({ error: response })
  }
    
    render(){
        let titleStyle = {
            marginRight: '1px',
            marginLeft: '630px',
            marginTop: '10px'
            
        }
        return (
            <React.Fragment>
            <div className="buttons" style={titleStyle}>
             <button 
             className="btn btn-primary btn-lg" 
             type="button"
             onClick={this.onViewFriendsClick} 
             style={{padding: 20}}>
                 Click To View Your Friends!</button>
             </div>
             <div className="row">
             <div className="col-md-12 p-5">
             <div className="card-group">
              <div className="card" >
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                  <button type="button" className="btn btn-success" style={{margin: "10px"}} >Edit</button>
                  <button type="button" className="btn btn-danger"style={{margin: "10px"}} >Delete</button>
                 </div>
              </div>
            </div>
            </div>
            </div>
            </React.Fragment>
        );
    }
}



















export default ViewFriends;