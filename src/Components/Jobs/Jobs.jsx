import React from "react";
import * as jobServices from "../../services/jobsService";
import "./Jobs.css";

class Jobs extends React.Component {
    render() {
        let user = this.props.appState.currentUser.firstName;
        let userImg = this.props.appState.currentUser.photo;
        console.log(user);
        return (
            <>
                <div className="sidebar-container">
                    <div className="sidebar-logo">
                        {user}{" "}
                        <img
                            className="sidebar-user"
                            src={userImg}
                            alt={user}
                        />{" "}
                    </div>
                    <ul className="sidebar-navigation">
                        <li className="header">Job Options</li>
                        <li>
                            <button className="meButton">This One</button>
                        </li>
                        <li>
                            <button className="meButton">This One</button>
                        </li>
                        <li>
                            <button className="meButton">This One</button>
                        </li>
                    </ul>
                </div>
                <div className="content-container">
                    <div className="container-fluid">
                        {/* Main component for a primary marketing message or call to action */}
                        <div className="jumbotron">
                            <h1>Navbar example</h1>
                            <p>
                                This example is a quick exercise to illustrate
                                how the default, static and fixed to top navbar
                                work. It includes the responsive CSS and HTML,
                                so it also adapts to your viewport and device.
                            </p>
                            <p>
                                To see the difference between static and fixed
                                top navbars, just scroll.
                            </p>
                            <p>
                                <a
                                    className="btn btn-lg btn-primary"
                                    href="../../components/#navbar"
                                    role="button"
                                >
                                    View navbar docs »
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Jobs;
