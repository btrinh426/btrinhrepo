import React from "react";
import * as userService from "../services/userService";

class HomePage extends React.Component {

    logOutBtn = (e) => {
        e.preventDefault();
        console.log("I'm working here!")

        userService.userLogOut()
            .then(this.onLogOutSuccess)
            .catch(this.onLogOutError)
    };

    onLogOutSuccess = () => {
        console.log("onLogOutSuccess - we are logged out")
        this.props.history.push("/login");
    };

    onLogOutError = (err) => {
        console.log(err)
    };

    componentDidMount() {
        let id = this.props.match.params.id
        console.log("This is the user's id", { id })

        userService.getUserById(id)
            .then(this.onGetUserByIdSuccess)
            .catch(this.onGetUserByIdError)

        userService.currentUser()
            .then(this.onCurrentUserSuccess)
            .catch(this.onCurrentUserError)
    };

    onGetByUserIdSuccess = (response) => {
        console.log({ userId: response })
    };

    onGetByUserIdError = (response) => {
        console.warn({ error: response })
    };

    onCurrentUserSuccess = (response) => {
        console.log(response)
    };

    onCurrentUserError = (response) => {
        console.warn({ error: response })
    };




    render() {
        return <div className="home" style={{ margin: "8rem" }}>
            <h1>Glad to see you .....</h1>
            <button
                type="submit"
                className="btn btn-secondary"
                onClick={this.logOutBtn}>Log Out</button>
        </div>
    };
};

export default HomePage;