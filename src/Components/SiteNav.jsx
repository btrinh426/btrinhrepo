import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as registerUserService from "../services/registerUserService";
import { toast } from 'react-toastify';
import { withRouter } from "react-router-dom";

class SiteNav extends React.Component {

    onRefreshClicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Refresh");
        this.props.history.push("/")
    }

    onLogoutClicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Logout");
        registerUserService.logOut()
            .then(this.onLogoutSuccess)
            .catch(this.onLogoutError)
        
    }

    onLogoutSuccess = (response) => {
        console.log("Logout Successful", response);
        toast.success('Logout Successful', {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        this.props.history.push("/");
        
    }

    onCurrentError = (error) => {
        console.log("Logout Error", error);
        toast.error('Looks like you did not logout. Please try again', {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    
    render() {

        // const [sidebar, setSidebar] = useState(false);

        // const showSidebar = () => setSidebar(!sidebar);
        {/*onClick={showSidebar}*/}
        {/*className={sidebar ? "nav-menu active" : "nav-menu"}*/}

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary sabio">
                <button className="link-button navbar-brand">Sabio Warmup</button>

                <FaIcons.FaBars />
                {/*<div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars />
                    </Link>
                </div>*/ }
                {/*<nav>
                    <ul className="nav-menu-items">
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                    </ul>
                </nav>*/ }
                
                <BsIcons.BsBoxArrowInRight />

               
                
                <div>
                                    <button
                                        className="w-100 btn btn-lg btn-secondary"
                                        type="reset"
                                        onClick={this.onLogoutClicked}
                                    >
                                        Logout
                                    
                                    </button>
                                </div>

              

                {/*<button className="link-button navbar-brand">Navbar</button>*/}
                {/*<button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExampleDefault"
                    aria-controls="navbarsExampleDefault"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span> </button>*/}

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            {/*<button className="nav-link link-button">
                                Home <span className="sr-only">(current)</span>
                            </button>*/}
                        </li>
                        {/* <li className="nav-item">
                            <button className="nav-link link-button">Link</button>
                        </li>*/}
                        {/*<li className="nav-item">
                            <button className="nav-link disabled">Disabled</button>
                        </li>*/}
                        {/*<li className="nav-item dropdown">
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
                        </li>*/}
                    </ul>


                    {/*<form className="form-inline my-2 my-lg-0">
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
                    </form>*/}
                    <div>
                                    <button
                                        className="w-100 btn btn-lg btn-secondary"
                                        type="reset"
                                        onClick={this.onRefreshClicked}
                                    >
                                        Refresh
                                    
                                    </button>
                                </div>
                    <AiIcons.AiOutlineSearch />
                </div>
            </nav>
        )
    }
}

export default withRouter(SiteNav);