import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as userServices from "../services/userServices";
import { Redirect } from "react-router-dom";

class Home extends React.Component {
  state = {
    name: "Login Here..",
    image: "",
    currentUser: {},
  };

  componentDidMount() {
    userServices
      .currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
  }

  getById = (id) => {
    userServices
      .getById(id)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetByIdError);
  };

  logOutUser = () => {
    // userServices
    //   .logOutUser()
    //   .then(this.onLogOutUserSuccess)
    //   .catch(this.onLogOutUserError);

    this.props.history.push("/login");
  };

  onCurrentUserSuccess = (response) => {
    console.log("onCurrentUserSuccess response firing..", response.data.item);
    const currentUser = response.data.item;
    this.getById(currentUser.id);
  };

  onCurrentUserError = (response) => {
    console.warn({ error: response });
  };

  onGetByIdSuccess = (response) => {
    console.log("onGetByIdSuccess response firing..", response.data.item);
    this.setState({
      name: `${response.data.item.firstName} ${response.data.item.lastName}`,
    });
  };

  onGetByIdError = (response) => console.warn({ error: response });

  onLogOutUserSuccess = (response) => {
    console.log(response);
    this.setState({ redirect: true });
  };

  onLogOutUserError = (response) => console.warn({ error: response });

  logOutButton = (e) => {
    e.preventDefault();
    console.log("clicked logout button");

    this.logOutUser();
  };

  handleLinkClick = (e) => {
    // e.preventDefault();
    // console.log("event", e.currentTarget.id);
    const { id } = e.currentTarget;
    this.props.history.push(`/${id}`);
  };

  render() {
    const { name } = this.state;
    return (
      <div className="container pt-0 pb-5 ml-0">
        <ToastContainer />
        <div
          style={{
            display: "flex",
            minHeight: "75vh",
          }}
        >
          <div
            style={{
              minHeight: "100%",
              padding: 5,
              marginRight: 25,
            }}
          >
            <ul>
              <a href="">
                <li
                  className="homeLinks"
                  onClick={this.handleLinkClick}
                  id="register"
                >
                  Register Link
                </li>
              </a>
              <a href="">
                <li
                  className="homeLinks"
                  onClick={this.handleLinkClick}
                  id="login"
                >
                  Login
                </li>
              </a>
              <li className="homeLinks">Friends Link</li>
              <li className="homeLinks">Blogs Link</li>
              <li className="homeLinks">Tech Companies Link</li>
              <li className="homeLinks">Jobs Link</li>
              <li className="homeLinks">Events Link</li>
            </ul>
          </div>
          <form className="card">
            <h1> {`Welcome! ${name}`} </h1>
            <button type="button" onClick={this.logOutButton}>
              Logout
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
