import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import Route from "react-router-dom/Route"
import HomePage from "./Components/HomePage";
import Buttons from "./Components/Buttons";
import SiteNav from "./Components/SiteNav"
import Product from "./Components/Product"
// const User = ({match}) =>{
//   return ( <h1> Welcome User{match.params.username} </h1>)
// } 

class App extends React.Component {

    componentDidUpdate(prevProps) {
    let currentPath = this.props.location.pathname;
    let previousPath = prevProps.location.pathname;
    console.log("App", { currentPath, previousPath })
  }

  render() 
  {
    return (
     <React.Fragment>
       <SiteNav />
      <div className="App"/> 
      <Product />
          {/* <HomePage /> */}
      <main role="main">
        <div className="container">
          <div className="row m-3">
          {/* <Buttons {...this.props}></Buttons> */}
          </div>
        </div>
      </main>
      </React.Fragment>
    
    );
  }   
}

export default withRouter(App);





