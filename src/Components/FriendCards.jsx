import React from "react";
import Swal from "sweetalert2";
import FriendsService from "../services/friendsService";

let FriendCard = (props) => {
  let goToEditFriend = (e) => {
    let currentFriendId = e.currentTarget.name;
    props.history.push(`/main/friends/edit/${currentFriendId}`);
  };

  let deleteFriend = (e) => {
    let friendId = e.currentTarget.name;

    var friendDeleteSuccess = (response) => {
      console.log(response);
      Swal.fire({
        icon: "success",
        title: `${props.friend.title} successfully deleted`,
      }).then(() => {
        props.updateFriendsView();
      });
    };

    var friendDeleteError = (error) => {
      console.log(error.response);
    };

    Swal.fire({
      icon: "warning",
      title: `Delete ${props.friend.title}?`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.value) {
        FriendsService.deleteUserById(friendId)
          .then(friendDeleteSuccess)
          .catch(friendDeleteError);
      }
    });
  };

  return (
    <React.Fragment>
      {/* Start */}

      <img
        className=" userFriend"
        alt="Card cap"
        src={props.friend.primaryImage.imageUrl}
      />
      <div className="card-body" key={`body-${props.friend.id}`}>
        <h5 className="card-title text-center">{props.friend.title}</h5>
        <p className="card-text text-center">{props.friend.headline}</p>
        <div className="card-footer" key={`footer-${props.friend.id}`}>
          <button
            href="#"
            className="btn btn-danger btn-sm"
            name={props.friend.id}
            onClick={deleteFriend}
          >
            Delete
          </button>
          <button
            className="btn btn-secondary btn-sm float-right"
            style={{ width: "60px" }}
            name={props.friend.id}
            onClick={goToEditFriend}
          >
            Edit
          </button>
        </div>
      </div>

      {/* End */}
    </React.Fragment>
  );
};

export default FriendCard;
