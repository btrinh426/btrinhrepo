import React, {Component} from "react";
import { getAllFriends, deleteById, searchFriends } from "../services/friendsService"; 
import Pagination from "rc-pagination";
import FriendCard from "./FriendCard"

class Friends extends Component {

    state = {
        mappedFriends: [],
        search: "",
        pageIndex: 0,
        pageSize: 3,
        totalFriends: 0
    
    };

    componentDidMount(){

        let pageIndex = this.state.pageIndex
        let pageSize = this.state.pageSize

        this.getFriends(pageIndex, pageSize)
    };

    onGetAllFriendsSuccess = (res) => {
        console.log("getAllFriends success", res)

        const allFriends = res.data.item.pagedItems 
        const totalFriends = res.data.item.totalCount
        console.log("totalFriends", totalFriends)

        this.setState((prevState) => {
            return { 
                mappedFriends: allFriends.map(this.mapFriend),
                totalFriends: totalFriends 
               }
        })

    };

    onGetAllFriendsError = (err) => {
        console.log("getAllFriends error", err.response)
    };

    onChangePage = (val) => {
        console.log("onChangePage", val)

        let pageIndex = val - 1
        let pageSize = this.state.pageSize;

        this.setState(() => {
            return{

                pageIndex: pageIndex
               
            }
        })

        this.getFriends(pageIndex,pageSize)
    };

    onDelete = (e) => {
        console.log("onDelete clicked", e.currentTarget.dataset.friendId)

        const friendId = e.currentTarget.dataset.friendId

        deleteById(friendId)
            .then(this.onDeleteByIdSuccess)
            .catch(this.onDeleteByIdError)

    };

    onDeleteByIdSuccess = (res) => {
        console.log(res)
        const friendIdKey = `Friend-${res.friendId}`;
        const updatedFriends = [...this.state.mappedFriends].filter((friend) => {
            return friend.key !== friendIdKey
        })

        this.setState({
            mappedFriends: updatedFriends
        })
    };

    onDeleteByIdError = (err) => {
        console.log("DeleteById err", err.response)
    };

    onEdit = (e) => {
        console.log("edit clicked", e.currentTarget.dataset)

        const friendId = e.currentTarget.dataset.friendId

        this.props.history.push("/addfriends/" + friendId)
    }

    mapFriend = (oneFriend) => {
        return (

            <FriendCard 
                key={oneFriend.id}
                friend={oneFriend} 
                onEdit={this.onEdit} 
                onDelete={this.onDelete}>
            </FriendCard>
                
        )
    };

    onSearchFriends = (e) =>{
        console.log("onSearch clicked")
        e.preventDefault()
        let pageIndex = this.state.pageIndex
        let pageSize = this.state.pageSize
        this.getFriends(pageIndex, pageSize)
    };

    getFriends = (pageIndex, pageSize) => {

        let title = this.state.search;

        if (title) {
           
            searchFriends(pageIndex, pageSize, title)
            .then(this.onSearchFriendsSuccess)
            .catch(this.onSearchFriendsError)
            
        } else {

            getAllFriends(pageIndex, pageSize)
            .then(this.onGetAllFriendsSuccess)
            .catch(this.onGetAllFriendsError)
        }
    }

    onSearchFriendsSuccess = (res) => {
        console.log("searchFriends success", res)

        const searchedFriends = res.data.item.pagedItems 
        const totalFriends = res.data.item.totalCount

        this.setState((prevState) => {
            return { mappedFriends: searchedFriends.map(this.mapFriend), totalFriends: totalFriends}
        })


    };

    onSearchFriendsError = (err) => {
        console.log("searchFriends error", err.response)
    };

    onSearchChange = (e) => {
        let currentTarget = e.currentTarget
        let newValue = currentTarget.value

        this.setState({search: newValue})

    };

    onAddFriend = (e) => {
        e.preventDefault()
        console.log("addFriends clicked")

        this.props.history.push("/addfriends")

    };

    render() {

        return( 
            <React.Fragment>
                <div>
                    <div className="page-header">
                        <div className="page-header-left-wrapper">
                            <h3>Friends</h3>
                            <button 
                                type="addFriend" 
                                className="btn btn-primary addFriend" 
                                id="add-friend-button"
                                onClick={this.onAddFriend}
                                >+ Friend
                            </button>
                        </div>
                        <div className="page-header-right-wrapper">
                        <form className="form-inline my-2 my-lg-0">
                            <input 
                                className="form-control mr-sm-2" 
                                type="search" placeholder="Search friends" 
                                value={this.state.search} 
                                id="searchFriends"
                                name="searchFriends"
                                onChange={this.onSearchChange}
                                />
                            <button 
                                className="btn btn-outline-secondary my-2 my-sm-0 searchFriend" 
                                type="submit" 
                                style={{borderColor: "#ced4da"}}
                                onClick={this.onSearchFriends}
                                >Search
                            </button>
                        </form>
                        </div>
                    </div>    
                </div>
                <div className="row">
                    {this.state.mappedFriends}
                </div>
                <div><Pagination
                        className="friendPagination" 
                        onChange={this.onChangePage}
                        current={this.state.pageIndex + 1} //api is 0 based, so add 1
                        pageSize={this.state.pageSize}
                        total={this.state.totalFriends}/>
                </div>
        
            </React.Fragment>
        )
    }
};

export default Friends;