import React from "react";
import * as userService from "../services/userService";

class Home extends React.Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       userInfo: {},
  // //     };
  //     console.log("in constructor");
  //     //this.getUser(this.props.currentUser.id);
  //     console.log(this.props.currentUser.id);
  //   }
  componentDidMount() {
    console.log("Home mounted");
    //this.getUser(this.props.currentUser.id);
  }

  getUser = (uId) => {
    console.log("in get user by id");
    userService
      .getUserById(uId)
      .then(this.onGetByIdSuccess)
      .catch(this.onByIdError);
  };

  onGetByIdSuccess = (response) => {
    console.log(response.data.item);
    // // two set state syntaxes

    // this.setState({ userInfo: response.data.item });
    // this.setState((prevState) => {
    //   let newState = { ...this.state };
    //   let userInfo = response.data.item;

    //   return { prevState, newState: userInfo };
    // });
  };

  onByIdError = (response) => {
    console.log("error");
  };

  onClick = (e) => {
    console.log("getting in here");
    console.log(this.props.history);
    this.props.history.push("/register");
  };

  render() {
    return (
      <div className=" bg-text container col-md-6">
        <div className="container">
          {this.props.isLoggedIn ? (
            <h1>
              {/* {this.getUser(this.props.currentUser.id)} */}
              Welcome back {this.props.currentUser.name}
            </h1>
          ) : (
            <React.Fragment>
              <h1>Howdy Stranger</h1>
              <p>Please login or register as a new user</p>
              <br />
              <button
                className="btn btn-primary"
                name="registerBtn"
                onClick={this.onClick}
              >
                Click here to register as a new user
              </button>
            </React.Fragment>
          )}
        </div>
        <p />
      </div>
    );
  }
}

export default Home;
