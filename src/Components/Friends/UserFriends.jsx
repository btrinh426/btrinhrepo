import React from "react";
import FriendCard from "./FriendCard";
// import * as friendServices from "../../services/friendsService";

import "./Friends.css";

const UserFriends = props => {
    //console.log(props.friends);
    let friendsToLoad = props.friends;
    //console.log(typeof friendsToLoad);
    //console.log(friendsToLoad);

    const mapFriend = friend => (
        <FriendCard
            friend={friend}
            key={friend.id}
            delete={props.delete}
            edit={props.edit}
        />
    );

    return (
        <React.Fragment>
            <div className="row row-cols-1 row-cols-md-3 cards-row">
                {friendsToLoad.length > 0
                    ? props.friends.map(mapFriend)
                    : console.log("nothing to map")}
            </div>
        </React.Fragment>
    );
};

export default UserFriends;
