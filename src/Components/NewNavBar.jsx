import React from "react";

class NavBar extends React.Component {
    render() {
        return <nav className="navbar navbar-expand bg-warning">
            <a className="navbar-brand" href="#">My Cat Is Sleeping</a>
            <div className="collapse navbar-collapse">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="/friends">Friends</a>
                    <a className="nav-item nav-link" href="#">Blogs</a>
                    <a className="nav-item nav-link" href="#">Tech Companies</a>
                    <a className="nav-item nav-link" href="#">Jobs</a>
                    <a className="nav-item nav-link" href="#">Events</a>
                    <a className="nav-item nav-link" href="#">Register</a>
                </div>
            </div>


        </nav>


    }
}

export default NavBar;