import React from "react";
import "../../services/userService";
import "./Home.css";
import logo from "./logo.svg";
import * as buttons from "../../services/buttons";

class Login extends React.Component {
    state = {
        formData: { email: "", password: "" },
    };
    constructor(props) {
        super(props);
        console.log("These are props", { props });
    }
    componentDidMount() {
        console.log("Mounted");
    }
    onFormChange = e => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;
        this.setState(() => {
            let newState = { ...this.state.formData };
            newState[inputName] = newValue;

            return { formData: newState };
        });
    };

    onClickEvent = e => {
        e.preventDefault();

        let userdata = {
            email: this.state.formData.email,
            password: this.state.formData.password,
        };

        let ticks = new Date().getSeconds();
        this.props.history.push("/Login/" + ticks);

        buttons.onSignIn(userdata);
    };
    render() {
        return (
            <React.Fragment>
                <div className="container background" id="loCon">
                    <div className="container">
                        <form className="form-signin">
                            <div className="flex-row title" id="tiDiv">
                                <img
                                    id="tImg"
                                    alt=""
                                    src={logo}
                                    width="100"
                                    height="100"
                                />
                                <h3 className="sm-2 tiText">
                                    Sign into a Happy Place
                                </h3>
                            </div>
                            <label htmlFor="inputEmail" className="sr-only">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control lControl"
                                placeholder="Email address"
                                id="email"
                                name="email"
                                onChange={this.onFormChange} //currentTarget = input
                                value={this.state.formData.email}
                                required
                            />
                            <label htmlFor="inputPassword" className="sr-only">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control lControl"
                                placeholder="Password"
                                id="password"
                                name="password"
                                onChange={this.onFormChange} //currentTarget = input
                                value={this.state.formData.password}
                                required
                            />
                            <button
                                className="btn btn-lg btn-primary btn-block"
                                id="lButton"
                                type="button"
                                onClick={this.onClickEvent}
                            >
                                Sign in
                            </button>
                            <p className="mr-2 mb-3 text-muted float-right">
                                &copy; 2021
                            </p>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Login;
