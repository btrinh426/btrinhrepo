import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div
        className="jumbotron"
        style={{
          backgroundImage: `url("https://businessesgrow.com/wp-content/uploads/2019/08/dumpster-fire-twitter_1600x.jpg")`,
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="container">
          <h1 className="display-3">Hello, you!</h1>
          <p>
            This is a template for a simple marketing or informational website.
            <br />
            It includes a large callout called a jumbotron and three supporting
            <br />
            pieces of content. Use it as a starting point to create something
            <br />
            more unique.
          </p>
          <p>
            <button className="btn btn-primary btn-lg">
              Learn more &raquo;
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
