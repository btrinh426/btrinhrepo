import React, { useReducer } from "react";
import "./NavStyle/Navbar.scss";
import logo from "../../logo.svg";
import * as userServices from ".//../../services/UserService";

class Navbar extends React.Component {
    clickHandle = e => {
        let button = e.currentTarget.name;
        console.log(button);

        if (button === "logout-btn") {
            userServices
                .logout()
                .then(this.onLogoutOk)
                .catch(this.onLogoutFail);
        }
    };
    onLogoutOk = res => {
        console.log("Logged out", res);
    };
    onLogoutFail = err => console.error(err);

    render() {
        return (
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
                    <a className="navbar-brand" href="/home">
                        Domination
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
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/home"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/friends"
                                >
                                    Homies
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/jobs"
                                >
                                    Jobs
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/tech-companies"
                                >
                                    Tech Companies
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/cars"
                                >
                                    Cars
                                </a>
                            </li>
                        </ul>
                        <div className="no-user">
                            <button className="btn btn-outline-info">
                                Login
                            </button>
                            <button className="btn btn-outline-info">
                                Register
                            </button>
                            <button
                                className="btn btn-outline-info"
                                name="logout-btn"
                                onClick={this.clickHandle}
                            >
                                Logout
                            </button>
                        </div>
                        <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button
                                className="btn btn-outline-success"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
