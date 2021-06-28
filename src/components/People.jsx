import React from "react";
import NavBar from "./NavBar";
import "./css/NavBar.css";
import * as friendService from "../services/friendService";
// import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css'
import SingleFriend from "./SingleFriend";



class People extends React.Component {

    state = {}

    componentDidMount() {
        this.showMyFriends()
    }

    showMyFriends = () => {
        friendService.showFriends(0,5)
            .then(this.showFriendsSuccess)
            .catch(this.showFriendsError)
    };

    showFriendsSuccess = response => {
        console.log(response)
        console.log(response.data.item.pagedItems)

        this.setState(() => {
            return { mappedFriends: response.data.item.pagedItems.map(this.mapFriend) }
        })   
    }

    showFriendsError = response => {console.error(response)}

    onFriendClickedFull = (friend) => { //may need to use this for updating 
        console.log(friend)
    }
   

    mapFriend = (aFriend) => { // single friend needs to have on edit / on delete click handlers
        return (
            <div key={`friend-${aFriend.id}`}>
                <SingleFriend friend={aFriend} deleteBtn={this.onDelete} onClick={this.onFriendClickedFull} /> 
            </div>
        )
    }

    onDelete = (e) => {
        console.log('delete button')
        let buttonId = e.currentTarget.dataset.friendId;
        friendService.deleteFriend(buttonId).then(this.onDeleteSuccess).catch(this.onDeleteError)
    }

    onDeleteSuccess = (response) => console.log(response)
    onDeleteError = (response) => console.error(response)
    

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
                        <button type="button" className="btn btn-primary">Add friend</button>
                    </div>
                    <div id="card-container" className="container mx-auto mt-5 d-flex "> 
                        <div className="row">
                            {this.state.mappedFriends}
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