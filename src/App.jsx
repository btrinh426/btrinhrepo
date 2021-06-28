import React, { Component} from "react";
//import SiteNav from "./components/SiteNav"
//import Jumbo from "./components/Jumbo"
//import Content from "./components/Content"
//import Footer from "./components/Footer";
 //import Register from "./components/Register"
 //import Login from "./components/Login";
//import Products from "./components/Products"
//import userService from "./Service/userService"
//import Homepage from "./components/Homepage"
import { BrowserRouter} from "react-router-dom";

import "./App.css";
//import Login from "./components/Login";
//import { loggedOut } from "./Service/userService";
import Cars from "./components/Cars"


class App extends Component {
 
  render() {
    return (
      
        <BrowserRouter>
        {/* <SiteNav></SiteNav>  */}
          {/* <Register></Register> */}
          
          
          {/* <Route>
              <Route path="login" exact={true} component={Login}></Route>
              </Route> */}

              
          <Cars></Cars>
          {/* <Route>
              <Route path="/register" exact={true} component={Register}></Route>
              </Route> */}
      
          {/* <Homepage></Homepage> */}
          {/* <Login></Login> */}
          {/* <Products></Products> */}
          {/* <userService></userService> */}
          
          {/* <Jumbo></Jumbo> */}
          {/* <Content></Content> */}
          {/* <Footer></Footer>  */}
        </BrowserRouter>
      
    );
  }
}

export default App;
