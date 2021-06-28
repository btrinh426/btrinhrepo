import React from "react";

// import * as friendsService from "../services/friendsService";
// import { friendsService } from "../services/friendsService";

class SingleFriend extends React.Component {
  // onDelete(response) {
  //   console.log(response);
  // }
  // notDelete(response) {
  //   console.error(response);
  // }
  // deleteClicked() {
  //   friendsService
  //     .byeFriend(this.props.person.id)
  //     .then(this.onDelete())
  //     .catch(this.notDelete());
  // }

  render() {
    return (
      <React.Fragment>
        <div className="card col-4">
          <img
            className="imageUrl"
            variant="top"
            src={this.props.person.primaryImage.imageUrl}
            alt=""
          />

          <p className="bio">{this.props.person.bio}</p>
          <p className="title">{this.props.person.title}</p>
          <button className="btn btn-info">Edit info</button>
          <button className="btn btn-warning">Delete</button>
        </div>
      </React.Fragment>
    );
  }
}

export default SingleFriend;
