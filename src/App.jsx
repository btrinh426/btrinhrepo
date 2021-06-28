import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Register from "./Component/Register";
import Content from "./Component/Content";
import SiteNav from "./Component/SiteNav";
import Jumbo from "./Component/Jumbo";
import Footer from "./Component/Footer";
import Login from "./Component/Login";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <SiteNav />
          <div>
            <Route path="/register" exact={true} component={Register} />
            <Route path="/content" exact={true} component={Content} />
            {/* <Route path="/SiteNav" exact={true} Component={SiteNav} /> */}
            <Route path="/jumbo" exact={true} component={Jumbo} />
            {/* <Route path="/Footer" exact={true} Component={Footer} /> */}
            <Route path="/login" exact={true} component={Login} />
            {/* <Route path="/product" exact={true} component={Product} /> */}
            {/* <Route path="/cars" exact={true} component={Cars} /> */}
          </div>

          <main role="main">
            <div className="container">
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
