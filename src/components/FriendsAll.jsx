import React from "react";
import FriendCard from "../components/FriendCard";
import * as friendServices from "../services/friendServices";
import {Link, Route} from "react-router-dom";

class FriendsAll extends React.Component{
constructor(props){
    super(props)
    this.state = {
        friends:[
            {
            title: "",
            bio: "",
            summary: "", 
            headline: "",
            slug: "",
            statusId: "Active",
            primaryImage: "",
            id: "" }
        ]
    };
};

componentDidMount=()=>{
    friendServices.grabAll()
        .then(this.onGrabAllSuccess)
        .catch(this.onGrabAllError);
};

onGrabAllSuccess=(response)=>{
   let friends = response.data.item.pagedItems;

    this.setState( ()=>{
        return { mappedFriends: friends.map(this.mapFriends) };
    });
};

onFriendInfo=(e)=>{

    console.log(e.currentTarget.dataset.id)
    let friendId = e.currentTarget.dataset.id

    friendServices.byId(friendId)
        .then(this.onByIdSuccess)
        .catch(this.onByIdError);
}

onByIdSuccess=(response)=>{
    console.log(response.data.item.id)
    this.props.history.push(`/friendsregister/${response.data.item.id}`) 
}

onByIdError=(response)=>{
    console.error({"error": response})
}

delete=(e)=>{
    e.preventDefault();
    console.log(e.currentTarget.dataset.id)
    let friendId = e.currentTarget.dataset.id

    friendServices.deleteFriend(friendId)
        .then(this.onDeleteSuccess)
        .catch(this.onDeleteError);
};

onDeleteSuccess=(response)=>{
    console.log(response.data.item.id);

};

onDeleteError=(response)=>{
    console.error({"error": response});
};




mapFriends=(oneFriend)=>{
    return(
        <React.Fragment key={oneFriend.id}>
            <FriendCard friends={oneFriend} onClick={this.onFriendInfo}>
            </FriendCard>
        </React.Fragment>
    );
}

onGrabAllError=(response)=>{
    console.error({"error": response});
};

    render(){
        return(
            <div className="container">
                <nav className="navbar justify-content-between" style={{margin:"1rem 0rem"}}>
                    <div>
                        <Link to="/friendsregister" className="btn btn-outline-primary">+ Friend</Link>
                    </div>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button type="button" className="btn btn-outline-primary">Search</button>
                    </form>
                </nav>
                <div className="row justify-content-between">
                   {this.state.mappedFriends}
                </div>
                <Route path="/friendsregister"></Route>
            </div>
        );
    };
};

export default FriendsAll;