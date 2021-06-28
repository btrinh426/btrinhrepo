import React from "react";
import SignInButton from "../forms/SignInButton";

class Home extends React.Component {
  render() {
    let buttonStyles = {
      marginRight: "500px",
      marginLeft: "480px",
      marginTop: "40px",
    };

    return (
      <React.Fragment>
        <div className="container" style={buttonStyles}>
          <h1>Welcome Sabio Fellow!</h1>
          <SignInButton />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
