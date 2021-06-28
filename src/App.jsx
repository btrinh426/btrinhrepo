import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./App.css";
import Register from "./Component/Register";
import Content from "./Component/Content";
import SiteNav from "./Component/SiteNav";
import Jumbo from "./Component/Jumbo";
import Footer from "./Component/Footer";
import Login from "./Component/Login";
import Home from "./Component/Home";
import CreateContact from "./Component/CreateContact";
import Friends from "./Component/Friends";
import CreateJob from "./Component/Jobs/CreateJob";
import Form from "./Component/Form";
import Fundamentals from "./Component/Fundamentals";
import Students from "./Component/student/Students";
import Job from "./Component/Jobs/Job";

import Presidents from "./Component/Presidents";
import Dealership from "./Assessment/Showroom";
import Type from "./Component/Types/Type";
import Cart from "./Component/features/Cart";
import Buttons from "./Buttons";
import Product from "./Component/Product";
import Showroom from "./Assessment/Showroom";
// import Type from "./Component/Types/Type";
// import DogForm from "./Component/DogForm";

class App extends React.Component {
  state = { currentUser: { isLoggenIn: true } };

  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;
    console.log("App", { currentPath, previousPath });

    const { state: propState } = this.props.location;

    if (
      propState &&
      propState.type === "LOGOUT" &&
      this.state.currentUser.isLoggedIn
    ) {
      console.log("I should be logging out.");
      this.setState(() => {
        return { currentUser: { isLoggedIn: false } };
      });
    }
  }

  render() {
    console.log("Rendering App");
    return (
      <React.Fragment>
        <Router>
          <SiteNav />
          <div style={{ marginTop: "40px" }}>
            <Route path="/register" exact={true} component={Register} />
            <Route path="/content" exact={true} component={Content} />
            <Route path="/jumbo" exact={true} component={Jumbo} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/home" exact={true} component={Home} />

            <Route
              path="/createcontact"
              exact={true}
              component={CreateContact}
            />
            <Route
              path="/friends/:id/edit"
              exact={true}
              component={CreateContact}
            />

            <Route path="/friends" exact={true} component={Friends} />

            <Route path="/Job" exact={true} component={Job} />

            <Route path="/CreateJob" exact={true} component={CreateJob} />

            <Route path="/form" exact={true} component={Form} />

            <Route path="/fundamentals" exact={true} component={Fundamentals} />

            <Route path="/students" exact={true} component={Students} />

            <Route path="/type" exact={true} component={Type} />

            <Route path="/showroom" exact={true} component={Showroom} />

            <Route path="/presidents" exact={true} component={Presidents} />
            {/* <Route path="/dogform" exact={true} component={DogForm} /> */}

            <main role="main">
              <div className="container">
                <div className="row m-3">
                  <Buttons {...this.props}></Buttons>
                </div>
                <div className="row m-3">
                  <Route path="/cart" exact={true} component={Cart}></Route>
                  <Route
                    path="/product/:productId(\d+)"
                    exact={true}
                    component={Product}
                  ></Route>
                </div>
              </div>
            </main>

            {/* <div className="container">
              <Route
                path={["/", "/show"]}
                exact
                render={() => {
                  return (
                    <div className="row m-3">
                      <Buttons
                        {...this.props}
                        currentUser={this.state.currentUser}
                      ></Buttons>
                    </div>
                  );
                }}
              ></Route>
            </div> */}

            {/* <div className="App">
            <Students />
            <Type />
          </div> */}

            {/* <div className="App">
              <Cart />
              <Buttons />
            </div> */}

            {/* <main role="main">
            <div className="container">
              <Dealership />
              <hr />
            </div>
            </main> */}
          </div>
          <Footer />
        </Router>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
