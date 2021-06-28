import React from "react";
import Register from "../forms/Register";
import Login from "../forms/Login";
import Friends from "../forms/Friends"
import ViewFriends from "../forms/ViewFriends"
import {Route} from "react-router-dom";
import * as userService from "../services/userService";
import Widget from "../forms/Widget";





class SiteNave extends React.Component
{

  onTechButtonClick = (e) =>
  {
  
    this.props.history.push("/home.html");

}
  
onJobButtonClick = (e) =>
{
  this.props.history.push("/home.html");

}

onEventButtonClick = (e) =>
{
  this.props.history.push("/home.html");

}

    onRegisterClick = (e) =>
    {
      this.props.history.push("/register");
     
    }

    
    
    onLogOutClick = (e) =>
    {
      e.preventDefault();
      userService.logOut()
        .then(this.onlogOutSuccess)
        .catch(this.onlogOutError);
        this.props.history.push("/home.html");
        window.location.reload();
      }

    onlogOutSuccess = (response) => { console.log(response.data) }
 
    onlogOutError= (response) => {console.warn({ error: response });}

    returnHomeButtonClick = (e) =>
    {
      e.preventDefault();
      this.props.history.push("/home.html")
    }


    onBlogButtonClick = (e) =>
    {
      this.props.history.push("/home.html");
    }
    
    onFriendButtonClick = (e) =>
    {
      this.props.history.push("/friends");

    }

    onFriendsViewButtonClick = (e) =>
    {
      this.props.history.push("/friends.view");

    }

    onWidgetButtonClick = (e) =>
    {
      this.props.history.push("/widgets");

    }



    componentDidUpdate(prevProps)
    {
      let currentPath = this.props.location.pathname;
      let previousPath = prevProps.location.pathname;

      console.log({previousPath, currentPath});
    }

    
    
    render()
    {
      
      
        return(
        <React.Fragment>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark sabio">
          <button 
          type="button" 
          className="btn btn-outline-light" 
          style={{margin: 20}}
          onClick={this.returnHomeButtonClick}
          >
            Home
          </button>
           <button 
              type="button"  
              className="btn btn-secondary" 
              style={{margin: 20}} 
              onClick={this.onRegisterClick}>
                Register
                </button>
              <button 
              type="button" 
              className="btn btn-info" 
              style={{margin: 20}}
              onClick={this.onFriendButtonClick}>
                Friends
                </button>
                <button 
              type="button" 
              className="btn btn-info" 
              style={{margin: 20}}
              onClick={this.onFriendsViewButtonClick}>
                View Friends
                </button>
                <button 
              type="button" 
              className="btn btn-success" 
              style={{margin: 20}}
              onClick={this.onTechButtonClick}>
                Tech Companies
                </button>
                <button 
              type="button" 
              className="btn btn-primary btn-lg" 
              style={{margin: 20}}
              onClick={this.onWidgetButtonClick}>
                Widget
                </button>
                <button 
              type="button" 
              className="btn btn-success" 
              style={{margin: 20}}
              onClick={this.onJobButtonClick}>
                Jobs
                </button>
                <button 
              type="button" 
              className="btn btn-outline-light my-2 my-sm-0" 
              style={{margin: 20}}
              onClick={this.onJobButtonClick}>
                Events
                </button>
              <button 
              type="button" 
              className="btn btn-info" 
              style={{margin: 20}}
              onClick={this.onBlogButtonClick}>
                Blogs
                </button>
              <button
                className="btn btn-outline-danger my-2 my-sm-0"
                type="submit" 
                style={{margin: 20}}
                onClick={this.onBlogButtonClick}>
                Log Out
              </button>
              </nav>

        <Route path="/friends" exact={true} component={Friends}/>
        <Route path="/register" exact={true} component={Register}/>
        <Route path="/home.html" exact={true} component={Login}/>
        <Route path="/friends.view" exact={true} component={ViewFriends}/>
        <Route path="/widgets" exact={true} component={Widget}/>


        </React.Fragment>
        )
    }
}














export default (SiteNave);