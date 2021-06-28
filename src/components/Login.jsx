import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



toast.configure()
class Login extends Component {
    state = {
        formData: {
            email: "",
            password: "",
            tenantId: "U01U47TQK28"
        }
    };

    onFormFieldChange = (e) => {
        console.log(e.currentTarget.name, e.currentTarget.value);
        const currentTarget = e.currentTarget;
        const newValue = currentTarget.value;
        const inputName = currentTarget.name;


        this.setState(() => {
            const formData = { ...this.state.formData };
            formData[inputName] = newValue;
            return { formData };
        })
    }

    onLoginButtonClick = (e) => {
        e.preventDefault();
        console.log("you clicked login button")
        console.log("current state: ", this.state.formData)
        userService.login(this.state.formData)
            .then(this.onLoginSuccess)
            .catch(this.onLoginError)
    }

    onLoginSuccess = (response) => {
        console.log({ success: response })

        toast.success("Login Successful")
        this.props.history.push("/welcome")

    }
    onLoginError = (response) => {
        console.warn({ error: response })
        toast.error("Login Error check your fields")
    }


    render() {
        return (
            <React.Fragment>
                <div className="jumbotron jumbotron-fluid" style={{ backgroundColor: "#b4aee8" }}>
                    <div className="container">
                        <h1 className="display-3">Welcome to the Components App!</h1>
                        <p className="lead">Your registration was successful!</p>
                    </div>
                </div>
                <div className="container">
                    <h1>Utilize your registration credentials to login</h1>
                    <div className="row">
                        <div className="col form-group">
                            {/* <h1 className="register" style={{ color: "#93329e" }} > Register!</h1> */}



                            <div className="row mt-3">

                                <div className="col form-group">
                                    <h1 className="loginText" style={{ color: "#93329e" }}>Login</h1>

                                    <form method="post" action="/login">
                                        <p>
                                            <label htmlFor="email">Email:</label>
                                            <input type="text" id="email" name="email" onChange={this.onFormFieldChange} />
                                        </p>
                                        <p>
                                            <label htmlFor="password">Password:</label>
                                            <input type="password" id="password" name="password" onChange={this.onFormFieldChange} />
                                        </p>
                                        <p>
                                            <NavLink to="/">I forgot my password</NavLink>

                                        </p>
                                        <p style={{ color: "blue" }}>
                                            {/* <a href="/register">Register a new membership</a> */}
                                            <NavLink to="/Register">Register a new Membership</NavLink>
                                        </p>
                                        <button
                                            className="btn btn-warning"
                                            style={{ backgroundColor: "#ffd880" }}
                                            type="submit"
                                            onClick={this.onLoginButtonClick}>
                                            Login
                                        </button>

                                    </form>
                                </div>
                            </div>
                            <h1 className="loginText mt-4" style={{ color: "black" }}>Not Registered?</h1>
                            {/* <h2 className="loginText" style={{ color: "#93329e" }}>Register</h2> */}

                            <button className="btn btn-outline-warning m-2"><NavLink to="/Register">Register Here</NavLink></button>
                        </div>
                    </div>
                </div>

            </React.Fragment >

        )



    }
}
export default Login;