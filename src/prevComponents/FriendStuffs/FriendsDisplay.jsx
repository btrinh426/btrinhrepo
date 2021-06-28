import React from "react";
import FriendCard from "./FriendCard";
import Misc from "../../scripts/misc";
import Services from "../../scripts/services";
import "../../scripts/CSS/friendsDisplayStyle.css";

class FriendsDisplay extends React.Component {
  state = {
    friendCards: [],
  };

  componentDidMount() {
    console.log("MOUNT");
    Services.friendsGet(0, 999)
      .then(this.onGetFriendsSuccess)
      .catch(this.onError);
  }

  onGetFriendsSuccess = (response) => {
    const friends = response.data.item.pagedItems;
    this.setState((prevState) => ({
      ...prevState,
      mappedFriends: friends.map(this.mapFriends),
    }));
  };

  mapFriends = (friend) => (
    <FriendCard key={friend.id} friend={friend} banana={this.onDeleteClick} />
  );

  onError = (error) => console.log(error);

  onEditClick = (e) => {
    const id = e.currentTarget.id;
    Misc.historySet(this.props, "/home/friendEdit/" + id + "/");
  };

  onDeleteClick = (id) => {
    console.log("delte ID", id);
    Services.friendDelete(id).then(this.onDeleteSuccess).catch(this.onError);
  };

  onDeleteSuccess = (id) => {
    this.setState((prevState) => {
      const updatedFriends = [...prevState.mappedFriends];

      // findIndex where id === key of component
      // splice updatedFriend

      return {
        mappedFriends: updatedFriends,
      };
    });
    //remove from the DOM
  };

  addFriendClick = (friend) => {
    //  this.props.history.push("/home/friends/" + friend.id + "/edit");
    Misc.historySet(this.props, "/home/friendAdd/");
  };

  render() {
    return (
      <div className="friend-view">
        <div className="friend-cards-container">{this.state.mappedFriends}</div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={this.addFriendClick}
        >
          Add Friend
        </button>
      </div>
    );
  }
}

export default FriendsDisplay;

// () => {
//     let i = 0;
//     this.props.getFriendHandlerState.friendsArray.forEach((friend) => {
//       console.log(friend.id, id);
//       if (friend.id == id) {
//         const stateCopy = { ...this.props.getFriendHandlerState };
//         stateCopy.friendsArray.splice(i, 1);
//         this.props.setFriendHandlerState(stateCopy);
//       }
//       i += 1;
//     });

//     this.makeCards(this.props.getFriendHandlerState.friendsArray);

// makeCards = (friendsArray) => {
//     this.props.setFriendHandlerState(
//       Misc.objModify(
//         "friendsArray",
//         [],
//         this.props.getFriendHandlerState,
//         friendsArray
//       )
//     );

//     const friendCards = [];
//     let uniqueKey = 0;
//     friendsArray.forEach((friend) => {
//       const newCard = this.makeCard(
//         friend.title,
//         friend.summary,
//         friend.primaryImage.imageUrl,
//         friend.id,
//         friend.id
//       );
//       const obj = {};
//       friendCards.push(newCard);
//       uniqueKey += 1;
//     });

//     this.setState({ friendCards: friendCards });
//   };

//   makeCard = (title, text, imgUrl, key, btnId) => {
//     return (
//       <div className="card" style={{ width: "18rem" }} key={key}>
//         <img className="card-img-top" src={imgUrl} alt="Card image cap"></img>
//         <div className="card-body">
//           <h5 className="card-title">{title}</h5>
//           <p className="card-text">{text}</p>
//           <a className="btn btn-primary" onClick={this.onEditClick} id={btnId}>
//             Edit
//           </a>
//           <a
//             className="btn btn-primary"
//             onClick={this.onDeleteClick}
//             id={btnId}
//           >
//             Delete
//           </a>
//         </div>
//       </div>
//     );
//   };
