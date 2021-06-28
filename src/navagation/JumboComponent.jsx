import React from "react";



class JumboComponent extends React.Component
{
    render()
    {
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
                <button className="btn btn-primary btn-lg">
                  Learn more &raquo;
                </button>
              </p>
            </div>
          </div>
            </React.Fragment>

        )
    }
}















export default JumboComponent;