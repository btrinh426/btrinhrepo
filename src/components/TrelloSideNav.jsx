import React from "react";
import "./css/TrelloSideNav.css"
// this needs a prop to get the avatar to show the avatar

const TrelloSideNav = () => {
    
    return (
        <React.Fragment>
            <nav id="sidebar" className="border-right solid">
                <div className="sidebar-header mt-3 text-center">
                    <p>Main Navigation</p>
                </div>
                <ul className="list-unstyled components text-center justify-content-center mt-5">
                    <li>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a href="/people">People</a>
                    </li>
                    <li>
                        <a href="/">Blogs</a>
                    </li>
                    <li>
                        <a href="/">Tech Companies</a>
                    </li>
                    <li>
                        <a href="/">Jobs</a>
                    </li>
                    <li>
                        <a href="/">Events</a>
                    </li>
                    <li>
                        <a href="/register">Register</a>
                    </li>
                </ul>
                
            </nav>
            
        
        </React.Fragment>
        
    )
}

export default TrelloSideNav;