import React, {Component} from "react";
import { getCurrentUser, getUserById } from "../services/usersService";


class Home extends Component {

    state = {

        firstName: "",
        lastName: ""
    };

    componentDidMount(){
        console.log("mounted")

        getCurrentUser()
            .then(this.onGetCurrentUserSuccess)
            .catch(this.onGetCurrentUserError)
    };

    onGetCurrentUserSuccess = (res) => {
        console.log("getCurrentUser success", res)

        const currentUser = res.data.item.id
        
        getUserById(currentUser)
            .then(this.onGetUserByIdSuccess)
            .catch(this.onGetUserByIdError)

    };

    onGetCurrentUserError = (err) => {
        console.log("getCurrentUser error", err.response)

        window.location.href = "/login"

    };

    onGetUserByIdSuccess = (res) => {
        console.log("GetUserById success", res)

        const userFirstName = res.data.item.firstName
        const userLastName = res.data.item.lastName
        
        this.setState({firstName: userFirstName, lastName: userLastName})
    };

    onGetUserByIdError = (err) => {
        console.log("GetUserByIdError", err.response)


    };


    render(){
        return (
            <div>
                <h1>Welcome, {this.state.firstName} {this.state.lastName}</h1>
            </div>

            // <button type="logout" className="btn btn-primary logout" id="logout-button">Logout</button>
            
        )


    }
};

export default Home;