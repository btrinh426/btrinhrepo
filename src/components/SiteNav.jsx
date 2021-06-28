import React from "react";
import { NavLink } from "react-router-dom";


class SiteNav extends React.Component {

    render() {
        return <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
            <button className="link-button navbar-brand">Navbar</button>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExampleDefault"
                aria-controls="navbarsExampleDefault"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item" style={{ padding: "8px" }}>
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    <li className="nav-item" style={{ padding: "8px" }}>
                        <NavLink to="/register">Register</NavLink>
                    </li>
                    <li className="nav-item" style={{ padding: "8px" }}>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item" style={{ padding: "8px" }}>
                        <NavLink to="/friendForm">Add a Friend</NavLink>
                    </li>
                    <li className="nav-item" style={{ padding: "8px" }}>
                        <NavLink to="/friends">Friends</NavLink>
                    </li>
                    <li className="nav-item" style={{ padding: "8px" }}>
                        <NavLink to="/login">Blogs</NavLink>
                    </li>
                    <li className="nav-item" style={{ padding: "8px" }}>
                        <NavLink to="/login">Tech Companies</NavLink>
                    </li>
                    <li className="nav-item" style={{ padding: "8px" }}>
                        <NavLink to="/login">Jobs</NavLink>
                    </li>
                    <li className="nav-item" style={{ padding: "8px" }}>
                        <NavLink to="/login">Events</NavLink>
                    </li>
                    <li className="nav-item" style={{ padding: "8px" }}>
                        <NavLink to="/pForm">Product Form</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    };
};

export default SiteNav;