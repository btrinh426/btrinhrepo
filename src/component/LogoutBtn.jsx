import React from "react"
import * as userService from "../services/userService"

class LogoutBtn extends React.Component {
    onClicked = (e) => {
        e.stopPropagation()
        e.preventDefault()
        userService.getUserLogout().then(this.onLogoutSuccess).catch(this.onLogoutError)
    }
    onLogoutSuccess = () => {
        console.log("logged out")
        this.props.history.push("/login")
    }
    onLogoutError = (res) => {
        console.error(res)
    }
    render() {
        return <button className="nav-link link-button" onClick={this.onClicked}>Log out</button>
    }
}

export default LogoutBtn