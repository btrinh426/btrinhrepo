import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Fruits from "./Fruits";
import WelcomeMessage from "./WelcomeMessage";
import logo from "./logo.svg";
import "./App.css";
import Disney from "./Disney";

class App extends React.Component {
  state = {
    currentUser: {
      firstName: "Mickey",
      lastName: "Mouse",
      friends: [{ name: "Minnie" }, { name: "Pluto" }],
      age: 80,
    },
    other: { prop: "Same" },
    somethingElse: "Same",
  };

  sayHello = (msg) => {
    console.log(msg);
  };

  componentDidMount() {
    console.log("componentDidMount");

    // // object argument {{ currentUser: newUser, apples: "I love apples" }}
    // var newUser = { ...this.state.currentUser };
    // newUser.firstName = "Michael";
    // this.setState({ currentUser: newUser, apples: "I love apples" });

    this.setState((prevState) => {
      let currentUser = { ...prevState.currentUser };
      currentUser.firstName = "Michael";

      const newFriends = [...currentUser.friends, { name: "Goofy" }];
      currentUser.friends = newFriends;

      return { currentUser };
    });
  }

  render() {
    this.sayHello("From App.jsx");

    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <div>
              <NavLink to="/fruits">Go to Fruits</NavLink>
            </div>
            <div>
              <NavLink to="/Disney">Go to Disney</NavLink>
            </div>
            <div>
              <a href="/something">Go</a>
            </div>
            <img src={logo} className="App-logo" alt="logo" />
            <div>
              <Route path="/fruits" exact={true} component={Fruits}></Route>
              <Route
                path="/fruits"
                exact={true}
                render={() => (
                  <WelcomeMessage
                    user={this.state.currentUser}
                    extra={"I Love routing"}
                    end="GoodBye."
                  ></WelcomeMessage>
                )}
              ></Route>

              <Route
                path="/disney"
                exact={true}
                render={(routeProps) => (
                  <Disney
                    friend={this.state.currentUser}
                    showGreeting={this.sayHello}
                    {...routeProps}
                  ></Disney>
                )}
              ></Route>
              <div></div>
            </div>
            <div>
              <p>Hello World, I love code</p>
              {/* <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a> */}
            </div>
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
