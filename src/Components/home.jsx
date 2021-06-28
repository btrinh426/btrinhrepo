import React from "react";
import * as userService from "../services/userService";

class Home extends React.Component {

    logOutClicked = () => {
        userService.logOut().then(this.logOutSuccessful).catch(this.logOutUnsuccessful)
    }

    logOutSuccessful = () => {
        this.props.history.push("/login")
    }

    logOutUnsuccessful = () => {
        console.log("You haven't logged out yet!")
    }



    render() {
        return <React.Fragment><div className="container"><h2>Welcome!</h2>
            <h3>NAME!</h3>
            <button onClick={this.logOutClicked}>Log Out!</button>
            <a href="/friends">Friends</a>
            <a href="/blogs">Blogs</a>
            <a href="/techcompanies">Tech Companies</a>
            <a href="/jobs">Jobs</a>
            <a href="/events">Events</a>
            <a href="/register">Register</a>
            {/* look at the navlink options */}
        </div></React.Fragment>;
    };
}

export default Home