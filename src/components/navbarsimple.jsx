import React from "react";

class SimpleNavBar extends React.Component {

    render() {
        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand">Members Only: A Jacket Repository</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

        </nav>
    }
}

export default SimpleNavBar;