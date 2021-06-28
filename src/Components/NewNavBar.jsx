import React from "react";

class NavBar extends React.Component {
    render() {
        return <nav className="navbar navbar-expand bg-warning">
            <a className="navbar-brand" href="#">My Cat Is Sleeping</a>
            <div className="collapse navbar-collapse">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="#">True</a>
                    <a className="nav-item nav-link" href="#">She Is</a>
                    <a className="nav-item nav-link disabled" href="#">She's Awake!</a>
                </div>
            </div>


        </nav>


    }
}

export default NavBar;