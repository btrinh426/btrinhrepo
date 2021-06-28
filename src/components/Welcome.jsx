import React, { Component } from "react";
import userService from "../services/userService";
import { toast } from "react-toastify";

import NavBar from "./NavBar";

class Welcome extends Component {
    state = {
        formData: {
            name: "",
            id: "",
            tenantId: ""
        }
    }

    componentDidMount = () => {
        console.log("componentDidMount is executing")
        userService.current()
            .then(this.onCurrentUserSuccess)
            .catch(this.onCurrentUserError)
    };
    onCurrentUserSuccess = (response) => {
        console.log("current Success", response.data.item.name)
        console.log("current Success", response.data.item.id)
        console.log("current Success", response.data.item.tenantId)
        this.setState(() => {
            const formData = { ...this.state.formData };
            formData.name = response.data.item.name;
            formData.id = response.data.item.id;
            formData.tenantId = response.data.item.tenantId;
            console.log(formData)
            return { formData };
        })
    }
    onCurrentUserError = (response) => {
        console.warn("No current user available")
        toast.error("You need to login to view this page")
        this.props.history.push("/login")
    }

    onClickLogoutButton = (e) => {
        e.preventDefault();
        console.log("logout clicked")
        userService.logout()
            .then(this.onLogoutButtonSuccess)
            .catch(this.onLogoutButtonError)
    };

    onLogoutButtonSuccess = (response) => {
        console.log({ logoutSuccess: response })
        toast.success("Logout Successful")
        this.props.history.push("/login")
    }
    onLogoutButtonError = (response) => {
        console.log({ logoutError: response })
        toast.info("You are not logged in")
        this.props.history.push("/login")
    }



    render() {
        return (
            <React.Fragment>

                <NavBar />

                <div className="jumbotron" id="welcomeJumbo">
                    <h1 className="display-4">Welcome {this.state.formData.name}</h1>
                    <p className="lead">This is your welcome page.</p>
                    <hr className="my-4" />
                    <p>From here choose your path on the Navigation bar above to continue...</p>
                    <p className="lead">
                    </p>
                </div>

                <button
                    className="btn btn-danger ml-3"
                    onClick={this.onClickLogoutButton}
                    type="button"
                >Logout
                </button>

            </React.Fragment>
        )
    }

}
export default Welcome;



