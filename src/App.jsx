import React from "react";
import { withRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import UsersRegister from "./components/users/UsersRegister";
import UsersLogin from "./components/users/UsersLogin";
import * as usersService from "./services/usersService";
import FriendForm from "./components/friends/FriendForm";
import Friends from "./components/friends/Friends";
import Events from "./components/events/Events";
import Footer from "./components/Footer";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "reactstrap";
import debug from "debug";
import EventModal from "./components/events/EventModal";
import ModalStrapExample from "./components/events/ModalStrapExample";
import FriendFormik from "./components/friends/FriendFormik";

class App extends React.Component {
  state = {
    currentUserInfo: {
      firstName: "Philip",
      lastName: "Fry",
      email: "pfry@pe.com",
      id: "3846",
      avatarUrl:
        "https://findicons.com/files/icons/1316/futurama_vol_1/256/fry.png",
    },
    // formData: {
    //   id: 1,
    //   name: "Flapjack",
    //   breed: "Corgi",
    //   weight: "30",
    //   birthDate: "01/01/2014",
    //   gender: "F",
    //   isNeutered: true,
    //   isMicrochipped: false,
    // },
  };

  componentDidMount() {
    //ajax call
    console.log("Fix request for currentUser");
    usersService
      .pingTest()
      .then(this.onPingTestSuccess)
      .catch(this.onPingTestError);
    // usersService
    //   .currentUser()
    //   .then(this.onGetCurrentSuccess)
    //   .catch(this.onGetCurrentError);
  }

  onPingTestError = (err) => {
    console.log(err);
  };

  onPingTestSuccess = (response) => {
    console.log("onPingTestSuccess is firing with response: ", response);
  };

  componentDidUpdate(prevProps) {
    console.log("App Just Updated");

    // if (this.state.currentUserInfo.id !== "") {
    //   console.log("We're going to need to set state, friend.");

    //   usersService
    //     .getById(data)
    //     .then(this.onGetByIdSuccess)
    //     .catch(this.onGetByIdError);
    // }

    // usersService
    //   .currentUser()
    //   .then(this.onGetCurrentSuccess)
    //   .catch(this.onGetCurrentError);

    // if (this.props.location.state) {
    //   // if (this.props.location !== prevProps.location) {
    //   //   console.log("Previous Props Changed");
    //   // }
    //   if (this.props.location.state.status === "login") {
    //     console.log("login performed");
    //     let data = this.props.location.state.data;
    //     console.log("This is the login info: ", data);
    //     login(data).then(this.onLoginSuccess).catch(this.onLoginError);
    //   } else if (this.props.location.state.status === "logout") {
    //     console.log("log out performed");
    //     this.props.history.push({ status: "logged-out" });
    //     logout().then(this.onLogoutSuccess).catch(this.onLogoutError);
    //   }
    // }
  }

  onGetCurrentError = (response) => {
    let notify = () =>
      toast.error(`${response.response.statusText}, please login`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    notify();

    this.props.history.push("./login");
  };
  onGetCurrentSuccess = (response) => {
    let data = response.data.item.id;
    console.log(
      "ID",
      data,
      "Current State info",
      this.state.currentUserInfo.id
    );

    if (data !== this.state.currentUserInfo.id) {
      console.log("We're going to need to set state, friend.");

      usersService
        .getById(data)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetByIdError);
    }
  };

  onGetByIdError = (response) => {
    console.log("getById Error", response);
  };
  onGetByIdSuccess = (response) => {
    console.log("onGetById", response);

    this.setState((prevProps) => {
      let newState = {
        ...prevProps,
        currentUserInfo: response.data.item,
      };
      return newState;
    });
  };
  render() {
    return (
      <React.Fragment>
        <NavBar
          {...this.props}
          userName={this.state.currentUserInfo.firstName}
          userImg={this.state.currentUserInfo.avatarUrl}
        />
        <main role="main">
          {/* <EventModal />
          <ModalStrapExample /> */}
          {/* <FriendFormik {...this.props} formData={this.state.formData} /> */}
          {/* <Route path="/" exact={true} component={Home} /> */}
          <Route path="/login" exact={true} component={UsersLogin} />
          <Route path="/register" exact={true} component={UsersRegister} />
          <Route path="/friends" exact={false} component={Friends} />
          {/* <Route path="/friendsadd" exact={true}>
            <FriendFormik formData={this.state.formData} />
          </Route> */}
          {/* <Route
            path="/friends/:friendId(\d+)"
            exact={true}
            component={FriendForm}
          /> */}
          <Route path="/events" exact={true} component={Events} />
          {/* <div className="container-fluid p-5">
            <div className="d-flex justify-content-start">
              <div className="row d-flex pl-5">
                <Test />
              </div>
            </div>
          </div> */}
          {/* <Route path="/test" exact={true} render={(props) = > <TestComponent {...this.props} />} */}
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
