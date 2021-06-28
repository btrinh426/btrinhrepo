import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import NewForm from "./components/NewForm";
import Register from "./components/Register";
import AddFriend from "./components/AddFriend";
import HomePage from "./components/HomePage";
import Friends from "./components/Friends";
import TechCompanies from "./components/TechCompanies";
import Blogs from "./components/Blogs";
import Events from "./components/Events";
import Jobs from "./components/Jobs";
import Logout from "./components/Logout";
import "bootstrap/dist/css/bootstrap.min.css";
import Cars from "./components/Assessments/Cars";

import { withRouter, BrowserRouter, Route, NavLink } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <NavBar {...this.props}></NavBar>
          <main>
            <div className="row">
              <NavLink to="/cars">
                <h1>Go to Cars!!</h1>
              </NavLink>
              <Route path="/" exact={true} component={NewForm}></Route>

              <Route
                path="/addfriend"
                exact={true}
                component={AddFriend}
              ></Route>

              <Route path="/homepage" exact={true} component={HomePage}></Route>
              <Route path="/register" exact={true} component={Register}></Route>
              <Route path="/friends" exact={true} component={Friends}></Route>
              <Route path="/blogs" exact={true} component={Blogs}></Route>
              <Route
                path="/techcompanies"
                exact={true}
                component={TechCompanies}
              ></Route>
              <Route path="/cars" exact={true} component={Cars}></Route>
              <Route path="/jobs" exact={true} component={Jobs}></Route>
              <Route path="/events" exact={true} component={Events}></Route>
              <Route path="/logout" exact={true} component={Logout}></Route>
            </div>
          </main>
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
