import React, { Component } from "react";
import NavBar from "./Components/NewNavBar";
import Footer from "./Components/NewFooter";
import Registration from "./Components/Register";
import LogIn from "./Components/LogIn";
import Home from "./Components/home";
import Products from "./Components/products"
import { BrowserRouter, Route } from "react-router-dom";
import Friends from "./Components/friends";
import FriendForm from "./Components/friendform";
import Cars from "./Components/cars";
import "./App.css";



class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <NavBar></NavBar>
                    <Route path="/register" component={Registration} exact={true}></Route>
                    <Route path="/login" exact={true} component={LogIn}></Route>
                    <Route path="/products" exact={true} component={Products}></Route>
                    <Route path="/home" exact={true} component={Home} />
                    <Route path="/friends" exact={true} component={Friends}></Route>
                    <Route path="/friends/:id/edit" exact={true} component={FriendForm} />
                    <Route path="/friends/new" exact={true} component={FriendForm} />
                    <Route path="/cars" exact={true} component={Cars} />
                    <Footer></Footer>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;