import React, { Component } from "react";
// import Nav from "./services/SiteNav";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./LoginPage";
import Home from "./Home";
import AddContact from "./AddFriend";
import * as userService from "./services/userService";
import { withRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import GetFriends from "./getFriends";
// import SingleFriend from "./SingleFriend";
// import AddJob from "./AddJob";
// import Jobs from "./Jobs";
class App extends Component {
  componentDidMount() {
    const data = {
      email: "user@google.com",
      password: "Reactpassword123!",
      tenantId: "bootcamp2",
    };
    const payload = data;
    userService
      .login(payload)
      .then(this.onLogInSuccess)
      .catch(this.onLogInError);
  }
  onLogInSuccess = () => {
    console.log("Login Success @", new Date());
  };
  onLogInError = (err) => {
    console.error(err);
  };
  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let prevPath = prevProps.location.pathname;
    console.log("App", { currentPath, prevPath });
  }
  render() {
    return (
      <React.Fragment>
        {/* <Nav /> */}
        {/* <AddJob {...this.props}/>
        <Jobs {...this.props}/> */}
        <AddContact {...this.props} />
        <GetFriends {...this.props} /> 
        <Register {...this.props} />
        {/* <Home {...this.props} /> */}
        <Login {...this.props} /> 
        <div className="row m-3">
          <Route path="/login" exactly={true} component={Home}></Route>
          {/* <Route
            path="/register/:userName"
            exact={true}
            render={(props) => <Home userName={props.match.params.userName} />}
          ></Route> */}
          {/* <Route
            path="/friends"
            exact={true}
            component={GetFriends}
          ></Route> */}
          <Route
            path="/logout"
            exact={true}
            component={Login}
          ></Route>
          <Route
            path="/friends/:id(\d+)"
            exact={true}
            component={AddContact}
          ></Route>
          {/* <Route
            path="/friends/add"
            exact={true}
            component={AddContact}
          ></Route> */}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default withRouter(App);