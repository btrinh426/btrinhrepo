import React from "react";
import * as userService from "../services/userService";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class HomePage extends React.Component {
  // userService
  //     .getCurrentUser(response)
  //     .then(this.onActionSuccess)
  //     .catch(this.onActionError);

  //     return response;
  //   console.log(response);

  // onActionSuccess = (response) => {
  //  console.log(response);
  //   };

  // onActionError = (errResponse) => {
  //   console.log(errResponse);
  // };

  onLogOutClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    userService.logOut().then(this.onLogOutSuccess).catch(this.onLogOutError);

    console.log();
  };

  onLogOutSuccess = (response) => {
    toast.success("You have logged out.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onLogOutError = (errResponse) => {
    toast.error("Error Occurred", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <form>
                <ul className="nav flex-column">
                  <p></p>
                  <li>
                    <NavLink to="/Cars">Cars</NavLink>
                  </li>
                  <p></p>
                  <li>
                    <NavLink to="/Friends/">Friends</NavLink>
                  </li>
                  <p></p>
                  <li>
                    <NavLink to="/Blogs/">Blogs</NavLink>
                  </li>
                  <p></p>
                  <li>
                    <NavLink to="/Companies">Tech Companies</NavLink>
                  </li>
                  <p></p>
                  <li>
                    <NavLink to="/Jobs/">Jobs</NavLink>
                  </li>
                  <p></p>
                  <li>
                    <NavLink to="/Events/">Events</NavLink>
                  </li>
                  <p></p>
                  <li>
                    <NavLink to="/Register/">Register</NavLink>
                  </li>
                  <p></p>
                  <li className="logout">
                    <button
                      className="btn btn-light"
                      onClick={this.onLogOutClick}
                    >
                      <NavLink to="/Login/">Logout</NavLink>
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default HomePage;
