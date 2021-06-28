import React from "react";

function NameLabel(props) {
  // console.log("NameLabel rendering", props);

  return (
    <>
      <div
        className="alert alert-light pt-0 pb-0 mt-2"
        role="alert"
        hidden={!props.isUserLoggedIn}
      >
        {props.userName}
      </div>
      {/* <label
        name="userLabel"
        hidden={!props.isUserLoggedIn}
        className="px-3 pt-2"
      >
        {props.userName}
      </label> */}
      {/* <span
        className="px-3 pt-3 mt2"
        hidden={!props.isUserLoggedIn}
        class="badge badge-dark"
      >
        {props.userName}
      </span> */}
    </>
  );
}

export default NameLabel;
