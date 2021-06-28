import React from "react";
import Welcome from "../WelcomeMessage";
import * as userServices from "../../services/userServices";

class Home extends React.Component {
  //constructor for state
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      id: "",
      name: "",
      roles: "",
      tenantId: "",
      siteId: "",
    };
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    userServices
      .userLogout()
      .then(this.onLogoutSuccess)
      .catch(this.onLogoutError);
  };

  onLogoutSuccess = (response) => {
    this.props.history.push("/login");
  };

  onLogoutError = (response) => {
    console.log(response);
  };

  //get current user
  currentUser = (user) => {
    this.setState(() => {
      let currentUser = { ...this.state.currentUser };
      currentUser.id = user.id;
      currentUser.name = user.name;
      currentUser.roles = user.roles;
      currentUser.tenantId = user.tenantId;
      currentUser.siteId = user.siteId;
      currentUser.loggedIn = true;

      return { currentUser };
    });
  };

  //success handler
  callCurrentUserSuccess = (response) => {
    let currentUser = response.data.item;
    this.currentUser(currentUser);
  };

  //error handler
  callCurrentUserError = (response) => {
    console.warn(response);
    this.props.history.push("/login");
  };

  componentDidMount() {
    userServices
      .currentUser()
      .then(this.callCurrentUserSuccess)
      .catch(this.callCurrentUserError);
  }

  onFriendSearchSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col" style={{ marginBottom: "125px" }}>
            <Welcome name={this.state.currentUser.name} />
            <button
              className="btn btn-danger btn-block"
              onClick={this.onLogoutClick}
            >
              Log Out
            </button>
          </div>
          <div className="col">
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-info my-2 my-sm-0"
                type="submit"
                onClick={this.onFriendSearchSubmit}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
