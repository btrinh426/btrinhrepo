import React from "react";
import FriendCard from "./FriendCard";
import swal from "sweetalert2";

const ShowNewFriend = props => {
    swal.fire("Your new friend has been added!", "Here they are!", "success");
    let newFriend = props.friend;
    const deleteFunc = props.delete;
    console.log(newFriend);
    return (
        <div className="row row-cols-1 row-cols-md-3 cards-row new-friend-view">
            <FriendCard friend={newFriend}></FriendCard>
        </div>
    );
};
export default ShowNewFriend;
