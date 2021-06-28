import React from "react";
import * as userService from "./services/userService";
import {Redirect} from "react-router-dom";

class Homepage extends React.Component {

    state = {
        name: "--Please login--",
        image: "",
        redirect: false
    }

    componentDidMount(){
        userService.currentUser()
            .then(this.onGetCurrentUserSuccess)
            .catch(this.onGetCurrentUserError);
    }
   
    getById = (id) => {
        userService.userById(id)
            .then(this.onGetByIdSuccess)
            .catch(this.onGetByIdError);
    }

    logoutUser = () => {
        userService.logout()
            .then(this.onLogoutSuccess)
            .catch(this.onLogoutError);
    }

    onGetCurrentUserSuccess = (response) => {
        this.getById(response.data.item.id);
    }
    onGetCurrentUserError = (response) => {
        console.warn({error: response});
        this.setState({redirect: true});
    }

    onGetByIdSuccess = (response) => {
        console.log(response);
        this.setState({ name : `${response.data.item.firstName} ${response.data.item.lastName}`});
        
    }
    onGetByIdError = (response) => console.warn({error: response});

    onLogoutSuccess = (response) => {
        console.log(response);
        this.setState({redirect: true});
    }
    onLogoutError = (response) => {
        console.warn({error: response});
    }




    render()
    {
        if(this.state.redirect)
        {
            return (<Redirect to="/login" />);
        }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-center pt-5">
                            <h2>Hello, {this.state.name}.</h2>
                        </div>
                        {/* <div className="col-12 p-5 text-center">
                            <img src={this.state.image} alt="" className="rounded img-thumbnail"></img>
                        </div> */}
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-1">
                        <button className="btn btn-link" onClick={this.logoutUser}>Logout</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Homepage;