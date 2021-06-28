import React from "react";
import userServices from "../services/userServices"
import friendServices from "../services/friendServices";

class Friends extends React.Component {

    state = {

    }


    componentDidMount() {
       // this.setState((prevState)=>{
       //     return {mappedFriends: prevState.friends.map(this.mapFriend)}
        //})

        friendServices.showFriends()
            .then(this.onShowSuccess)
            .catch(this.onShowError)
    }

    onShowSuccess = response => {
        console.log(response)
    }

    onShowError = err => {
        console.error(err)
    }

    mapFriend = (oneFriend)=> {
        return (
            
            <div key={`Friends-${oneFriend.id}`} className="card col-md-3">
                <img src={oneFriend.avatar} className="card-img-top" alt="..." />
                    <div className="card-body">
                    <h5 className="card-title">{oneFriend.name}</h5>
                    <p className="card-text">{oneFriend.bio}</p>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>

        )
    };

    render() {
        return (
            <div className="col-md-12 p-5">
                <h1>Friends</h1>
                <hr />
                <div className="row">
                       {/*this.state.friends.map(this.mapFriend)*/}
                       {this.state.mappedFriends} 
                </div>
                <div>
                    <button onClick={this.props.login} className="btn btn-danger">login</button>
                </div>
            </div>
        )
    }
};

export default Friends