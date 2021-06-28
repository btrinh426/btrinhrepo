import React from "react";

class Homepage extends React.Component {
  onLogoutClick = () => {
    let ticks = new Date().getSeconds();
    console.log("logout is firing", ticks);
    this.props.history.push("/logout");
  };

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    console.log({ currentPath, previousPath });
  }

  render() {
    return (
      <div className="welcome">
        <h1>Welcome Phillip Kang!</h1>

        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={this.onLogoutClick}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default Homepage;
