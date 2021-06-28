import React from "react"
import * as registerUserService from "../services/registerUserService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "react-router-dom";

class Login extends React.Component {
    state = {
        formData: {
            email: ""
            , password: ""
            , tenantId: ""
        },
        isModalOpen: false,
        hasMadeAjax: true,
        arrayOfComp: [],

    }

    onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name; //email & password

        this.setState(() => {
            let formData = { ...this.state.formData };

            formData[inputName] = newValue;
            console.log({ formData });
            return { formData };
        });
    };

    onLoginClicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        // console.log(e); //button works
        const payload = { ...this.state.formData }
        console.log(payload);

        registerUserService.logIn(payload)
            .then(this.onLoginSuccess)
            .catch(this.onLoginError)

    }

    onLoginSuccess = (response) => {
        console.log("This is my response", response);
        toast.success('Login Successful', {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        this.props.history.push("/homepage")
        
    }

    onLoginError = (error) => {
        toast.error('Login Attempt Failed. Please Try Again', {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    onRegNowClicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Button was Clicked");
        this.props.history.push("/registration")
    };

    componentDidUpdate(prevProps) {
        let currentPath = this.props.location.pathname;
        let previousPath = prevProps.location.pathname;
        console.log( "buttons", {currentPath,previousPath} )
    }
    render() {
        console.log( "Rendering Buttons" );
        return (
            <div className="container p-5">
                <center>
                    <h1 className="mb-3 fw-normal">Welcome!</h1>
                    <h3 className="mb-3 fw-normal">Sign in to Continue</h3>
                    <ToastContainer />
                    <div className="row">
                        <div className="col-md-12">
                            <form>
                                <div className="col-sm-6">
                                    <input type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        name="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Email"
                                        onChange={this.onFormFieldChanged}
                                        value={this.state.formData.email}
                                    />
                                </div>
                                <div className="col-sm-6 p-3">
                                    <input type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="password"
                                        aria-describedby="passwordHelp"
                                        placeholder="Enter Your Password"
                                        onChange={this.onFormFieldChanged}
                                        value={this.state.formData.password}
                                    />
                                </div>

                                <div className="col-sm-6">
                                    <input type="text"
                                        className="form-control"
                                        id="exampletenantId1"
                                        name="tenantId"
                                        aria-describedby="tenantIdHelp"
                                        placeholder="Enter Your Id"
                                        onChange={this.onFormFieldChanged}
                                        value={this.state.formData.tenantId}
                                    />
                                </div>
                                <div className="col-sm-6 p-3">
                                    <button
                                        className="w-100 btn btn-lg btn-primary"
                                        type="submit"
                                        onClick={this.onLoginClicked}
                                    >
                                        Login
                                    </button>
                                </div>

                                <div className="col-sm-6 p-3">
                                    <h3 className="fw-normal p-3">Need to Signup?</h3>
                                </div>

                                <div className="col-sm-6">
                                    <button
                                        className="w-100 btn-lg btn-primary"
                                        type="submit"
                                        onClick={this.onRegNowClicked}
                                    >
                                        Register Now
                                    
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </center>
            </div>

        )
    }
}

export default withRouter(Login);
