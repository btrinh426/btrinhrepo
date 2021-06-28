import React, { Component } from "react";
import {getFriends} from "../services/appService"
import SingleFriend from "./SingleFriend";

class Friends extends Component{

    componentDidMount(){
        getFriends()
        .then(this.onGetFriendsSuccess)
        .catch(this.onGetFriendsError)

       
       
    }

    state ={
        friend:{
            "title":""
            ,"bio":""
            ,"summary":""
            ,"headline":""
            ,"slug":""
            ,"statusId":""
            ,"primaryImage":""
        }
    }

    onGetFriendsSuccess = (response) => 
    {
        let friends = response.data.item.pagedItems;
        this.setState((preState)=>
        {
            return {mappedFriends:friends.map(this.mapFriend)};
        })
        
        console.log(friends);
    };
    onGetFriendsError = (response) => console.warn(response);

    onFriendDeleteClick = (e) => 
    {
        // e.preventDefault();
        console.log(e)
    };

    mapFriend = (friend) =>
    {
        return(
            <React.Fragment key={friend.id}>
                <SingleFriend friend ={friend}
                onClick={this.onFriendDeleteClick}></SingleFriend>
           
          
              </React.Fragment>
        )
    }


    render(){
        return(
            <React.Fragment>
               
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"/>
            <div className="container-flu   id"/>
                <a className="navbar-brand" href=" ">Friends</a>
                <a href="addEditFriend.html" id="addFriend" className="btn btn-outline-success" type="submit">+Friend</a>
                <form className="d-flex"/>
                    <input className="form-control me-2" type="search" placeholder="Search friends" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button> */}

                  
                    <div className="card w-20">
                        {this.state.mappedFriends}
                    </div>
                    
   
            </React.Fragment>
        )
    }
};

export default Friends;