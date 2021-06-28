import React from "react";

class NavBar extends React.Component {
  onContentClicked = (e) => {
    // console.log("onContentClicked is firing", e);
    // console.log("Current Target is ", e.currentTarget);
    // console.log(e.currentTarget.id);
    this.props.history.push("/content", { signedInStatus: "login", id: "1" });
  };

  onContentClicked2 = (e) => {
    // console.log("onContentClicked2 is firing", e);
    // console.log("Current Target is ", e.currentTarget);
    // console.log(e.currentTarget.id);

    let extraInfo = { ...this.props.location.state };
    console.log("Copied location state: ", extraInfo);

    extraInfo.bonusInfo = "Hola";

    console.log("Added info to ", extraInfo);

    this.props.history.push("/content2", extraInfo);
  };

  onContentClicked3 = (e) => {
    // console.log("onContentClicked3 is firing", e);
    // console.log("Current Target is ", e.currentTarget);
    // console.log(e.currentTarget.id);
    this.props.history.push("/content3", {
      signedInStatus: "Logged the fuck out",
      id: "3",
    });
  };

  render() {
    return (
      <React.Fragment>
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
                <button
                  className="nav-link link-button"
                  id="content"
                  onClick={this.onContentClicked}
                >
                  Content <span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link link-button"
                  id="content2"
                  onClick={this.onContentClicked2}
                >
                  Content 2
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  id="content3"
                  onClick={this.onContentClicked3}
                >
                  Content 3
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
      </React.Fragment>
    );
  }
}

export default NavBar;
