import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Form from "./RegisterUser";
import LoginPage from "./LoginPage";
import Home from "./Home";
import People from "./People";
import RegisterPeople from "./RegisterPeople";
import AddJob from "./AddJob";
import Jobs from "./Jobs";
import AddCompany from "./AddCompany";
import Companies from "./Companies";
import AddEvent from "./EventComponent/AddEvent";
import Events from "./EventComponent/Events";
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
              <Route path="/event/edit/:id" exact component={AddEvent}></Route>
              <Route path="/listpeople" exact component={People}></Route>
              <Route path="/listjobs" exact component={Jobs}></Route>
              <Route path="/techcompanies" component={AddCompany}></Route>
              <Route path="/new/job" component={AddJob}></Route>
              <Route path="/jobs/form/jobId=:id" component={AddJob}></Route>
              <Route path="/events" exact component={Events}></Route>
              <Route path="/listcompanies" exact component={Companies}></Route>
              <Route path="/event/new" exact component={AddEvent}></Route>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Jumbo;
