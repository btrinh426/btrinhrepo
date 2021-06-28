import React from "react";

class Friends extends React.Component {
  // toPaginateAllFriend = (e) => {
  //   e.preventDefault();
  //   friendService
  //     .paginated()
  //     .then(this.onActionSuccess)
  //     .catch(this.onActionError);
  // };

  // onActionSuccess = (response) => {
  //   console.log("Success");
  //   toast.success("Registered!", "Success");
  //   this.props.history.push("/userLogin");
  // };

  // onActionError = (errResponse) => {
  //   console.log("Failure");
  //   toast.error("Too Bad!", "Failure");
  // };

  toCreateFriend = (e) => {
    e.preventDefault();
    console.log("i was pressed");
    this.props.history.push("/create-friend");
  };
  render() {
    return (
      <div className="row p-5">
        <div className="col-md-4 p-5">
          <h2>Heading</h2>
          <p>PUT THE FRIENDS INFO THAT YPU WANT TO DIPLAY HERE.</p>
          <p>
            <button className="btn btn-secondary">View details &raquo;</button>
          </p>
        </div>
        <div className="col-md-4 p-5">
          <h2>Heading</h2>
          <p>PUT THE FRIENDS INFO THAT YPU WANT TO DIPLAY HERE..</p>
          <p>
            <button className="btn btn-secondary">View details &raquo;</button>
          </p>
        </div>
        <div className="col-md-4 p-5">
          <h2>Heading</h2>
          <p>PUT THE FRIENDS INFO THAT YPU WANT TO DIPLAY HERE.</p>
          <p>
            <button className="btn btn-secondary">View details &raquo;</button>
          </p>
          <button
            onClick={this.toCreateFriend}
            type="button"
            className="btn btn-success"
          >
            Add new friend
          </button>
        </div>
      </div>
    );
  }
}

export default Friends;
