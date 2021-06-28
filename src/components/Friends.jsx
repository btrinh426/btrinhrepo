import React from "react";

import { NavLink } from "react-router-dom";

class Friends extends React.Component {
  render() {
    return (
      <>
        <div style={{ padding: 20 }}>
          <h1 className="text-center">Friends</h1>
        </div>
        <div className="buttons text-center">
          <p>What would you like to do?</p>
          <NavLink to="/register-friend">
            <button className="btn btn-primary mx-1">Register a friend</button>
          </NavLink>
          <NavLink to="/friends-index">
            <button className="btn btn-primary mx-1">View all friends</button>
          </NavLink>
        </div>
      </>
    );
  }
}

export default Friends;
