import React from "react";
import { withRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import UsersRegister from "./components/users/UsersRegister";
import UsersLogin from "./components/users/UsersLogin";
import Footer from "./components/Footer";
import * as usersService from "./services/usersService";
import "./App.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserInfo: {
        firstName: "",
        lastName: "",
        email: "",
        id: "",
        avatarUrl: "",
      },
      isLoggedIn: false,
    };
  }

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    console.log("App Update is firing", { currentPath, previousPath });

    //write if statement to verify if a user is logged in
  }

  componentDidMount() {
    //ajax call
    usersService
      .currentUser()
      .then(this.onGetCurrentSuccess)
      .catch(this.onGetCurrentError);
  }

  onGetCurrentError = (response) => {
    console.log("currentUser Error", response.response.statusText);
    console.log("currentUser Error", (typeof(response.response.statusText)));
    this.props.history.push("/login");

  };
  onGetCurrentSuccess = (response) => {
    console.log("currentUser Success", response);
    let data = response.data.item.id;
    console.log("ID", data);
    usersService
      .getById(data)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetByIdError);
  };
  onGetByIdError = (response) => {
    console.log("getById Error", response);
  };
  onGetByIdSuccess = (response) => {
    console.log("getById Success", response);

    let tempState = {...this.state};

    tempState.currentUserInfo = response.data.item;
    tempState.isLoggedIn = true;

    console.log("tempState", tempState);

    this.setState(tempState);
  }
  render() {

    

    return (
      <React.Fragment>
        <NavBar
          {...this.props}
          userName={this.state.currentUserInfo.firstName }
          userImg={this.state.currentUserInfo.avatarUrl}
          userStatus={this.state.isLoggedIn}
        />
        <main role="main">
        <Route
            path="/home"
            exact={true}
            component={Home}
          />
          <Route
            path="/login"
            exact={true}
            component={UsersLogin}
          />
          <Route
            path="/register"
            exact={true}
            component={UsersRegister}
          />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
