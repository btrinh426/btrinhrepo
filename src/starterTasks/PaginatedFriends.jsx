// import React from "react";
// import friendService from "../services/friendService";
// import FriendCard from "./FriendCard";
// import UpdateFriendForm from "./UpdateFriendForm";

// class PaginateFriends extends React.Component {
//   state = {
//     friendArray: [],
//   };

//   componentDidMount() {
//     // e.preventDefault();
//     console.log("It worked");
//     friendService
//       .friendsPaginated(0, 10)
//       .then(this.onActionSuccess)
//       .catch(this.onActionError);
//   }

//   onActionSuccess = (response) => {
//     console.log(response);
//     var friends = response?.data?.item?.pagedItems;
//     if (friends?.length > 0) {
//       this.updateStateWithFriends(friends);
//     }
//   };

//   updateStateWithFriends(friends) {
//     this.setState((prevState) => {
//       return {
//         ...prevState,
//         friendArray: friends.map(this.friendMap),
//       };
//     });
//   }

//   onActionError = (err) => {
//     console.log("Denied", err);
//   };

//   friendMap = (friend) => {
//     console.log("I am here");
//     return (
//       <FriendCard
//         deleteMe={() => this.deleteFriend(friend.id)}
//         editMe={() => this.updateFriend(friend)}
//         friend={friend}
//         key={friend.id}
//       />
//     );
//   };

//   deleteFriend = (id) => {
//     friendService
//       .deleteById(id)
//       .then(this.onDeleteSuccess, +console.log("I delete: ", id))
//       .catch(this.onActionError);
//   };
//   // onDeleteSuccess = (response) => {
//   //   console.log(response);
//   // };
//   onDeleteSuccess = (friend) => {
//     const friendDelete = this.state.friendArray.find((f) => f.id === friend.id);

//     const index = this.state.friendArray.indexOf(friendDelete);

//     if (index !== -1) {
//       friendDelete.splice(index, 1);
//       this.setState({ friendArray: friendDelete });
//     }

//     // let friendDeleted = [...this.state.friendArray];
//     // let index = friendDeleted.indexOf(e.target.value);
//     // if (index !== -1) {
//     //   friendDeleted.splice(index, 1);
//     //   this.setState({ friendArray: friendDeleted });
//     // }
//   };

//   updateFriend = (friend) => {
//     console.log("I update: ", friend);

//     const friendToUpdate = this.state.friendArray.find(
//       (f) => f.id === friend.id
//     );
//     const index = this.state.friendArray.indexOf(friendToUpdate);

//     const newFriend = {
//       id: friend.id,
//       title: friend.title,
//       summary: friend.summary,
//       bio: friend.bio,
//       headline: friend.headline,
//       slug: friend.slug,
//       statusId: friend.statusId, //set to Active to display
//       primaryImage: friend.primaryImage,
//     };
//     console.log("yup");

//     this.setState((prevState) => {
//       return {
//         ...prevState,
//         friendArray: this.state.friendArray.splice(index, 1, newFriend),
//       };
//     });
//     console.log("yoooooo");
//   };

//   render() {
//     return <div>{this.state.friendArray}</div>;
//   }
// }

// export default PaginateFriends;
