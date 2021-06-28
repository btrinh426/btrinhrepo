import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import "./App.css";
import SiteNav from "./components/SiteNav";
import Jumbo from "./components/Jumbo";
import Content from "./components/Content";
import Entities from "./components/Entities";
import Footer from "./components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div>
            <header>
              <NavLink to="/siteNav">Go to Navbar </NavLink>
              <NavLink to="/jumbo">Go to Jumbotron </NavLink>
              <NavLink to="/content">Go to Content </NavLink>
              <NavLink to="/entities">Go to Entities </NavLink>
              <NavLink to="/footer">Go to Footer</NavLink>
            </header>
          </div>
          <Route path="/siteNav" component={SiteNav}></Route>
          <main role="main">
            <Route path="/jumbo" component={Jumbo}></Route>
            <Route path="/content" component={Content}></Route>
          </main>
          <Route path="/entities" component={Entities}></Route>
          <Route path="/footer" component={Footer}></Route>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
