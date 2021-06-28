import React from "react";
import * as UserService from "../services/userService";
import { toast } from "react-toastify";
import SimpleNavBar from "../components/navbarsimple";

class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            tenantId: 654651
        }
    }

    onRedirect = () => this.props.history.push("/register");

    onDataEntered = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState((prevState) => { return { ...prevState, [name]: value } });
    }

    onLogInPressed = (e) => {
        e.preventDefault();
        let data = this.state;
        UserService.usersLogIn(data).then(this.onLogInSuccessful).catch(this.onLogInError);
    };

    onLogInSuccessful = () => {
        toast.success("Welcome!");
        this.props.history.push("/home")
    }

    onLogInError = () => {
        toast.error("Try again, buddy!")
    }

    render() {
        return <React.Fragment>
            <SimpleNavBar />
            <div className="container">
                <div className="row" />
                <div className="row">
                    <div className="col">
                        <h3 className="loginText p-1"><strong>LOG IN (please)</strong></h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email Address:</label>
                                <input className="form-control" type="email" name="email" id="email" onChange={this.onDataEntered} value={this.state.email} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input className="form-control" type="password" name="password" id="password" onChange={this.onDataEntered} value={this.state.password} />
                            </div>
                            <button onClick={this.onLogInPressed}>Log In!</button>
                            <div>
                                <p className="p-3">(or perhaps you need to <button onClick={this.onRedirect}>Register</button> instead?)</p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row" />
            </div>
        </React.Fragment>;
    }
}

export default LogIn;