import React from "react";
import * as userService from "../services/userService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css"

class Login extends React.Component {
    state = {
        loginData: {
            email: "",
            password: "",
            tenantId: "U01KAQ0S317"
        }
    };

    onInputChange = e => {
        let currentTarget = e.currentTarget
        let newValue = currentTarget.value
        let inputName = currentTarget.name

        this.setState(() => {
            let loginData = { ...this.state.loginData }
            loginData[inputName] = newValue;

            return { loginData }
        });
    };

    loginSubmitBtn = e => {
        e.preventDefault();
        const data = { ...this.state.loginData };

        // data is passing in the updated state
        userService.userLogin(data)
            .then(this.onLoginSuccess)
            .catch(this.onLoginError)
    };

    onLoginSuccess = (response) => {
        console.log({ loggedIn: response })
        Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You are now free to move about...',
        })
        this.props.history.push("/home");
    };

    onLoginError = (response) => {
        console.log({ error: response })
        Swal.fire({
            icon: 'error',
            title: 'Uh-Oh!',
            text: 'Unable to login...',
        })
    }
    render() {
        return <form style={{ margin: "8rem" }}>
            <div className="form-group">
                <label htmlFor="inputEmail">Email address:</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="inputEmail"
                    placeholder="Email Address"
                    autoComplete="username"
                    aria-describedby="emailHelp"
                    onChange={this.onInputChange}
                    value={this.state.loginData.email}
                />
            </div>
            <div className="form-group">
                <label htmlFor="inputPassword">Password:</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="inputPassword"
                    autoComplete="new-password"
                    placeholder="Password"
                    onChange={this.onInputChange}
                    value={this.state.loginData.password}
                />
            </div>

            <button type="submit" className="btn btn-primary" onClick={this.loginSubmitBtn}>Login</button>
        </form>
    };
};

export default Login;