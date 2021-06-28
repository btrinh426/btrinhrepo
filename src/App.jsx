import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Cars from "./components/Cars"; // <----------------------------assessment
import Content from "./components/Content";
import Footer from "./components/Footer";
import Friends from "./components/Friends";
import CreateFriend from "./components/CreateFriend";
import CreateJob from "./components/CreateJob";
import Jumbo from "./components/Jumbo";
import Jobs from "./components/Jobs";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import NavBar from "./components/NavBar";
import ProductForm from "./components/ProductForm"; //for exam
import Register from "./components/Register";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <NavBar />
          <main style={{ marginTop: "80px" }}>
            <Route path="/" exact={true} component={Home} />
            <Route path="/cars" exact={true} component={Cars} />{" "}
            {/* <-----for exam */}
            <Route path="/content" exact={true} component={Content} />
            <Route path="/friends" exact={true} component={Friends} />
            <Route
              path="/friends/:id(\d+)"
              exact={true}
              component={CreateFriend}
            />
            <Route
              path="/friends/createfriend"
              exact={true}
              component={CreateFriend}
            />
            <Route path="/jumbo" exact={true} component={Jumbo} />
            <Route path="/jobs" exact={true} component={Jobs} />
            <Route path="/jobs/:id(\d+)" exact={true} component={CreateJob} />
            <Route path="/jobs/createjob" exact={true} component={CreateJob} />
            <Route path="/login" exact={true} component={LogIn} />
            <Route
              path="/productform"
              exact={true}
              component={ProductForm}
            />{" "}
            {/*For exam*/}
            <Route path="/register" exact={true} component={Register} />
          </main>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
