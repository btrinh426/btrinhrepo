import React, { Component } from "react";

import "./App.css";

import Footer from "./components/Footer";

import SiteNav from "./components/SiteNav";

import Jumbo from "./components/Jumbo";

import FirstThreeCircles from "./components/Circles1-3";

import NextThreeCircles from "./components/Circles4-6";

import LastThreeCircles from "./components/Circles7-9";

import Login from "./components/Login";

import Register from "./components/Register";

import Friends from "./components/Friends";

import AddFriends from "./components/AddFriends";

import { withRouter } from "react-router-dom";

import { BrowserRouter, Route } from "react-router-dom";

import ProductsService from "./services/ProductsService";

import { toast } from "react-toastify";

import Cars from "./components/Cars";

class App extends Component {
  state = {
    currentUser: {},
  };
  componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;

    console.log("App", { currentPath, previousPath });
  }

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue =
      currentTarget.type === "number"
        ? currentTarget.valueAsNumber
        : currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let product = { ...this.state.product };

      product[inputName] = newValue;

      return { product };
    });
  };

  onAddProductClicked = (e) => {
    e.preventDefault();
    const data = this.state.product;
    ProductsService.addProduct(data)
      .then(this.onAddProductSuccess)
      .catch(this.onAddProductError);
    console.log("Add Product was clicked");
  };

  onAddProductSuccess = (response) => {
    console.log(response.data.item);
    toast.success("Product Id : " + response.data.item + " was created.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onAddProductError = (err) => {
    toast.warning("Add Product was unsuccessful");
  };

  render() {
    console.log("rendering app");
    return (
      <BrowserRouter>
        <React.Fragment>
          <SiteNav></SiteNav>
          <div></div>

          <main role="main">
            <div className="jumbotron">
              <div className="container">
                <Jumbo></Jumbo>
                {/* <h1 className="display-3">Hello, world!</h1>
              <p>
                This is a template for a simple marketing or informational
                website. It includes a large callout called a jumbotron and
                three supporting pieces of content. Use it as a starting point
                to create something more unique.
              </p>
              <p>
                <button className="btn btn-primary btn-lg">
                  Learn more &raquo;
                </button>
              </p> */}
              </div>
            </div>

            <div className="container">
              <div className="row">
                <Route
                  path="/Circles1-3"
                  exact={true}
                  component={FirstThreeCircles}
                ></Route>
                <Route
                  path="/Circles4-6"
                  exact={true}
                  component={NextThreeCircles}
                ></Route>
                <Route
                  path="/Circles7-9"
                  exact={true}
                  component={LastThreeCircles}
                ></Route>
                <Route path="/Login" exact={true} component={Login}></Route>
                <Route
                  path="/Register"
                  exact={true}
                  component={Register}
                ></Route>
                <Route path="/Friends" exact={true} component={Friends}></Route>
                <Route
                  path="/AddFriends"
                  exact={true}
                  component={AddFriends}
                ></Route>
                <Route
                  path="/AddFriends/:friendId(\d+)/edit"
                  exact={true}
                  render={(routeProps) => (
                    <AddFriends {...routeProps} user={this.state.currentUser} />
                  )}
                />
                <Route
                  path="/Friends/&q="
                  exact={true}
                  render={(routeProps) => (
                    <Friends {...routeProps} user={this.state.currentUser} />
                  )}
                />
                <Route path="/Cars" exact={true} component={Cars} />
              </div>
              <hr />
            </div>
          </main>

          <footer className="container">
            <Footer></Footer>
            {/* <p>&copy; Sabio 2019-2020</p> */}
          </footer>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default withRouter(App);
