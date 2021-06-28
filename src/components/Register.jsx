import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import userService from "../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


class Register extends Component {
    state = {
        formData: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            avatarUrl: "",
            tenantId: "U01U47TQK28",
        },
    };

    onFormFieldChange = (e) => {
        console.log(e.currentTarget.name, e.currentTarget.value);
        const currentTarget = e.currentTarget;
        const newValue =
            currentTarget.type === "checkbox"
                ? currentTarget.checked
                : currentTarget.value;
        const inputName = currentTarget.name;

        this.setState(() => {
            const formData = { ...this.state.formData };
            formData[inputName] = newValue;
            return { formData };
        });
    };

    onRegisterButtonClicked = (e) => {
        e.preventDefault();
        console.log("you clicked submit");
        console.log("current State: ", this.state.formData);
        userService.register(this.state.formData)
            .then(this.onRegisterSuccess)
            .catch(this.onRegisterError);
    };

    onRegisterSuccess = (response) => {
        toast.success(`Welcome ${this.state.formData.firstName} Registration Successful`
        );
        console.log({ successRegistration: response });
        this.props.history.push("/login");
    };
    onRegisterError = (response) => {
        // this.errorToast()
        toast.error(`Registration error, Please check all your fields`);
        // this.onFormFieldChange();
        console.warn({ errorRegistration: response });
    };

    // errorToast = () => {
    //     toast(`Please check all your input fields`, "Registration failed", {
    //         type: "error",
    //         draggable: true,
    //         position: toast.POSITION.BOTTOM_CENTER,
    //     });
    // };

    render() {
        return (
            <React.Fragment>
                <div
                    className="jumbotron jumbotron-fluid"
                    style={{ backgroundColor: "#b4aee8" }}
                >
                    <div className="container">
                        <h1 className="display-3">Welcome to the Components App!</h1>
                        <p className="lead">
                            Please register down bellow, if already registered feel free to
                            login...
                        </p>
                    </div>
                </div>
                <div className="container">
                    <h1>Please Login or Register</h1>
                    <div className="row">
                        <div className="col form-group">
                            <h1 className="register" style={{ color: "#93329e" }}>
                                {" "}
                                Register!
                            </h1>
                            <form id="loginForm">
                                <p>
                                    <label htmlFor="firstName">First Name:</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        onChange={this.onFormFieldChange}
                                        value={this.state.formData.firstName}
                                    />
                                </p>
                                <p>
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        onChange={this.onFormFieldChange}
                                        value={this.state.formData.lastName}
                                    />
                                </p>

                                <p>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={this.onFormFieldChange}
                                        value={this.state.formData.email}
                                    />
                                </p>
                                <p>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={this.onFormFieldChange}
                                        value={this.state.formData.password}
                                    />
                                </p>
                                <p>
                                    <label htmlFor="passwordConfirmation">
                                        Password Confirmation:
                                    </label>
                                    <input
                                        type="password"
                                        name="passwordConfirm"
                                        onChange={this.onFormFieldChange}
                                        value={this.state.formData.passwordConfirm}
                                    />
                                </p>
                                <p>
                                    <label htmlFor="avatarUrl">Avatar URL: </label>
                                    <input
                                        type="text"
                                        name="avatarUrl"
                                        onChange={this.onFormFieldChange}
                                        value={this.state.formData.avatarUrl}
                                    />
                                </p>

                                <button
                                    type="submit"
                                    className="btn btn-warning"
                                    style={{ backgroundColor: "#ffd880" }}
                                    onClick={this.onRegisterButtonClicked}
                                >
                                    Register
                                </button>
                            </form>
                        </div>

                        <div className="col form-group">
                            <h1 className="loginText" style={{ color: "#93329e" }}>
                                Already Registered?
                            </h1>
                            <h2 className="loginText" style={{ color: "#93329e" }}>
                                Login
                            </h2>
                            <button
                                type="button"
                                className="btn btn-warning mt-3"
                                style={{ backgroundColor: "#ffd880" }}
                            >
                                <NavLink to="/login">Login</NavLink>
                            </button>
                        </div>
                    </div>
                </div>
                <footer className="container">
                    <p>&copy; Soulpanton 2021</p>
                </footer>
            </React.Fragment>
        );
    }
}

export default Register;
