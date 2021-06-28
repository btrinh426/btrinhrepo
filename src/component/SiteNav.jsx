import React from "react";
import { NavLink } from "react-router-dom";

class SiteNav extends React.Component {
  state = {
    searchResult: "",
    currentPage: 1,
    friends: [],
  };

  componentDidUpdate(prevProps) {
    let currentQry = this.props.location.search;
    let prevQry = prevProps.location.search;
    console.log("componentDidUpdate", { prevQry, currentQry });

    if (!currentQry && prevQry) {
      this.setState((prevState) => {
        let newSearchResult = { ...prevState.searchResult };
        newSearchResult = "";
        return { searchResult: newSearchResult };
      });
    }
  }

  onSearchInput = (e) => {
    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let newValue = currentTarget.value;
    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;
      return newState;
    });
  };

  onSearchClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.props.history.push(`/friends?friendName=${this.state.searchResult}`, {
      type: "SearchResult",
      payload: this.state.searchResult,
    });
    /*friendsSerivce
      .getByName(0, 10, queryString)
      .then(this.onSearchFriendSuccess)
      .catch(this.onSearchFriendError);*/
  };

  onSearchFriendError = (res) => {
    console.error(res);
  };

  handleReset = () => {
    this.setState({
      itemvalues: [{}],
    });
  };
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
              <NavLink
                activeStyle={{ color: "blue" }}
                className="nav-link link-button"
                to="/"
              >
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Log in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                Log out
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/friends">
                Friends
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/events">
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/assessment">
                Second Assessment
              </NavLink>
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
              name="searchResult"
              value={this.state.searchResult}
              onChange={this.onSearchInput}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={this.onSearchClick}
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
