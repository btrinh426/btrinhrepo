import React from "react";
import NavBar from "./NavBar";
import TrelloSideNav from "./TrelloSideNav";
import "./css/NavBar.css"
import "./css/TrelloSideNav.css"
import * as userService from "../services/userService";
import {Route} from "react-router-dom"




// REDO side bar and make it so the only thing is the navbar having two is to many 
//need to make it so that if not previously signed on the user is redirected to sign in


class Home extends React.Component {

    state = {
        name: "",
        avatarUrl: "",
        redirect: false
    };

    componentDidMount() {
        this.setState(this.getCurrentLoggedIn) 
    }

    
    getCurrentLoggedIn = () => {
        userService.getCurrentUser()
            .then(this.onCurrentUserSuccess)
            .catch(this.onCurrentUserError);
    }

    onCurrentUserSuccess = (response) => {
        console.log(response)
        this.usersRecords(response.data.item.id)
    }

    onCurrentUserError = (response) => {
        console.error(response)
        this.state({redirect: true})
    }

    usersRecords = (id) => {
        userService.getUserRecords(id)
            .then(this.getUserRecordsSuccess)
            .catch(this.getUserRecordsError);
    }

    getUserRecordsSuccess = (response) => {
        console.log(response.data.item)
        let userInfo = response.data.item;
        this.setState({name: `${userInfo.firstName} ${userInfo.lastName}`, avatarUrl: userInfo.avatarUrl})
    }

    getUserRecordsError = (response) => {
        console.error(response)
    }

    onlogout = () => {
        userService.logOut()
            .then(this.logoutSuccess)
            .catch(this.logoutError)

    }

    logoutSuccess = (response) => console.log(response)
    logoutError = (response) => console.error(response)

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="wrapper d-flex align-items-stretch">
                    <TrelloSideNav src={this.state.avatarUrl} />
                    <div id="welcomeUser" className="mx-auto mt-5 text-center"> 
                        <h1>Welcome, {this.state.name}</h1>
                        <img alt="avatarURL" className="justify-content-center mt-5 rounded-circle" src={this.state.avatarUrl}></img>
                    </div>
                    <div>
                        <a onClick={this.onlogout} className="mt-2 mr-2" href="/">logout</a>
                    </div>

                    {this.state.redirect && <Route path="/login" />}
                    
                </div>

            </React.Fragment>
        )
    }
}


export default Home