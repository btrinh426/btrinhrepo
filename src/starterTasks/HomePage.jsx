import React from "react";
import userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap";

class HomePage extends React.Component {
  state = {
    user: {
      name: "",
      id: 0,
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-S5lrWUmvYOQMC2mXvDR59guR2Sb0gQ_U2EYHAqKVDI46X_l7x4QVVGvTvjeZjsV7Swg&usqp=CAU.js/100px250",
    },
  };

  componentDidMount() {
    // console.log("cheeeeeeeck");
    userService
      .current()
      .then((response) => this.getUserById(response.data.item.id))
      .catch(() => this.props.history.push("/userLogin"));
  }

  // currentUser = (e) => {
  //   e.preventDefault();
  //   userService.current().then(this.onActionSuccess).catch(this.onActionError);
  // };

  getUserById = (userId) => {
    userService
      .userById(userId)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };

  onActionSuccess = (response) => {
    this.setState({
      user: {
        name: response.data.item.firstName,
        id: response.data.item.id,
        avatarUrl: response.data.item.avatarUrl ?? this.state.user.avatarUrl,
      },
    });
  };

  onActionError = () => {
    toast.error("Denied", "Failure");
  };

  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Hello, {this.state.user.name}!</h1>
          <img src={this.state.user.avatarUrl} alt="Avatar" />
          <hr />
          <div className="col">{}</div>
        </div>
      </div>
    );
  }
}
export default HomePage;
