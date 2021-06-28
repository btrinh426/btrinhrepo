import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
            <div className="col-12 col-md-3 col-xl-2 bd-sidebar"></div>
            <div className="d-none d-xl-block col-xl-2 bd-toc"></div>
            <main
              className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content"
              role="main"
            ></main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
