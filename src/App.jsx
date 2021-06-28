import React, { Component } from "react";
// import Navigation from "./components/navBar";
// import Login from './components/login';
// import Register from './components/register';
import Home from './components/home';
import Product from './components/ProductForm'
import { withRouter } from 'react-router-dom';
import * as userService from "./services/userService";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import "./index.css";
import register from "./registerServiceWorker";

function App() {
  // var loggedInUser = localStorage.getItem('user');

  // var checkLoginStatus=()=>{
  //   console.log(loggedInUser);
  //   if (!loggedInUser) {
  //     replace({
  //     pathname: "/login",
  //     });
  // }
  // next();
  // }
  

//*********************************** */

// checkLoginStatus(){
//   userService.getCurrent()
//   .then(this.onGetCurrentSuccess)
//   .catch(this.onGetCurrentError);
// }

// onGetCurrentSuccess = (response) => {
//   //localStorage.setItem('user', response.data);
//   console.log(response.data);
  
// }

// onGetCurrentError= (errResponse) => {
//   console.log(errResponse);
//   this.props.history.push('/login');
// }

// componentDidMount() {
//   this.checkLoginStatus();
// }
    return (
      
      <Router>
        <div>
          {/* <Navigation/> */}
        </div>
        <Route path='/products' component={Home}>
          {/* <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route> */}
          <Route path="/products" exact component={Product}></Route>
        </Route>

        <main role='main'>
          <div className='conatiner'>
            <div></div>
          </div>
        

        </main>
        
      </Router>
    );
}

export default withRouter(App);
