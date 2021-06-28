import React from "react";

function FriendsSearch(props) {
  return (
    <div>
      <input onChange={props.handleInput} type="text" />
    </div>
  );
}

export default FriendsSearch;
