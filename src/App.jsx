import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom"
import {withRouter} from "react-router-dom"
import Navbar from "./Components/SiteNav"
import Jumbo from "./Components/Jumbo"
import Content from "./Components/Content"
import Footer from "./Components/Footer"
import * as usersService from "./services/userService"
import "./App.css";
import { data } from "jquery";

class App extends Component {

  componentDidMount(){
    console.log("componentDidMount");
    usersService.logIn(data).then(this.onLoginSuccess).catch(this.onLoginError);
  };

  onLoginSuccess = (response) => {
    console.log({ login: response.data })
  };
  
  onLoginError = (errResponse) => {
    console.error(errResponse)
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navbar {...this.props}></Navbar>
          <main role="main">
            
            <Jumbo>
              
            </Jumbo> 
            {/* <NavLink to="/content/">Navbar</NavLink> */}
            <Route path="/content/" exact= {true} component={Content}></Route>
            {/* <Content></Content>           */}
            
          </main>
          <Footer></Footer>  
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withRouter(App);
