import React, { Component } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";

import "./App.css";
import Content from "./components/Content";
import Registration from "./components/Registration"
import Login from "./components/Login"
import HomePage from "./components/HomePage";
import friendServices from "./services/friendServices";
import Friends from "./components/Friends";
import userServices from "./services/userServices"
import {toast} from "react-toastify";
import Cars from "./components/Cars";


import Home2 from "./components/Home2"
import LoggedInUser from "./components/LoggedInUser";


class App extends Component {

  state = {
    visible: true
}

/*onInputChange = (e) => {
  let currentTarget = e.currentTarget;
  let newValue = currentTarget.value;
  let inputName = currentTarget.name;
  //console.log({ newValue, currentTarget });

  this.setState(() => {
   let newState = {};

   newState[inputName] = newValue;

   return newState;
  });

};

onRegistrationSuccess = response => {
   toast.success("Registration was successful")
}

onRegistrationError = response => {
   toast.error("You done goofed up now")
}

handleClick = () => {
   let payload = {
       "firstName": this.state.firstName,
       "lastName": this.state.lastName,
       "email": this.state.email,
       "password": this.state.password,
       "passwordConfirm": this.state.passwordConfirm,
       "avatarUrl": "https://res.cloudinary.com/teepublic/image/private/s--M-X253Zf--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1481688345/production/designs/946321_1.jpg",
       "tenantId": "U01TY0VT466"Math.random().toString(11).replace('0.', '')
   }

    userServices.register(payload)
    .then(this.onRegistrationSuccess)
    .catch(this.onRegistrationError)
}*/

  render() {

    return (
      <React.Fragment>
        
        <BrowserRouter>
        
        <Switch>
        <Route path="/Content" exact={true} component={Content}></Route>
        <Route path="/registration" exact={true} component={Registration}/> 
        <Route path="/login" exact={true} component={Login} />
        <Route path="/homepage" exact={true} component={Home2} />
        <Route path="/friends" component={Friends}/> 
        </Switch>
        
        <div className="section">

      {/* <Login login={this.state}/> */}
          
        {/* <LoggedInUser /> */}

        {this.state.visible ? <Friends /> : null}

        <div className="col-md-12">
        <button
          className= "btn btn-danger"
          onClick={() => {
            this.setState({ visible: !this.state.visible});
          }}
        >
          Show Cars
        </button>

        </div>
        </div>        
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
