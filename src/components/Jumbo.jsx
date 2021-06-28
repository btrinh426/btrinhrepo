import React from "react";

function Jumbo() {

    const handleClick = (e) => {
        console.log(`This button (ID) was clicked:  ${e.currentTarget.id}`);
    }

    return (
        <React.Fragment>
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-3">Hello, world!</h1>
                    <p>
                        This is a template for a simple marketing or informational
                        website. It includes a large callout called a jumbotron and
                        three supporting pieces of content. Use it as a starting point
                        to create something more unique.
                    </p>
                    <p>
                        <button className="btn btn-primary btn-lg" id="button_learnMore" onClick={handleClick}>
                            Learn more &raquo;
                        </button>
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Jumbo;