import React from "react";
import Swal from "sweetalert2";

import logo from "../logo.svg";
import { logout } from "../services/UserService";
import { withRouter } from "react-router-dom";
import "../services/Navbar";
import "./Home/Navbar.css";

class MyNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUser: false,
            limitedRendering: true,
            currentUser: {
                firstName: "noUser",
                lastName: "noUser",
                id: "noUser",
                email: "noUser",
                photo: "noUser",
            },
        };
    }
    componentDidMount() {}
    onClick = e => {
        e.preventDefault();
        let button = e.currentTarget.name;

        if (button === "Login") {
            this.props.history.push("/Login");
        } else if (button === "Logout") {
            logout().then(this.success).catch(this.fail);
        } else if (button === "Register") {
            this.props.history.push("/Register");
        }
    };

    success = res => {
        Swal.fire({
            title: "Thanks for visiting a Happy Place, come back soon!",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
        });
        setTimeout(() => {
            this.props.history.push("/Login");
        }, 1000);
    };
    fail = err => console.log("Error");

    render() {
        return (
            <React.Fragment>
                <div className="nav">
                    <input type="checkbox" id="nav-check" />
                    <div className="nav-header">
                        <div className="nav-title">
                            <img
                                id="nav-img"
                                alt=""
                                src={logo}
                                width="35"
                                height="35"
                                className="d-inline-block align-top"
                            />{" "}
                            A Happy Place
                        </div>
                    </div>
                    <div className="nav-btn">
                        <label htmlFor="nav-check">
                            <span />
                            <span />
                            <span />
                        </label>
                    </div>
                    <div className="nav-links">
                        {this.props.activeUser && (
                            <>
                                <a href="/Home">Home</a>
                                <a href="/Friends">Friends</a>
                                <a href="/Jobs">Jobs</a>
                                <a href="/TechCompanies">Tech Co</a>
                                <a href="/ProductForm">Product Form</a>
                            </>
                        )}
                    </div>
                    <div className="buttons">
                        {!this.props.activeUser && (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-outline-info btn-sm"
                                    name="Login"
                                    onClick={this.onClick}
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-info btn-sm"
                                    name="Register"
                                    onClick={this.onClick}
                                >
                                    Register
                                </button>
                            </>
                        )}
                        {this.props.activeUser && (
                            <>
                                <h3 className="nav-user">
                                    Hello{" "}
                                    {this.props.appState.currentUser.firstName}
                                </h3>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-info btn-sm"
                                    name="Logout"
                                    onClick={this.onClick}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                    <div className="input-group input-group-sm mb-0">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                name="search"
                                id="search"
                                value={this.props.appState.query}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default withRouter(MyNav);
