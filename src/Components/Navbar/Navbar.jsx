import React from "react";
import Swal from "sweetalert2";

import logo from "./styles/logo.svg";
import { logout } from "../../services/UserService";
import { withRouter } from "react-router-dom";
import "../../services/Navbar";
import "./styles/_bootswatch.scss";
import "./styles/_variables.scss";
import "./styles/bootstrap.css";
import "./styles/bootstrap.min.css";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

class Navbar extends React.Component {
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
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="/">
                        <img
                            id="nav-img"
                            alt=""
                            src={logo}
                            width="35"
                            height="35"
                        />{" "}
                        A Happy Place
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarColor01"
                        aria-controls="navbarColor01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarColor01"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/Home">
                                    Home
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Friends">
                                    Friends
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Jobs">
                                    Jobs
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/TechCompanies">
                                    Tech Companies
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/TechCompanies">
                                    produc
                                </a>
                            </li>
                            <li className="nav-item dropdown">
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
                                            {
                                                this.props.appState.currentUser
                                                    .firstName
                                            }
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
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input
                                className="form-control mr-sm-2"
                                type="text"
                                placeholder="Search"
                            />
                            <button
                                className="btn btn-secondary my-2 my-sm-0"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
export default withRouter(Navbar);
