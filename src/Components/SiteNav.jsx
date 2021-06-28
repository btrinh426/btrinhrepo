import React from "react";

class SiteNav extends React.Component {
  homePageOnClick = () => {
    this.props.history.push("/homepage");
  };
  friendsOnClick = () => {
    this.props.history.push("/friends");
  };
  carsOnClick = () => {
    this.props.history.push("/cars");
  };
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <button className="link-button navbar-brand">Edwards Cinemas</button>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="#navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon " ></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <button
                  className="nav-link link-button"
                  onClick={this.homePageOnClick}
                >
                  Home
                  <span className="sr-only"></span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button"
                onClick={this.friendsOnClick}>Friends</button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button"
                onClick={this.carsOnClick}>Cars</button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">Blogs</button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">Tech Companies</button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">Jobs</button>
              </li>
              <li className="nav-item">
                <button className="nav-link link-button">Events</button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link link-button"
                  type="submit"
                  onClick={this.onBuyClicked}
                >
                  Register
                </button>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="http://example.com"
                  id="dropdown01"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown01">
                  <button className="dropdown-item link-button">Action</button>
                  <button className="dropdown-item link-button">
                    Another Action
                  </button>
                  <button className="dropdown-item link-button">
                    Something else here
                  </button>
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr=dm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
        <div className="container"></div>
      </React.Fragment>
    );
  }
}

export default SiteNav;
