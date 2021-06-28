import React from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

class Friends extends React.Component {
  onButtonClick = (e) => {
    e.preventDefault();
    this.props.history.push("/AddFriends");
  };

  onAddFriendSuccess = () => {
    toast.success("Friend added!");
  };

  onAddFriendError = () => {
    console.log("error");
    toast.error("You have no friends, loser!");
  };

  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-secondary btn-lg"
          style={{ margin: "25px 0 50px 20px" }}
          onClick={this.onButtonClick}
        >
          <NavLink to="/AddFriends" style={{ color: "white" }}>
            ADD A FRIEND+
          </NavLink>
        </button>
        <div
          style={{
            fontFamily: "fantasy",
            fontSize: "50px",
            float: "center",
            textShadow: "2px 2px gray",
          }}
        >
          UNDER CONSTRUCTION
        </div>
        <div
          className="form-content row justify-content-center"
          style={{
            backgroundImage: `url("https://www.pngkit.com/png/detail/559-5599435_justin-bieber-purpose-dumpster-fire-clipart.png")`,
            backgroundSize: "cover",
            width: "100vw",
            height: "100vh",
          }}
        />
      </React.Fragment>
    );
  }
}
export default Friends;
