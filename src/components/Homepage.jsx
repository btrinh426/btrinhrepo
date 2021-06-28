import React from "react";
import * as userService from "../services/userService";

class Homepage extends React.Component
{
    state = {
        currentUser: {
            name: "",
            avatarUrl: ""
        }
    }


    componentDidMount()
    {
        userService.current()
            .then(this.onGetCurrentUserSuccess)
            .catch(this.onGetCurrentUserError);

    }

    logOutClicked = (e) =>
    {
        e.preventDefault();

        this.props.history.push("/login");
    }

    // Current User success and error handlers
    onGetCurrentUserSuccess = (response) =>
    {
        console.log(response.data);

        userService.getById(response.data.item.id)
            .then(this.onGetByIdSuccess)
            .catch(this.onGetByIdError);
    }

    onGetCurrentUserError = (errResponse) =>
    {
        console.log(errResponse.data);
    }

    // Get User By Id success and error handlers
    onGetByIdSuccess = (response) =>
    {
        console.log(response.data);
        
        var fullName = response.data.item.firstName + " " + response.data.item.lastName;

        var updater = (prevState) => {
            let currentUser = { ...prevState.currentUser };
            currentUser.name = fullName;

            return { currentUser };
        }

        this.setState(updater);
    }

    onGetByIdError = (errResponse) =>
    {
        console.log(errResponse.data);
    }

    render() {
        return (
            <div className="main">
                <div className="container workspace">
                    <header>
                        <div className="row">
                            <h2 name="userWelcomeMsg" className="text-muted">Welcome, {this.state.currentUser.name}</h2>
                            
                        </div>
                    </header>
                    <div>
                        <button 
                            type="button"
                            className="btn btn-secondary" 
                            onClick={this.logOutClicked}
                            >
                                Logout
                        </button>
                    </div>
                    <footer>
                        
                    </footer>
                </div>
            </div>
        );
    }
}

export default Homepage;