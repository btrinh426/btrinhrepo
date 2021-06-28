import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/register";
import LogIn from "./components/login";
import Home from "./components/home";
import FriendForm from "./components/friendform";
import Friends from "./components/friends";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>

                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={LogIn} />
                <Route path="/home" exact component={Home} />
                <Route path="/friendform" exact component={FriendForm} />
                <Route path="/friends" exact component={Friends} />
            </BrowserRouter>
        );
    }
}

export default App;
