import React from "react";
import Swal from "sweetalert2";

import logo from "./styles/logo.svg";
import { logout } from "../../services/UserService";
import { withRouter } from "react-router-dom";
import "../../services/Navbar";
import "./styles/navbar.css";

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
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <img
                            id="nav-img"
                            alt=""
                            src={logo}
                            width="45"
                            height="45"
                            className="d-inline-block align-top"
                        />{" "}
                        <a className="navbar-brand happy" href="/Home">
                            A Happy Place
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            {this.props.activeUser && (
                                <>
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                aria-current="page"
                                                href="Home"
                                            >
                                                Home
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                href="/Friends"
                                            >
                                                Friends
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                href="/Jobs"
                                            >
                                                Jobs
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                href="/TechCompanies"
                                            >
                                                Tech Co
                                            </a>
                                        </li>
                                    </ul>{" "}
                                </>
                            )}
                            <div className="d-flex">
                                {!this.props.activeUser && (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-sm reg-log"
                                            name="Login"
                                            onClick={this.onClick}
                                        >
                                            Login
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-secondary btn-sm reg-log"
                                            name="Register"
                                            onClick={this.onClick}
                                        >
                                            Register
                                        </button>
                                    </>
                                )}
                                {this.props.activeUser && (
                                    <>
                                        <h5 className="nav-user">
                                            Hello{" "}
                                            {
                                                this.props.appState.currentUser
                                                    .firstName
                                            }
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-secondary btn-sm logout"
                                            name="Logout"
                                            onClick={this.onClick}
                                        >
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                            <form className="d-flex">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <button
                                    className="btn btn-outline-secondary search-button"
                                    type="button"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
export default withRouter(Navbar);
