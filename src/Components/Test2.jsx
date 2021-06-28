import React, { Component } from "react";

//className="collapse bd-links"
class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
            <div className="col-12 col-md-3 col-xl-2 bd-sidebar">
              <nav className=" bd-links" id="bd-docs-nav">
                <div className="bd-toc-item">
                  {/* anchor tags reload the whole page */}
                  <a className="bd-toc-link" href="Test">
                    Home
                  </a>
                  {/* anchor tags reload the whole page */}
                </div>
              </nav>
            </div>
            {/* <div className="d-none d-xl-block col-xl-2 bd-toc"></div>   this is a second side bar on the left if needed */}
            <main
              className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content"
              role="main"
            >
              <h1 className="bd-title">Home Page</h1>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
