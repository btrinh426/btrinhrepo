import React from "react";
import {NavLink} from "react-router-dom";

const linkStyle ={
    textDecoration: "none",
    color: "white",
    margin: "1rem"
};
const navActive={
    fontWeight: "bold",
};

class Homepage extends React.Component{

    render(){
        return (
            <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{padding: "1rem"}}>   
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink exact to="/" style={linkStyle} activeStyle={navActive}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/friendsall" style={linkStyle} activeStyle={navActive}>Friends</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/blogs" style={linkStyle} activeStyle={navActive}>Blogs</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink exact to="/techco" style={linkStyle} activeStyle={navActive}>Tech Co</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink exact to="/jobs" style={linkStyle} activeStyle={navActive}>Jobs</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink exact to="/events" style={linkStyle} activeStyle={navActive}>Events</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink exact to="/userhome" style={linkStyle} activeStyle={navActive}>User HomePage</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink exact to="/widget" style={linkStyle} activeStyle={navActive}>Widget</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            </React.Fragment>
        );
    };
};

export default Homepage;