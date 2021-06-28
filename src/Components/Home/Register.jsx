import React from "react";
import logo from "./logo.svg";
import * as userService from "../../services/userService";
import "./Home.css";
import Swal from "sweetalert2";

class Register extends React.Component {
    state = {
        userData: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            avatarUrl: "",
            tenantId: "U01R71K7F19",
        },
    };

    onFormChange = e => {
        //console.log("click", e);
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;
        this.setState(() => {
            let newState = { ...this.state.userData };
            newState[inputName] = newValue;

            return { userData: newState };
        });
    };

    onClickEvent = e => {
        e.preventDefault();

        let userdata = {
            firstName: this.state.userData.firstName,
            lastName: this.state.userData.lastName,
            email: this.state.userData.email,
            password: this.state.userData.password,
            passwordConfirm: this.state.userData.passwordConfirm,
            avatarUrl: this.state.userData.avatarUrl,
            tenantId: this.state.userData.tenantId,
        };
        //console.log(userdata);
        userService.register(userdata).then(this.onRegOk).catch(this.onRegFail);
    };

    onRegOk = res => {
        console.log(res.data);

        Swal.fire({
            icon: "success",
            title:
                "You have successfully registered your Happy Place, please log in.",
        });

        setTimeout(() => {
            this.props.history.push("/login");
        }, 2000);
    };
    onRegFail = res => {
        console.error(res.config);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "<a href>Please check your information and try again.</a>",
        });
    };

    render() {
        return (
            <React.Fragment>
                <div className="container rfCont">
                    <div className="container">
                        <form className="row g-3">
                            <div className="col-8-md rfTitle">
                                <img
                                    id="tImg"
                                    alt=""
                                    src={logo}
                                    width="100"
                                    height="100"
                                />
                                <h4> Register a new membership </h4>
                            </div>
                            <div className="col-md-12">
                                <label
                                    htmlFor="inputFirst"
                                    className="form-label"
                                ></label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="form-control"
                                    placeholder="First Name"
                                    onChange={this.onFormChange} //currentTarget = input
                                    value={this.state.userData.firstName}
                                ></input>
                                <div className="col-md-12">
                                    <label
                                        htmlFor="inputLast"
                                        className="form-label"
                                    ></label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="form-control"
                                        placeholder="Last Name"
                                        onChange={this.onFormChange} //currentTarget = input
                                        value={this.state.userData.lastName}
                                    ></input>
                                </div>
                                <div className="col-md-12">
                                    <label
                                        htmlFor="inputEmail"
                                        className="form-label"
                                    ></label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="you@wherever.whatever"
                                        onChange={this.onFormChange} //currentTarget = input
                                        value={this.state.userData.email}
                                    ></input>
                                </div>
                                <div className="col-md-12">
                                    <label
                                        htmlFor="inputPassword"
                                        className="form-label"
                                    ></label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={this.onFormChange} //currentTarget = input
                                        value={this.state.userData.password}
                                    ></input>
                                </div>
                                <div className="col-md-12">
                                    <label
                                        htmlFor="inputPassword"
                                        className="form-label"
                                    ></label>
                                    <input
                                        type="password"
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        onChange={this.onFormChange} //currentTarget = input
                                        value={
                                            this.state.userData.passwordConfirm
                                        }
                                    ></input>
                                </div>
                                <div className="col-md-12">
                                    <label
                                        htmlFor="inputCity"
                                        className="form-label"
                                    ></label>
                                    <input
                                        type="url"
                                        id="avatarUrl"
                                        name="avatarUrl"
                                        className="form-control"
                                        placeholder="Avatar Url"
                                        onChange={this.onFormChange} //currentTarget = input
                                        value={this.state.userData.avatarUrl}
                                    ></input>
                                </div>
                                <div className="col-md 4">
                                    <button
                                        type="button"
                                        className="btn btn-primary rfButton"
                                        onClick={this.onClickEvent}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Register;
