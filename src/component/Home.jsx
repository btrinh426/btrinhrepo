import React from "react";
import Jumbo from "./Jumbo";
import Content from "./Content";
import * as userService from "../services/userService";
import { Button } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class Home extends React.Component {
  state = { user: { firstName: "", lastName: "" } };

  componentDidUpdate(prevProps, prevState) {
    console.log("Previous Props", prevProps);
    console.log("Current Props", this.props);
  }

  componentDidMount() {
    userService
      .getCurrent()
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }
  notify = () => toast("You are logged out!");

  onActionSuccess = (response) => {
    let currentId = response.data.item.id;
    console.log(currentId);
    userService
      .getById(currentId)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetByIdError);
  };
  onActionError = (errResponse) => {
    console.log(errResponse);
  };
  onGetByIdSuccess = (response) => {
    let fName = response.data.item.firstName;
    let lName = response.data.item.lastName;
    let userId = response.data.item.id;

    this.setState(() => {
      let user = {};
      user.firstName = fName;
      user.lastName = lName;
      user.id = userId;
      console.log(user);

      return { user };
    });
  };
  onGetByIdError = (errResponse) => {
    console.log(errResponse);
  };
  onLogOutClicked = (e) => {
    e.preventDefault();
    this.notify();
    userService.logOut().then(this.props.history.push("/login"));
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="p-5">
          Welcome {this.state.user.firstName} {this.state.user.lastName}
        </h1>
        <div>
          <Button
            className="mx-5 mb-5"
            onClick={this.onLogOutClicked}
            color="primary"
          >
            Log Out
          </Button>
        </div>
        <Jumbo></Jumbo>
        <Content></Content>
      </React.Fragment>
    );
  }
}

export default Home;
