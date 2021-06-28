import React from "react";
import Login from "../forms/Login";
import { withRouter } from "react-router-dom";
import { Route } from "react-router-dom";

function SignInButton(props) {
  const onSignInClick = function () {
    props.history.push("/login");
  };
  let buttonStyle = {
    marginLeft: "100px",
    marginTop: "20px",
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        style={buttonStyle}
        onClick={onSignInClick}
      >
        Please Click to Sign In!
      </button>
      <Route path="/login" exact={true} component={Login} />
    </React.Fragment>
  );
}

export default withRouter(SignInButton);
