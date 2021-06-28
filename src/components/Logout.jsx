import React from "react";
import { NavLink } from "react-router-dom";

class Logout extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Sorry to see you go, name!
          <NavLink to="/newform">Log back in</NavLink>
          to enjoy more FriendshipWorld!
        </h1>
      </div>
    );
  }
}
export default Logout;
