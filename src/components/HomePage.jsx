import React, {Component} from "react"
import userServices from "../services/userServices";
import { toast } from "react-toastify";
import { withRouter } from "react-router";



class HomePage extends Component {
    //state = {
        //id: 6415,
        //name: "Maurice",
    //}



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

    //this.onComponentMount()       
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

//export default withRouter(HomePage)
export default HomePage