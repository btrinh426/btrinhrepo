import React from "react"
import TrelloSideNav from "./TrelloSideNav";
import NavBar from "./NavBar";
import "./css/TrelloSideNav.css"
import "./css/NavBar.css"
import * as userService from "../services/userService";



class Login extends React.Component {
    state = {
        email: "",
        password: "",
        tenantId: "U01JV2XFH5K"
    }

    onFormChange = (e) => {
        let currentTarget = e.currentTarget;
        let currentValue = currentTarget.value;
        let inputName = currentTarget.name;
        this.setState( () => {
            let newLoginState = {};
            newLoginState[inputName] = currentValue;
            return newLoginState
        })

    }

    onLoginPressed = (e) => {
        e.preventDefault();
        userService.logIn(this.state)
            .then(this.onLoginSuccess)
            .catch(this.onLoginSuccess);
    }

    onLoginSuccess = (response) => {console.log(response)}

    onLoginError = (response) => {console.error(response)}




    render() {
        return (
            <React.Fragment>
            <NavBar />
            <div className="wrapper d-flex align-items-stretch">
            <TrelloSideNav />
            <div className="w-25 mx-auto shadow p-3 mb-5 mt-5 bg-white rounded">
            
                <form>
                    <div>
                        <div className="title mx-auto text-center p-3 mb-5 rounded mt-5">
                            <h2>Log In</h2>
                        </div>
                        <div className="form-group w-100 mx-auto">
                            <label>Email address</label>
                            <input type="email" name="email" value={this.state.email} onChange={this.onFormChange} className="form-control" id="loginEmail" placeholder="name@example.com" />
                        </div>
                        <div className="form-group w-100 mx-auto">
                            <label>Password</label>
                            <input type="password" name="password" value={this.state.password} onChange={this.onFormChange} className="form-control" id="loginPassword" placeholder="Password" />
                        </div>
                        <div className="mx-auto">
                        <button type="submit" id="logInButton" onClick={this.onLoginPressed} className="btn btn-primary w-100 mx-auto">Log In</button>
                        </div>
                        <div>
                            <p id="signUp" className="text-center mt-5">Need to Signup? <a href="/register">Register Now</a></p>
                        </div>
                    </div>
                </form>
            </div>
            </div>
            </React.Fragment>
        )
    }
}

export default Login;