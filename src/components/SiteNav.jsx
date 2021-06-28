import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import * as usersService from "../services/usersService";
import { toast } from "react-toastify";

class SiteNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };
  }

  onLogoutBtnClicked = (e) => {
    usersService
      .logout()
      .then(this.onLogoutBtnClickedSuccess)
      .catch(this.onLogoutBtnClickedError);
  };

  onLogoutBtnClickedSuccess = (response) => {
    console.log(response);
    toast.success(
      <div>
        Logout Successful
        <br />
        Redirecting to Login
      </div>
    );
    this.setState((prevstate) => ({ redirect: true }));
  };

  onLogoutBtnClickedError = (error) => {
    console.log(error.response.data);
    toast.error(
      <div>
        Logout Failed
        <br />
        You must be logged in to do that!
        <br />
        Redirecting to Login.
      </div>
    );
    this.setState((prevstate) => ({ redirect: true }));
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return (
        <React.Fragment>
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark"
            aria-label="Tenth navbar example"
          >
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarsExample08"
                aria-controls="navbarsExample08"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse justify-content-md-center"
                id="navbarsExample08"
              >
                <ul className="navbar-nav">
                  <NavLink to="/home" exact>
                    <li className="nav-item nav-link active">Home</li>
                  </NavLink>
                  <NavLink to="/friends" exact>
                    <li className="nav-item nav-link active">Friends</li>
                  </NavLink>
                  <NavLink to="/blogs" exact>
                    <li className="nav-item nav-link active">Blogs</li>
                  </NavLink>
                  <NavLink to="/tech" exact>
                    <li className="nav-item nav-link active">Tech Co.</li>
                  </NavLink>
                  <NavLink to="/jobs" exact>
                    <li className="nav-item nav-link active">Jobs</li>
                  </NavLink>
                  <NavLink to="/events" exact>
                    <li className="nav-item nav-link active">Events</li>
                  </NavLink>
                  <NavLink to="/register">
                    <button type="button" className="btn btn-primary">
                      Register
                    </button>
                  </NavLink>
                  <NavLink to="/login">
                    <button type="button" className="btn btn-primary">
                      Login
                    </button>
                  </NavLink>
                  <div
                    type="button"
                    className="btn btn-primary"
                    name="logoutBtn"
                    onClick={this.onLogoutBtnClicked}
                  >
                    Logout
                  </div>
                </ul>
              </div>
            </div>
          </nav>
          <Redirect to="/login" />;
        </React.Fragment>
      );
    } else {
      return (
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark"
          aria-label="Tenth navbar example"
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample08"
              aria-controls="navbarsExample08"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-md-center"
              id="navbarsExample08"
            >
              <ul className="navbar-nav">
                <NavLink to="/home" exact>
                  <li className="nav-item nav-link active">Home</li>
                </NavLink>
                <NavLink to="/friends" exact>
                  <li className="nav-item nav-link active">Friends</li>
                </NavLink>
                <NavLink to="/blogs" exact>
                  <li className="nav-item nav-link active">Blogs</li>
                </NavLink>
                <NavLink to="/tech" exact>
                  <li className="nav-item nav-link active">Tech Co.</li>
                </NavLink>
                <NavLink to="/jobs" exact>
                  <li className="nav-item nav-link active">Jobs</li>
                </NavLink>
                <NavLink to="/events" exact>
                  <li className="nav-item nav-link active">Events</li>
                </NavLink>
                <NavLink to="/register">
                  <button type="button" className="btn btn-primary">
                    Register
                  </button>
                </NavLink>
                <NavLink to="/login">
                  <button type="button" className="btn btn-primary">
                    Login
                  </button>
                </NavLink>
                <div
                  type="button"
                  className="btn btn-primary"
                  name="logoutBtn"
                  onClick={this.onLogoutBtnClicked}
                >
                  Logout
                </div>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  }
}
export default SiteNav;
