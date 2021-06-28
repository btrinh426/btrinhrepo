import React from "react";
import NavBar from "./NavBar";
import "./css/NavBar.css";
import * as friendService from "../services/friendService";
// import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css'


class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: this.showMyFriends()
        };
    }


   
    showMyFriends = () => {
        friendService.showFriends(0,5)
            .then(this.showFriendsSuccess)
            .catch(this.showFriendsError)
    };

    showFriendsSuccess = response => {
        console.log(response)
        console.log(response.data.item.pagedItems)
        this.setState( {friends: response.data.item.pagedItems})     
    }


    showFriendsError = response => {console.error(response)}

    mapFriend = (friend) => { //take the card and make it its own component that accepts the id url title and bio as props
        return(   
            <div className="card m-3" key={`friend-${friend.id}`}>
                <img className="card-img-top w-25 h-25 rounded-circle mx-auto" src={friend.primaryImage.imageUrl} alt="user profile" />
                <div className="card-body">
                  <h5 className="card-title text-center font-weight-bold">{friend.title}</h5>
                  <p className="card-text text-center">{friend.bio}</p>
                </div>
                <div className="mx-auto pb-4">
                  <button id="editBtn" className="btn btn-primary">edit</button>
                  <button id="deleteBtn" className="btn btn-danger">delete</button>
                </div>
            </div>           
        )
    }

    
    

    render() {
        return (
            <>
                <NavBar></NavBar>
                <div className="mx-auto mt-5 col-lg-8">
                    <h3 className="text-center">People</h3>
                    <form className="form-inline my-2 my-lg-0 float-right ">
                        <input className="form-control mr-sm-2" id="searchBar" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-info my-2 my-sm-0 search" type="button">Search</button>
                    </form>
                    <div className="btn btn-outline-info ">
                        <a href="/">Add friend</a>
                    </div>
                    <div id="card-container" className="container mx-auto mt-5"> 
                        <div className="row">
                        
                        </div>
                    </div>
                    <div className="pagination fixed-bottom mb-5 justify-content-center">

                    </div>
                </div>     
         
            </>
            
            
        )
    }
}

export default People;