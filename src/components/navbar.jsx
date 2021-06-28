import React from "react";
// import * as Process from "../services/userService";
// import { toast } from "react-toastify";

class NavBar extends React.Component {

    render() {
        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand">Members Only: A Jacket Repository</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="/home">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="/friends">Friends</a></li>
                    <li className="nav-item"><a className="nav-link">Blogs</a></li>
                    <li className="nav-item"><a className="nav-link">Tech Companies</a></li>
                    <li className="nav-item"><a className="nav-link">Jobs</a></li>
                    <li className="nav-item"><a className="nav-link">Events</a></li>
                    <li className="nav-item"><a className="nav-link" href="/register">Register</a></li>
                </ul>
            </div>
            <form className="d-flex">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="/friends">Logout</a></li>
                    </ul>
                </div>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </nav>
    }
}

export default NavBar;