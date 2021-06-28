import React from "react";

class Home extends React.Component {
  state = {
    user: {
      loggedIn: false,
      email: " ",
      password: " ",
    },
  };
  render() {
    return (
      <React.Fragment>
        <div className="col-6">
          <h1>Welcome {this.state.user.email} </h1>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
