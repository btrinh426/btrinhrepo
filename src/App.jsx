import React, { Component } from "react";
import SiteNav from "./SiteNav";
import Jumbo from "./Jumbo";
import Content from "./Content";
import Footer from "./Footer";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div>
            <p>""</p>
            <p>""</p>
          </div>
          {/* <SiteNav></SiteNav> */}
          <Route path="/SiteNav" component={SiteNav}></Route>
          {/* <Jumbo></Jumbo> */}
          <Route path="/Jumbo" component={Jumbo}></Route>
          <div>
            <Route path="/Content" exact={true} component={Content}></Route>
          </div>
          <Footer></Footer>
          <div>
            <NavLink to="/SiteNav">
              <button
                className="btn btn-outline-primary"
                onClick={this.onNewButtonClicked}
              >
                Show Navigation &raquo;
              </button>
            </NavLink>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
