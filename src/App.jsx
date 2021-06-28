import React, { Component } from "react";
import { Route } from "react-router-dom"; // also NavLinks when need

// import Jumbo from "./Jumbo.jsx";
// import Content from "./Content.jsx";
import Footer from "./Footer.jsx";
// import { userLogin } from "./components/userService";
// import Form from "./Form.jsx";
import Login from "./Login.jsx";

import "./App.css";
import NavBar from "./NavBar.jsx";
import Register from "./Register.jsx";
import WelcomeMessage from "./WelcomeMessage.js";
import AddFriend from "./AddFriend.jsx";
import Friends from "./Friends.jsx";
import ProductForm from "./ProductForm";

class App extends Component {
  defaultWelcome = "Welcome Guest";
  welcomeMessage = this.defaultWelcome;

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      userfirstName: "",
    };
  } // end constructor

  setLoggedIn = (person) => {
    if (person && person.userfirstName) {
      console.log("setLoggedIn", true);
      this.setState({ loggedIn: true, userfirstName: person.userfirstName });
    } else {
      console.log("setLoggedIn", false);
      this.setState({ loggedIn: false, userfirstName: "" });
    }
  };

  getWelcomeMessage() {
    if (this.state.loggedIn) {
      // return `Welcome ${this.state.userfirstName}`;
      return `Welcome ${this.state.userfirstName}`;
    } else {
      return this.defaultWelcome;
    }
  }

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
              <WelcomeMessage msg={this.getWelcomeMessage()}></WelcomeMessage>
            )}
          ></Route>

          <Route path="/addproduct" exact component={ProductForm} />

          <Route path="/people" exact={false} component={Friends} />

          <Route path="/addfriend" exact component={AddFriend} />

          <Route path="/register" exact component={Register} />

          <Route
            path="/login"
            exact
            render={(routeProps) => (
              <Login parentSetLogin={this.setLoggedIn}></Login>
            )}
          ></Route>
        </main>

        {/* <Route path="/footer" exact component={Footer} /> */}
        <Footer />
        {/* </BrowserRouter> */}
      </React.Fragment>
    );
  }
}

export default App;
