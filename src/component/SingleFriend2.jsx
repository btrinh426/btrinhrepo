import React from "react";

class SingleFriend extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      singleFriend: this.props.friend,
    };
  }

  updateProfile = () => {
    this.props.onUpdateClick(this.state.singleFriend);
  };

  deleteProfile = () => {
    this.props.onDeleteClick(this.state.singleFriend);
  };

  render() {
    let cardStyle = {
      width: "100%",
      height: "30vh",
      objectFit: "cover",
    };
    return (
      <div className="col-sm">
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            style={cardStyle}
            src={this.state.singleFriend.primaryImage.imageUrl}
            alt="Card cap"
          />
          <div className="card-body">
            <h5 className="card-title">{this.state.singleFriend.title}</h5>
            <p className="card-text">{this.state.singleFriend.summary}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item card-headline">
              {this.state.singleFriend.headline}
            </li>
            <li className="list-group-item card-bio">
              {this.state.singleFriend.bio}
            </li>
          </ul>
          <div className="card-body">
            <button
              className="btn btn-info updateProfile mr-2"
              onClick={this.updateProfile}
              data-friend-id={this.state.singleFriend.id}
            >
              Edit
            </button>
            <button
              className="btn btn-info deleteProfile"
              onClick={this.deleteProfile}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleFriend;
