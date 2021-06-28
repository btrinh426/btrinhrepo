import React from "react";
import "./css/NavBar.css"
import * as userService from "../services/userService";

const logout = () => {
    userService.logOut()
        .then(logoutSuccess)
        .catch(logoutError)
}
var logoutSuccess = (response) => console.log(response)
const logoutError = (response) => console.error(response)

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-md">
            <h3>Sabio Warmup</h3>
            <div>
                <a className="nav-link" href="/home">Home</a>
            </div>
            <div>
                <a className="nav-link" href="/people">People</a>
            </div>
            <div>
                <a className="nav-link" href="/">Blogs</a>
            </div>
            <div>
                <a className="nav-link" href="/">Tech Companies</a>
            </div>
            <div>
                <a className="nav-link" href="/">Jobs</a>
            </div>
            <div>
                <a className="nav-link" href="/">Events</a>
            </div>
            <div>
                <a className="nav-link" href="/register">Register</a>
            </div>
            {(window.location.href.indexOf("home") !== -1) && 
            <a className="nav-link" onClick={logout} href="/register">logout</a>}
            {(window.location.href.indexOf("people") > -1) && 
            <a className="nav-link" onClick={logout} href="/register">logout</a>}
            <div>
            </div>
        </nav>
    )
}

export default NavBar;