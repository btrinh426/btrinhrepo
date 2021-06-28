import React from "react";
import { Link } from "react-router-dom";

function SiteNav() {
    
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
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
                        <li className="nav-item active">
                            <Link to="/">
                                <button className="nav-link link-button">
                                    Home <span className="sr-only">(current)</span>
                                </button>
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <button className="nav-link link-button" href="/">Test</button>
                        </li> */}
                        <li className="nav-item">
                            <button className="nav-link link-button">Link</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link disabled">Disabled</button>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                            className="nav-link dropdown-toggle"
                                id="dropdown01"
                                href="/"
                            data-toggle="dropdown"
                            >
                            Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <button className="dropdown-item  link-button">Action</button>
                                <button className="dropdown-item link-button">
                                    Another action
                                </button>
                                <button className="dropdown-item  link-button">
                                    Something else here
                                </button>
                            </div>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button
                            className="btn btn-outline-success my-2 my-sm-0"
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

export default SiteNav;