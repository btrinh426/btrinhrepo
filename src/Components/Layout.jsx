import React, {Component} from "react";
import { logoutUser } from "../services/usersService";
// import TopNavbar from "./Top-Navbar";
// import SideNavbar from "./Side-Navbar"


class Layout extends Component {

    onLogout = (e) => {
        console.log("logout clicked")

        logoutUser()
            .then(this.onLogoutUserSuccess)
            .catch(this.onLogoutUserError)

    };

    onLogoutUserSuccess = (res) => {
        console.log("LogoutUser success", res)

        window.location.href = "/login"

    };

    onLogoutUserError = (err) => {
        console.log("LogoutUser error", err.response)

    };


    render (){
        return(
           
            <div className="d-flex" id="wrapper">

                <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Main Navigation </div>
                <div className="list-group list-group-flush">
                    <a href="/home" className="list-group-item list-group-item-action bg-light">Home</a>
                    <a href="/friends" className="list-group-item list-group-item-action bg-light">Friends</a>
                    <a href="/blogs" className="list-group-item list-group-item-action bg-light">Blogs</a>
                    <a href="/techcompanies" className="list-group-item list-group-item-action bg-light">Tech Companies</a>
                    <a href="/jobs" className="list-group-item list-group-item-action bg-light">Jobs</a>
                    <a href="/events" className="list-group-item list-group-item-action bg-light">Events</a>
                    <a href="/register" className="list-group-item list-group-item-action bg-light">Register</a> 
                </div>
                
                </div>

                
            
                <div id="page-content-wrapper">
                    
                    <nav className="navbar fixed-top">
                    
                        <nav className="navbar navbar-dark bg-dark">
                            <a className="navbar-brand" href="#">Sabio Warm-Up</a>
                        
                            <button className="navbar-toggler" id="hamburger-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar-heading" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        
                        </nav>
                        <div className="right-nav-wrapper">
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <button type="logout" className="btn btn-primary logout" id="logout-button" onClick={this.onLogout}>Logout</button>
                        </div>
                    </nav>                  
            
                    <div>
                        {this.props.children}
                    </div>
            
                </div>
            </div>
        
        )
    }

};

export default Layout;