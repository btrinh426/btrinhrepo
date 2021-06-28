import React from "react";
import * as userService from "../services/userService";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css"

class HomePage extends React.Component {

    state = {
        userData: {
            firstName: "",
            lastName: "",
            email: "",
            avatarUrl: "",
            id: ""
        }
    }

    componentDidMount() {

        userService.currentUser()
            .then(this.onCurrentUserSuccess)
            .catch(this.onCurrentUserError)
    };

    onCurrentUserSuccess = (response) => {
        //console.log(response.data)
        let id = response.data.item.id

        userService.getUserById(id)
            .then(this.onGetUserByIdSuccess)
            .catch(this.onGetUserByIdError)
    };

    onGetUserByIdSuccess = (response) => {
        console.log(response)
        let data = response.data.item

        this.setState((prevState) => {
            return {
                ...prevState, userData: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    avatarUrl: data.avatarUrl,
                    id: data.id
                }
            }
        })
    };

    logOutBtn = e => {
        e.preventDefault();

        userService.userLogOut()
            .then(this.onLogOutSuccess)
            .catch(this.onLogOutError)
    };

    onLogOutSuccess = response => {
        console.log(response)
        Swal.fire({
            icon: 'success',
            title: 'You have logged out.',
            text: 'See you soon!',
        })
        this.props.history.push("/login")
    };

    onCurrentUserError = (response) => {
        console.warn({ error: response })
    };

    onLogOutError = response => {
        console.warn(response)
    };

    onGetByUserIdError = (response) => {
        console.warn({ error: response })
    };

    render() {
        return <div className="home" style={{ margin: "8rem" }}>
            <h1>Glad to see you {this.state.userData.firstName}!</h1>

            <button
                type="submit"
                className="btn btn-secondary"
                onClick={this.logOutBtn}>Log Out</button>
        </div>
    };
};

export default HomePage;