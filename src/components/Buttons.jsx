import React from "react";
import { NavLink } from "react-router-dom";

const accessButtons = (props) => {
  return (
    <div className="my-2 my-lg-0">
      <NavLink to="/login">
        <button style={{ marginRight: "10px" }} className="btn btn-light">
          Login
        </button>
      </NavLink>

      <NavLink to="/registration">
        <button className="btn btn-info">Register</button>
      </NavLink>
    </div>
  );
};

export default accessButtons;
