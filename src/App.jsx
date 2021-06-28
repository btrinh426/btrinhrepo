import React, { Component} from "react";
//import SiteNav from "./components/SiteNav"
//import Jumbo from "./components/Jumbo"
//import Content from "./components/Content"
//import Footer from "./components/Footer";
 //import Register from "./components/Register"
//  import Login from "./components/Login";
// import ProductForm from "./components/ProductForm"
//import userService from "./Service/userService"
//import Homepage from "./components/Homepage"
import { BrowserRouter, Route} from "react-router-dom";
import MakeUps from "./components/MakeUps"
import GetUsers from "./components/GetUsers"
import "./App.css";
//import Login from "./components/Login";
//import { loggedOut } from "./Service/userService";
// import Cars from "./components/Cars"
//import Test from "./components/Test";


class App extends Component {
 
  render() {
    return (
      
        <BrowserRouter>
        {/* <SiteNav></SiteNav>  */}
          {/* <Register></Register> */}
          {/* SiteNav   -----    */}
          {/* <Test></Test> */}
          
              {/* <Route path="/login" exact={true} component={Login}></Route> */}
              
{/* <Route path="/" exact component={Homepage} /> */}
              
          {/* <Cars></Cars> */}
          {/* <Route>
              <Route path="/register" exact={true} component={Register}></Route>
              </Route> */}
              {/* <GetUsers></GetUsers> */}

              <Route path="/makeups" exact={true} component={MakeUps}></Route>
      {/* <MakeUps></MakeUps> */}
          {/* <Login></Login> */}
          {/* <ProductForm></ProductForm> */}
          {/* <userService></userService> */}
          
          {/* <Jumbo></Jumbo> */}
          {/* <Content></Content> */}
          {/* <Footer></Footer>  */}
        </BrowserRouter>
      
    );
  }
}

export default App;
