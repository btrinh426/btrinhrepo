import React from "react";
import NavBar from "./NavBar";
import "./css/NavBar.css";
import * as friendService from "../services/friendService";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css'
import SingleFriend from "./SingleFriend";




class People extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            mappedFriends: [],
            pagination: {
                current: 0,
                total: null
            },
            searchQuery: "",
        
        };

        //state prop for search query.

    }

    componentDidMount() {
        this.showMyFriends();
    }

    onChange = page => {
        console.log(page)
        this.setState(() => {
            if(this.state.searchQuery !== ''){
                console.log('in search mode')
                    friendService.searchFriend(page - 1, 9, this.state.searchQuery)
                        .then(this.onSuccessSearch)
                        .catch(this.onErrorSearch)              
            } else {
                friendService.showFriends(page - 1, 9)
                        .then(this.showFriendsSuccess)
                        .catch(this.showFriendsError)
            }
            return {pagination: {...this.state.pagination, current: page}} 
    })
    }



    showMyFriends = () => {
        friendService.showFriends(0, 9)
            .then(this.showFriendsSuccess)
            .catch(this.showFriendsError)
    };

    showFriendsSuccess = response => {
        console.log(response)
        console.log(response.data.item.pagedItems)

        this.setState(() => {
            return { mappedFriends: response.data.item.pagedItems.map(this.mapFriend), pagination: { ...this.state.pagination, total: response.data.item.totalCount  }} 
        })   
    }

    showFriendsError = response => {console.error(response)}
   

    mapFriend = (friend) => { 
        return (          
                <SingleFriend key={friend.id} friend={friend} onDelete={this.onDelete} onEdit={this.onEdit} /> 
        )
    }

   

    onDelete = (friends) => {
        console.log('delete button', friends)
      
        friendService.deleteFriend(friends.id)
        .then(()=>{
            this.setState(prevState => {
                const getFriendIndex = prevState.mappedFriends.findIndex(
                    friend => friend.props.friend.id === friends.id
                );
                const updatedFriends = [...prevState.mappedFriends]
                if(getFriendIndex >= 0) {
                    updatedFriends.splice(getFriendIndex, 1)
                }
                return {mappedFriends: updatedFriends}
            })         
        })
        .catch(this.onDeleteError)
    }


    onDeleteError = (response) => console.error(response)

    onEdit = (friend) =>{
        console.log('edit button being hit', friend)
        this.props.history.push("/addedit/" + friend.id, {
            type: "UPDATE_FRIEND",
            payload: friend,
        })
    }

    addFriendClicked = () => {
        this.props.history.push("/addedit")
    }

    searchQueryChange = (e) => {
        let currentTarget = e.currentTarget;
        let searchValue = currentTarget.value;
        this.setState(()=> {
            let searchQuery = {};
            searchQuery = searchValue;
            return { ...this.state, searchQuery } 
        })
    }

    searchBarClicked = () => {
        friendService.searchFriend(this.state.pagination.current, 9, this.state.searchQuery)
            .then(this.onSuccessSearch)
            .catch(this.onErrorSearch)
    } 
    
    onSuccessSearch = response => {
        console.log(response)
        this.setState(() => {
            return {mappedFriends: response.data.item.pagedItems.map(this.mapFriend)}
        })
        
    };

    onErrorSearch = response => {
        console.error(response);
    };

    //for search query the reasults are put into state so mappedFriends : searchquery results
    

    render() {
        return (
            <>
                <NavBar></NavBar>
                <div className="mx-auto mt-5 col-lg-8">
                    <h3 className="text-center">People</h3>
                    <form className="form-inline my-2 my-lg-0 float-right ">
                        <input className="form-control mr-sm-2" name="searchBar" onChange={this.searchQueryChange}  type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-info my-2 my-sm-0 search" onClick={this.searchBarClicked} type="button">Search</button>
                    </form>
                    <div>
                        <button type="button" className="btn btn-outline-info" onClick={this.addFriendClicked}>Add friend</button>
                    </div>
                    <div id="card-container" className="container mx-auto mt-5"> 
                        <div className="row justify-content-center">
                            {this.state.mappedFriends}
                        </div>
                    </div>
                    <div className="pagination  mb-5 justify-content-center">
                        <Pagination onChange={this.onChange} current={this.state.pagination.current} pageSize={9} total={this.state.pagination.total}/>

                    </div>
                </div>     
         
            </>
            
            
        )
    }
}

export default People;