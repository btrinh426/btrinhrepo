import React from "react"
import userServices from "../services/userServices";
import { toast } from "react-toastify";
import { withRouter } from "react-router";



class HomePage extends React.Component {
    state = {
        id: 6415,
        name: "Maurice",
    }

    onComponentMount = () => {
        let payload = {
            email: "maurice.g.washington@gmail.com",
            password: "Kyocera6*",
            tenantID: "U01TY0VT466"
        };
        
        userServices.login(payload)
            .then(this.loginSuccess)
            .catch(this.loginError)

        let id = this.state.id;

        userServices.currentUser()
            .then(this.userIdSuccess)
            .catch(this.userIdError)
    }

    userIdSuccess = response => {
        console.log(response)
    }

    userIdError = response => {
        console.log(response)
    }

    loginSuccess = () => {
        console.log("logged in")
    }

    loginError = () => {
        console.log("not logged  in")
    }

    logOut = () => {
        userServices.logout()
            .then(this.onSuccessfulLogOut)
            .catch(this.onLogOutError)
    }

    onSuccessfulLogOut = response => {
        toast.success("You have logged out")
    }

    onLogOutError = response => {
        toast.error("Something went wrong")
    }
    
    render() {

    this.onComponentMount()       
        return (
            <React.Fragment>

               
                <h5>Welcome to the home page</h5>

                <button 
                className="btn btn-outline-danger" 
                onClick={this.logOut}>
                Log Out
                </button>
            </React.Fragment>

        )
    }
}

export default withRouter(HomePage)