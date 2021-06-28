import React from "react";

class HomePage extends React.Component {
  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    People
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Blogs
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Tech Companies
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Jobs
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Events
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Events
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Register
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default HomePage;
