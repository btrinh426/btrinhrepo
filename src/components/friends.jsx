import React from "react";

class Friends extends React.Component {
    state = {
        name: "",
        summary: "",
    };

    render() {
        return (
            <React.Fragment>
                <div className="card">
                    <img className="card-img-top" src="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
            </p>
                        <a className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Friends;
