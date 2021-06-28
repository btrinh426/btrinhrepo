import React from "react"
import userServices from "../services/userServices";
import { toast } from "react-toastify";



class HomePage extends React.Component {

    state = {
        id: "",
        name: "",
    };

   /* currentUserInfo = () => {
        userServices.currentUser()
            .then(this.grabCurrentUserInfoSuccess)
            .catch(this.grabCurrentUserInfoError)
    }*/


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

export default HomePage