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
// import Presidents from "./Component/Presidents";
import Dealership from "./Component/Dealership";

// import Friends from "./Component/Friends";

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
            {/* <Route path="/product" exact={true} component={Product} /> */}
            {/* <Route path="/car" exact={true} component={Car} /> */}
            {/* <Route path="/presidents" exact={true} component={Presidents} /> */}
          </div>

          <main role="main">
            <div className="container">
              <Dealership />
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
