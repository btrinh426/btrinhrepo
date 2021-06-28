// import React from "react";
// import * as userService from "../services/userService";

// function SingleFriend(props) {
//   const oneFriend = props.friend;
//   function onLocalEdit() {
//     props.onEditClicked(oneFriend);
//   }

// function onDeleteClick(e) {
//   e.preventDefault();
//   //console.log("delete click", e.currentTarget.dataset.friendeleteId);
//   let friendToDelete = e.currentTarget.dataset.friendeleteId;
//   userService
//     .deleteFriend(friendToDelete)
//     .then(onFriendDeleteSuccess)
//     .catch(onFriendDeleteFail);
// }

// function onFriendDeleteSuccess(resId) {
//   console.log("delete success:", resId);
// }

// function onFriendDeleteFail(res) {
//   console.warn(res);
// }

//   return (
//     <React.Fragment>

//     </React.Fragment>
//   );

// export default React.memo(SingleFriend);
