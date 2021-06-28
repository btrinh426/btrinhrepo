import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar.jsx";
import WelcomeMessage from "./components/WelcomeMessage.js";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import AddFriend from "./components/AddFriend.jsx";
import Friends from "./components/Friends.jsx";
import ProductForm from "./components/ProductForm.jsx";
import JobForm from "./components/JobForm.jsx";
import ShowJobs from "./components/ShowJobs";
import ShowJobDetails from "./components/ShowJobDetails";
import Footer from "./components/Footer";
import ShowTechCompanies from "./components/ShowTechCompanies";
import TechCompanyForm from "./components/TechCompanyForm";

class App extends Component {
  defaultWelcomeMsg = "Welcome Guest";

  state = {
    loggedIn: false,
    welcomeMsg: this.defaultWelcomeMsg,
  };

  setLoggedIn = (person) => {
    if (person && person.userfirstName) {
      this.setState({
        loggedIn: true,
        welcomeMsg: `Welcome ${person.userfirstName}`,
      });
    } else {
      this.setState({ loggedIn: false, welcomeMsg: this.defaultWelcomeMsg });
    }
  };

  // JTG - change to login form to allow user to login when start application
  //       but need history which lives in NavBar
  componentDidMount() {
    // this.props.history.push("/login");
  }

  render() {
    return (
      <React.Fragment>
        {/* <BrowserRouter> */}
        <NavBar
          parentSetLogin={this.setLoggedIn}
          isLoggedIn={this.state.loggedIn}
        />
        {/* <Route path="/navbar" exact={true} component={NavBar} /> */}

        <main role="main">
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <Route
            path="/"
            exact
            render={(routeProps) => (
              <WelcomeMessage msg={this.state.welcomeMsg}></WelcomeMessage>
            )}
          ></Route>
          <Route path="/register" exact component={Register} />
          <Route
            path="/login"
            exact
            render={(routeProps) => (
              <Login parentSetLogin={this.setLoggedIn}></Login>
            )}
          ></Route>
          <Route path="/techcompanies" exact component={ShowTechCompanies} />
          <Route path="/techcompanies/form" component={TechCompanyForm} />
          <Route path="/jobs/form" exact component={JobForm} />
          <Route path="/jobs" exact component={ShowJobs} />

          {/* // without regex, app can't distinguish between "/jobs/form" and "jobs/:id" */}
          {/* fix to /jobs/details?jobId=:id&companyId=:id */}
          <Route
            path="/jobs/details/:id/:id"
            exact
            component={ShowJobDetails}
          />

          <Route path="/products/new" exact component={ProductForm} />
          <Route path="/friends/new" exact component={AddFriend} />
          <Route path="/friends" exact component={Friends} />
          <Route path="/friends/:id/edit" exact component={AddFriend} />
        </main>

        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
