import React, { Component } from "react";
import NavBar from "./Components/NewNavBar";
import Footer from "./Components/NewFooter";
import Registration from "./Components/Register";
import LogIn from "./Components/LogIn";
// import Home from "./Components/home";
import Products from "./Components/products"
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";


class App extends Component {
    constructor(props) {
        super(props)
        this.state = { currentUser: { isLoggedIn: true } }
    }
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <NavBar></NavBar>
                    <Route path="/register" component={Registration} exact={true}></Route>
                    <Route path="/login" exact={true} component={LogIn}></Route>
                    <Route path="/products" exact={true} component={Products}></Route>
                    {/* <Home
                        {...this.props}
                        currentUser={this.state.currentUser}></Home> */}
                    <Footer></Footer>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;