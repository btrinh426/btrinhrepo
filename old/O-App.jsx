import React from "react";
import { withRouter, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Content from "./Content";
import Content2 from "./Content2";
import Content3 from "./Content3";
import Footer from "./Footer";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      food: {
        fruit: "apples",
        vegetables: "carrots",
        meat: "beef",
        dairy: "milk",
        snacks: "chips",
      },
      hasHunger: true,
    };
  }

  componentDidUpdate(prevProps) {
    console.log("App level update");
    console.log("App level - Prev Props Location is ", prevProps.location);
    console.log("App level - current Props Location is ", this.props.location);

    if (this.props.location !== prevProps.location) {
      console.log("Previous Props Changed");
    }

    if (this.props.location.state.signedInStatus === "login") {
      console.log("login performed");
    }

    if (this.props.location.state.signedInStatus === "Logged the fuck out") {
      console.log("log out performed");
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar {...this.props} fruit={this.state.food.fruit} />
        <main role="main">
          <Home vegetables={this.state.food.vegetables} />
          {/* <Route path="/home" exact={true} component={Home} /> */}
          {/* <Route
            path="/content"
            exact={true}
            component={Content}
            meat={this.state.food.meat}
          /> */}
          <div className="container">
            <div className="row">
              <Route path="/content" exact={true}>
                <Content meat={this.state.food.meat} {...this.props} />
              </Route>
              <Route path="/content2" exact={true}>
                <Content2 dairy={this.state.food.dairy} {...this.props} />
              </Route>
              <Route path="/content3" exact={true}>
                <Content3 snacks={this.state.food.snacks} {...this.props} />
              </Route>
            </div>
          </div>
        </main>
        <Route path="/footer" exact={true} component={Footer} />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
