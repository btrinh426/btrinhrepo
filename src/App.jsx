import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
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
import Form from "./Component/Form";
// import SingleFriend from "./Component/SingleFriend";
// import Presidents from "./Component/Presidents";
// import Dealership from "./Component/Dealership";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <SiteNav />
          <div>
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
            <Route path="/friends" exact={true} component={Friends} />
            <Route path="/form" exact={true} component={Form} />
            {/* <Route path="/product" exact={true} component={Product} /> */}
            {/* <Route path="/cars" exact={true} component={Dealership} /> */}
            {/* <Route path="/presidents" exact={true} component={Presidents} /> */}
          </div>
          <main role="main">
            <div className="container">
              {/* <Dealership /> */}
              <hr />
            </div>
          </main>

          <Footer />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
