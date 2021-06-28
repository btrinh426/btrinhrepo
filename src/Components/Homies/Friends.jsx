import React from "react";
import "./HomieStyle/Homies.scss";
import * as friendServices from "../../services/FriendsService";
import FriendCard from "./FriendCard";

class Friends extends React.Component {
    state = {
        mappedFriends: [],
        activeuser: false,
    };

    componentDidMount() {
        friendServices
            .getAllFriends()
            .then(this.onGetFriendsOk)
            .then(this.onGetFriendsFail);
    }

    onGetFriendsOk = res => {
        console.log(res);

        const friends = res.map(this.friendsMap);
        this.setState({ mappedFriends: friends });
    };

    friendsMap = aFriend => {
        return <FriendCard key={aFriend.id} friend={aFriend} />;
    };
    //onGetFriendsFail = err => console.error(err);

    render() {
        console.log(this.state.mappedFriends);
        return (
            <div className="container-fluid">
                <div className="welcome">
                    <h1 className="welcome">HI THERE</h1>
                </div>
                <div className="friendCard">
                    <div>
                        {this.state.mappedFriends.length > 0 &&
                            this.state.mappedFriends}
                    </div>
                </div>
            </div>
        );
    }
}

export default Friends;
