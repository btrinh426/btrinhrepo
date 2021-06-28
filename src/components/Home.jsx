import React from "react";
import NavBar from "./NavBar";
import "./css/NavBar.css"
import * as userService from "../services/userService";







class Home extends React.Component {

    state = {
        name: "",
        avatarUrl: ""
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
        window.location.href="/login"
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


    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="wrapper d-flex align-items-stretch">
                    <div id="welcomeUser" className="mx-auto mt-5 text-center"> 
                        <h1>Welcome, {this.state.name}</h1>
                        <img alt="avatarURL" className="justify-content-center mt-5 rounded-circle" src={this.state.avatarUrl}></img>
                    </div>
                    
                </div>

            </React.Fragment>
        )
    }
}


export default Home