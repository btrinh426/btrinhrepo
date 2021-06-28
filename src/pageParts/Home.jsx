import React from "react";
import * as userService from "../services/userService";

class Home extends React.Component {
  state = {
    userData: {
      id: "",
      name: "",
      roles: "",
      tenantId: "",
      siteId: "",
    },
    //isLoggedIn: false,
    //greeting: "Please Login or Register as a New user",
  };
  componentDidMount() {
    console.log("Home mounted");

    userService
      .getCurrentUser()
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  }

  onActionSuccess = (response) => {
    console.log("it worked!");
    console.log(response.data.item);
    let newValues = response.data.item;

    this.setState(() => {
      let newState = { ...this.state.userData };
      newState = newValues;
      //newState.firstName = newValue;
      console.log({ newState });

      return {
        userData: newState,
        isLoggedIn: true,
      };
    });
  };

  onActionError = (errResponse) => {
    console.log("it didnt work [not logged in on home]");
  };

  render() {
    return (
      <div className=" bg-text container col-md-6">
        <div className="container">
          {/*<h2>{this.state.greeting}</h2>*/}
          <Greeting isLoggedIn={this.state} uName={this.state.userData.name} />
          <button id="loginPage" className="btn btn-primary">
            Im just here for show right now :)
          </button>
        </div>
        <p />
      </div>
    );
  }
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  //const logIn = isLoggedin.isLoggedIn;
  //console.log(logIn);
  const uName = props.uName;
  console.log(uName);
  if (isLoggedIn.isLoggedIn === true) {
    return <UserGreeting uName={props.uName} />;
  }
  return <GuestGreeting />;
}
function UserGreeting(props) {
  const uName = props.uName;
  return <h1>Welcome back {uName}</h1>;
}

function GuestGreeting(props) {
  return (
    <React.Fragment>
      <h1>Howdy Stranger</h1>
      <p>Please Login or Register as a new user to continue</p>
    </React.Fragment>
  );
}

export default Home;
