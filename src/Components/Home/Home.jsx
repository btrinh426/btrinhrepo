import React from "react";
import "./Home.scss";
import smoke from "./Smokey-Home.mp4";
import "./Home.css";
import WelcomeUser from "./UserWelcome";

class Home extends React.Component {
    //-- Need to know if there is a current user when this page is logged in.
    state = {
        activeUser: false,
        loadUserOnUpdate: true,
        currentUser: {
            firstName: "",
            lastName: "",
            email: "",
            id: "",
            photo: "",
        },
    };

    render() {
        console.log(this.props.appState.checkForUser);
        return (
            <>
                <section className="showcase">
                    <div>
                        {!this.props.appState.activeUser && (
                            <header>
                                <h2 className="logo">Welcome to Happy Place</h2>
                                <p className="logo">
                                    Please sign in or Register for a new acount
                                </p>
                            </header>
                        )}
                        {this.props.appState.activeUser && (
                            <WelcomeUser
                                currentUser={this.props.appState.currentUser}
                            />
                        )}
                    </div>

                    <video src={smoke} muted loop autoPlay />
                    <div className="overlay" />
                </section>
            </>
        );
    }
}

export default Home;
