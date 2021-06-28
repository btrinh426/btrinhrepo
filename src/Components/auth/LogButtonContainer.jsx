import React from "react";
import LogOutButton from "./LogOutButton";
import LoginButton from "./LogInButton";
class LogButtonContainer extends React.Component {
  render() {
    if (this.props.currentUser.isLoggedIn) {
      return <LogOutButton {...this.props} />;
    } else {
      return <LoginButton {...this.props} />;
    }
  }
}
export default LogButtonContainer;
