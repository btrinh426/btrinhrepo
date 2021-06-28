import React from "react";
import SiteNav from "./SiteNav"
import Jumbo from "./Jumbo"
import Content from "./Content"
import Footer from "./Footer"
import * as userService from "../services/userService";

class AllComps extends React.Component {
    componentDidMount() {
        console.log("componentMOUNTED")
        userService.logIn()
          .then(logInSuccess)
          .catch(logInError);
    
    }
    render () {
        userService.logIn()
            .then(logInSuccess)
            .catch(logInError) 
        return (
            <React.Fragment> 
                <SiteNav />
                <Jumbo />
                <Content />
                <Footer />
            </React.Fragment> 
        )
    }

}

var logInSuccess = (response) => console.log(response);
var logInError = (response) => console.error(response);

export default AllComps;