import React from "react";
import * as userService from "../services/userService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css"

class Register extends React.Component {
    state = {
        registerData: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            avatarUrl: "",
            tenantId: "U01KAQ0S317"
        }
    };

    onInputChange = (e) => {
        let currentTarget = e.currentTarget
        let newValue = currentTarget.value
        let inputName = currentTarget.name

        this.setState(() => {
            let registerData = { ...this.state.registerData }
            registerData[inputName] = newValue;

            return { registerData };
        });
    };

    registerSubmitBtn = e => {
        e.preventDefault();
        const data = { ...this.state.registerData }

        userService.userRegister(data)
            .then(this.onRegisterSuccess)
            .catch(this.onRegisterError)
    };

    onRegisterSuccess = (response) => {
        console.log({ registered: response })
        Swal.fire({
            icon: 'success',
            title: 'Awesome!',
            text: 'Your account has been created.',
        })

    };

    onRegisterError = (response) => {
        console.warn({ error: response })
        Swal.fire({
            icon: 'error',
            title: 'Uh-Oh!',
            text: 'Something went wrong...',
        })
    };

    render() {
        return <form style={{ margin: "8rem" }}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputFirstName">First Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        id="firstName"
                        onChange={this.onInputChange}
                        value={this.state.registerData.firstName}
                    />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputLastName">Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        id="inputLastName"
                        onChange={this.onInputChange}
                        value={this.state.registerData.lastName}
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="inputEmail">Email:</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="inputEmail"
                    placeholder="Email Address"
                    autoComplete="username"
                    onChange={this.onInputChange}
                    value={this.state.registerData.email}
                />
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword">Password:</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="inputPassword"
                    placeholder="Password"
                    autoComplete="new-password"
                    onChange={this.onInputChange}
                    value={this.state.registerData.password}
                />
            </div>
            <div className="form-group">
                <label htmlFor="inputpasswordConfirm">Confirm Password:</label>
                <input
                    type="password"
                    className="form-control"
                    name="passwordConfirm"
                    id="inputpasswordConfirm"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    onChange={this.onInputChange}
                    value={this.state.registerData.confirmPassword}
                />
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputAvatar">Avatar:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="avatarUrl"
                        id="inputAvatar"
                        onChange={this.onInputChange}
                        value={this.state.registerData.avatar}
                    />
                </div>
            </div>

            <button type="submit" className="btn btn-primary" onClick={this.registerSubmitBtn}>Register</button>
        </form>
    }
};

export default Register;