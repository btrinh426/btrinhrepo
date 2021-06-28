
import React from "react";
import * as friendService from "../services/friendService";
import SingleFriend from "./SingleFriend";
import Pagination from "rc-pagination";  //<----pagination
import "rc-pagination/assets/index.css"; //<----pagination
import debug from "sabio-debug";
import CodeTalkProps from "./CodeTalkProps";



const _logger = debug.extend("Friends");


class Friends extends React.Component {        
    //--------------mounting-------------------------------------     
constructor(props){
    super(props);
    this.state = {
        friends: [],
        current: 0, //<----pagination
        totalCount: 0,//<----pagination    
        pageSize: 8
    };
}

    componentDidMount() {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        _logger ("componentDidMount: called after component has been rendered");
        this.getPaginate(this.state.current, this.state.pageSize)  //<----pagination  
    }

    getPaginate = (pageIndex, pageSize) => {    //<--- this is how I brought in data from ajax call
        console.log(`pageIndex = ${pageIndex} , pageSize = ${pageSize}`)
        
        friendService.getFriends(pageIndex, pageSize)
        .then(this.onGetFriendsSuccess)
        .catch(this.onGetFriendsError);    //<----pagination
    }

    onGetFriendsSuccess = (myFriends) => {
        console.log("get friends is successful", myFriends.data.item.pagedItems);

        this.setState(() => {
            return {
                friends: myFriends.data.item.pagedItems,  //<--- returns array of friends  
                totalCount: myFriends.data.item.totalCount  //<--- returns total count  of items from data response records (pagination)
            }
        })

        this.setState(() => {
            let friendList = myFriends.data.item.pagedItems;
            return { mappedFriends: friendList.map(this.mapFriend) };
        })

        console.log(this.state)
    }

    
    onGetFriendsError = (errResponse) => {
        console.error("get friends error")
    }

    onEditClick = (friend) => {
        console.log(friend)

        this.props.history.push(`/Friend/${friend.id}/Edit`, { type: "EDIT_FRIEND", payload: friend });
    }


    onDeleteClick = (idToDelete) => {
        console.log("onDeleteClick start")

        friendService
            .deleteAndPassBack(idToDelete)
            .then(this.onDeleteFriendSuccess)
            .catch(this.onDeleteFriendError)

        console.log("onDeleteClick end")


        console.log("onDelete", { deletedFriend: idToDelete });
    }

    onDeleteFriendSuccess = (myId) => {       //---this function is being passed the Id from the ajax call
        console.log("Delete Friend is successful", myId)

        this.setState(prevState => {

            const indexOfFriend = prevState.friends.findIndex(    //<--- findIndex will return the index of the first element(singleFriend) that satisifes test
                singleFriend => singleFriend.id === myId
            );
            console.log("indexOfFriend:", indexOfFriend)

            const updatedFriends = [...prevState.friends];
            console.log("updatedFriends set to state:", updatedFriends)

            if (indexOfFriend >= 0) {
                //---do not slice or otherwise mutate the objects in array

                updatedFriends.splice(indexOfFriend, 1);    //---- splice is removing 1 element from array at indexOfFriend 
                console.log("updatedFriends after splice:", updatedFriends)
            }
 
            return {
                friends: updatedFriends,
                mappedFriends: updatedFriends.map(this.mapFriend)
            };


        });

    }

    onDeleteFriendError = (errResponse) => {
        console.error("Delete error")
    }

    shouldComponentUpdate(){                   //<-----component is updating
        return true;
    }

    componentDidUpdate(){
        _logger("componentDidUpdate: component has been mounted" )
    }


    componentWillUnmount(){
        _logger("componentWillUnmount: component is unmounting");
    }

    mapFriend = (oneFriend) => {
        return (
            <React.Fragment key={`Friend-${oneFriend.id}`}>
                <SingleFriend friend={oneFriend} onClick={this.onEditClick} onDeleteRequested={this.onDeleteClick}></SingleFriend>
               
            </React.Fragment>

        )
    }

    onChange = page => {
        console.log(page);
        this.setState({ current: page }, () => this.getPaginate(this.state.current - 1, this.state.pageSize));  //<----pagination  // need to figure out what is intended here
    };

    render() {
        _logger("rendering");
        return (

            <div className="container">

                <CodeTalkProps topic= "Props Talk"/>
                <h1>Friends</h1>
                <div className="row">
                    {this.state.mappedFriends}
                </div>
                <Pagination           //< -----pagination
                    onChange={this.onChange}
                    current={this.state.current}
                    total={this.state.totalCount}>
                    pageSize= {this.state.pageSize}
                </Pagination>
            </div>


        )
    }
}

export default Friends;