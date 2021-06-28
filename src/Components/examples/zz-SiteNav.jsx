import React from "react";
import { NavLink } from "react-router-dom";

class SiteNav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark sabio">
        <button className="link-button navbar-brand">Navbar</button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink to="/" className="nav-link link-button">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">Link</button>
            </li>
            <li className="nav-item">
              <button className="nav-link disabled">Disabled</button>
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
                <button className="dropdown-item  link-button">Action</button>
                <button className="dropdown-item link-button">
                  Another action
                </button>
                <button className="dropdown-item  link-button">
                  Something else here
                </button>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
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
    );
  }
}

export default SiteNav;

<div className="container-fluid pl-2 pr-2">
  <TopBar siteName={this.state.siteName}></TopBar>
  <div className="row">
    <LeftMenu></LeftMenu>
    <div className="col ml-0 pl-0">
      <TitleBar></TitleBar>
      <div className="bg-light pt-3 pl-3" style={{ height: "750px" }}>
        <div className="row pl-3">
          <Route
            path="/register"
            exact={true}
            render={() => <RegisterUser tenantId={this.state.tenantId} />}
          ></Route>

          <Route
            path="/"
            exact={true}
            render={() => (
              <Login
                siteName={this.state.siteName}
                tenantId={this.state.tenantId}
              ></Login>
            )}
          ></Route>
        </div>
      </div>
    </div>
  </div>
</div>;
