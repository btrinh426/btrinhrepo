import React from"react"
import {BrowserRouter, Route, NavLink} from "react-router-dom";
import * as userService from "./serviceHelper"

function testAxios() {
    let data="Test Data";
    console.log("The link was clicked.");
    userService.testF(data)
  }

  function loginAxios() {   
    let data={  "email": "munib22@gmail.com",
    "password": "Wow2010#",
    "tenantId": "U01JS43TSAJ" };
    console.log("The login link was clicked.");
    userService.logIn(data)
  }

 

class ANavBar extends React.Component
{  

    componentDidMount(){
        console.log("this.testAxios");
        
      }
    
    render()
    {
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
          <button className="nav-link link-button"><NavLink  to="/">
            Home <span className="sr-only">(current)</span>
             </NavLink></button>

             <button className="nav-link link-button" onClick={testAxios}>testAxios Call</button>
        </li>
        <li className="nav-item">
          <button className="nav-link link-button">Link</button>
        </li>
        <li>
        <button className="btn btn-success btn-sm" onClick={loginAxios}>testAxios Login</button>
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
</React.Fragment>

        );
    }
}

export default ANavBar;