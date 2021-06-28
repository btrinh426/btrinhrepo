import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Content from "./Components/Content";
import Jumbo from "./Components/Jumbo";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import * as userService from "./services/userService";
import Swal from "sweetalert2";

import "./App.css";

class App extends Component {
    componentDidMount() {
        console.log("Mounted");
        const payload = {
            email: "jim@testing.com",
            password: "#sabioTesting2",
            tenantId: "U01R71K7F19",
        };

        userService.logIn(payload).then(this.onLoginOk).catch(this.OnLoginFail);
    }
    onLoginOk = res => {
        console.log("logged in");
        Swal.fire({
            title: "You have successfully logged in!",
            text: "Continue",
            icon: "success",
            confirmButtonText: "Cool",
        });
    };
    onLoginFail = res => {
        console.log(res);

        Swal.fire({
            title: "error!",
            text: "Please check your credentials and try again",
            icon: "error",
            confirmButtonText: "Cool",
        });
    };
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route path="/" component={Navbar}></Route>
                    <main role="main">
                        <Route path="/" component={Jumbo}></Route>
                        <Route path="/" component={Content}></Route>
                    </main>
                    <Route path="/" component={Footer}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
