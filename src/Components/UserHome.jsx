import React from "react";

class UserHome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <h1 className="greetings-user">
            Welcome {this.props.user.firstName + " " + this.props.user.lastName}
          </h1>
        </div>
      </React.Fragment>
    );
  }
}
export default UserHome;
