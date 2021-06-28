import React from 'react';

const Jumbo = ({user}) => {
    console.log(user)
    return (
    <div className="jumbotron">
        <div className="container">
            <h1 className="display-3">Welcome {user.firstName || 'To our site.'}!</h1>
            <p>
                This is a template for a simple marketing or informational
                website. It includes a large callout called a jumbotron and
                three supporting pieces of content. Use it as a starting point
                to create something more unique.
            </p>
            <p>
                <button className="btn btn-primary btn-lg">Learn more &raquo;</button>
            </p>
        </div>
      </div>
    );
}

export default Jumbo;