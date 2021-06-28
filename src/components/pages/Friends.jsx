import React from "react";
import { NavLink } from "react-router-dom";
import Edit from "../../components/EditFriends";

class Friends extends React.Component {
  render() {
    return (
      <div className="container m-3">
        <div className="row">
          <div className="col-2">
            <h2>Friends</h2>
          </div>
          <div className="col-2">
            <NavLink to="/addeditfriend" className="btn btn-info">
              + Friend
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;
