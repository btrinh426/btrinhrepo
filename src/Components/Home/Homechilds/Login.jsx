import React from "react";
import * as userServices from "../../../services/UserService";
import Swal from "sweetalert2";
import "../HomeStyle/Home.scss";
// import * as userServies from "../../../services/UserService"

// import logo from "./logo.svg"; //for fun later

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCredentials: {
                email: "",
                password: "",
                tenantId: "U01R71K7F19",
            },
            activeUser: false,
        };
    }
    componentDidUpdate() {
        //console.log("Login Compoenent Update", this.state);
    }
    loginFormData = e => {
        console.log(e.currentTarget.value);
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;
        this.setState(() => {
            let newState = { ...this.state.userCredentials };
            newState[inputName] = newValue;

            return { userCredentials: newState };
        });
    };
    onClick = e => {
        e.preventDefault();
        console.log("clickidy clackidy");

        userServices
            .logIn(this.state.userCredentials)
            .then(this.onLoginOk)
            .catch(this.onLoginFail);
    };

    onLoginOk = res => {
        console.log(res);

        userServices
            .currentUser()
            .then(id => {
                console.log(id); // // got what I was after
                userServices.getUserById(id).then(user => {
                    console.log(user); // // same as line:43 verification
                    this.setState({
                        currentUser: user,
                        activeUser: true,
                    });

                    this.props.history.push("/home", {
                        type: "USER-INFO",
                        payload: this.state.currentUser,
                        activeUser: this.state.activeUser,
                    });
                });
            })
            .catch(this.onLoginFail);
    };

    onLoginFail = err => console.log(err);

    render() {
        return (
            <form className="container-fluid home-login">
                <div className="login">
                    <p>YOLO</p>
                </div>
                <div className="input-group ">
                    <span
                        className="input-group-text user-tag"
                        id="basic-addon1"
                    >
                        Username
                    </span>
                    <input
                        id="login-input"
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        name="email"
                        onChange={this.loginFormData}
                        value={this.state.userCredentials.email}
                        required
                    />

                    <span className="input-group-text pw-tag" id="basic-addon1">
                        Password
                    </span>
                    <input
                        id="login-input"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        name="password"
                        onChange={this.loginFormData}
                        value={this.state.userCredentials.password}
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm reg-log"
                        name="Login"
                        onClick={this.onClick}
                    >
                        Login
                    </button>
                </div>
            </form>
        );
    }
}

export default Login;
