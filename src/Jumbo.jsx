import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Form from "./RegisterUser";
import LoginPage from "./LoginPage";
import Home from "./Home";
import People from "./People";
import RegisterPeople from "./RegisterPeople";

class Jumbo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <div className="container">
            <div>
              <Route path="/form" exact component={Form}></Route>
              <Route path="/LoginPage" exact component={LoginPage}></Route>
              <Route path="/home" exact component={Home}></Route>
              <Route
                path="/people/new"
                exact
                component={RegisterPeople}
              ></Route>
              <Route
                path="/people/edit/:id"
                exact
                component={RegisterPeople}
              ></Route>
              <Route path="/listpeople" exact component={People}></Route>
              <Route path="/blogs" exact></Route>
              <Route path="/techcompanies" exact></Route>
              <Route path="/jobs" exact></Route>
              <Route path="/events" exact></Route>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Jumbo;
