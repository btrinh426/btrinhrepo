import React from "react";
import * as registerUserService from "../services/registerUserService";
import 'react-toastify/dist/ReactToastify.css';
// import { withRouter } from "react-router-dom";

class Homepage extends React.Component {
    state = {
        formData: {
            firstName: ""
            , lastName: ""
            , email: ""
            , password: ""
            , passwordConfirm: ""
            , avatarUrl: ""
        },
        isModalOpen: false,
        hasMadeAjax: true,
        arrayOfComp: [],

    }
    componentDidMount() {
        registerUserService.getCurrent()
            .then(this.onCurrentSuccess)
            .catch(this.onCurrentError)
    }

    onCurrentSuccess = (response) => {
        let userId = response.data.item.id; // provides Id (5500)
        console.log("This is my response", userId);
        registerUserService.getUserId(userId)
            .then(this.onUserIdSuccess)
            .catch(this.onUserIdError)
    }

    onCurrentError = (error) => {
        console.log("Error", error);
    }

    onUserIdSuccess = (response) => {
        console.log("By Id Success", response);
        let id = response.data.item.id;
        let firstName = response.data.item.firstName;
        let lastName = response.data.item.lastName;
        let email = response.data.item.email;
        let avatarUrl = response.data.item.avatarUrl;
        this.setState((prevState) => { // use prevState
            let newState = { ...prevState };
            newState.id = id;
            newState.firstName = firstName;
            newState.lastName = lastName;
            newState.email = email;
            newState.avatarUrl = avatarUrl;
            return newState;
        });
    }


    onUserIdError = (error) => {
        console.log("Error", error);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-4 sidebar">
                        <img className="rounded-circle"
                            height="250"
                            width="250"
                            alt="250x250"
                            src={this.state.avatarUrl}
                            data-holder-rendered="true"
                        ></img>
                        <h5 className="col-md-4 sidebar p-3">Hello, {this.state.firstName} {this.state.lastName}</h5>
                    </nav>
                    <div>
                        <h1 className="mb-3 fw-normal">Welcome {this.state.firstName}!</h1>
                    </div>
                </div>

                <div className="row">
                    <nav className="col-md-4 sidebar">
                        <h4>Main Navigation</h4>
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" href="/">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  Home <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/friends">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  People
                </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/blogs">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  Blogs
                </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/techcompanies">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  Tech Companies
                </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/jobs">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  Jobs
                </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/events">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  Events
                </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/registration">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              Register
            </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Homepage;