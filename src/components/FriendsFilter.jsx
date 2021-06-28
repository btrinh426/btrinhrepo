import React from "react";
import FriendsCard from "./FriendCard";

function FriendsFilter(props) {
  let friends = props.filteredFriends.map((friend, index) => {
    console.log(friend);
    return <FriendsCard key={index} friend={friend} />;
  });

  return <div>{friends}</div>;
}

export default FriendsFilter;
