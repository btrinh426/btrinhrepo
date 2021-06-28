import React from "react";
import {BrowserRouter, Route, NavLink} from "react-router-dom";

class SiteNav extends React.Component{

    render(){
        return(
        <React.Fragment>
            <BrowserRouter>
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
                        <NavLink to="/home">
                            <button className="nav-link link-button">
                            Home <span className="sr-only">(current)</span>
                            </button>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/link">
                            <button className="nav-link link-button">Link</button>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <button className="nav-link disabled">Disabled</button>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                        className="nav-link dropdown-toggle"
                        href="http://example.com"
                        id="dropdown01"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
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

                    <Route
                        path="/home"
                        componentexact={true}
                        render={() => (<h1>This is the Home page.</h1>)}
                    ></Route>

                    <Route
                        path="/link"
                        componentexact={true}
                        render={() => (<h1>This is the Link page.</h1>)}
                    ></Route>

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

                <div>

            </div>

            </nav>





            </BrowserRouter>

            
        </React.Fragment>
        )
    }
}

export default SiteNav;