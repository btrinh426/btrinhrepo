import React from "react";
import {NavLink} from "react-router-dom";
import {logout} from "../services/appService" 



class SiteNav extends React.Component {

  handleClick = e => {
    e.preventDefault()
    logout()
    .then(this.onLogoutSuccess)
    .catch(this.onLogoutError)

  };

  onLogoutSuccess= (response) => {
    this.props.history.push("/login")
    console.log(response)

  };
  onLogoutError = (response) => console.log(response)

  render() {
    return (
      <React.Fragment>
        
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            
              <NavLink to="/Home">
              <li className="nav-item active">
              <button className="nav-link link-button">
                Home <span className="sr-only">(current)</span>
              </button>
            </li>
              </NavLink>
              
            <li className="nav-item">
              <button className="nav-link link-button">People</button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">Blogs</button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">Tech Co.</button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">Jobs</button>
            </li>
            <li className="nav-item">
              <button className="nav-link link-button">Events</button>
            </li>
            <form className="form-inline my-2 my-lg-0">
              
              <button
              className="btn btn-outline-success my-2 my-sm-0 logout"
              type="submit" onClick={this.handleClick}
            >
              Logout
            </button> 
             
           
           <NavLink to="/login"><button
              className="btn btn-outline-success my-2 my-sm-0 login"
              type="submit"
            >
              Login
            </button></NavLink> 
            <NavLink to="/register"><button
              className="btn btn-outline-success my-2 my-sm-0 register"
              type="submit"
            >
              Register
            </button></NavLink>
          </form>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href=" "
                id="dropdown01"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sabio Fellow
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
          
        </div>
      </React.Fragment>
    );
  }
}

export default SiteNav;
