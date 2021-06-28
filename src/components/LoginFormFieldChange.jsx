import React from "react";
// import * as userService from "../services/userService";

class LogIn extends React.Component {
    componentDidMount() {
    }

    state = {
        formData: {
            email: "",
            password: "",
            tenantId: "U01G9DC01FC"
        }

    };

    handleLogin = (e) => {
        e.preventDefault();

        // userService.logIn(this.state.formData)
        //     .then(this.onLogInClickSuccess)
        //     .catch(this.onLogInClickError);

    }

    onLogInClickSuccess = (response) => {
        console.log("log in successful")
    }

    onLogInClickError = (errResponse) => {
        console.error("login error")
    }

    onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;


        this.setState(() => {
            let newState = { ...this.state.formData };

            newState[inputName] = newValue;


            // console.log("newState", newState.email, { newState });

            return { formData: newState };
        })


    }
    onRegisterClick = (e) => {
        console.log("click register button works")
        this.props.history.push("./Registration");
    }


    render() {
        return (
            <div className="col-md-3">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail" >

                        </label>
                        <input type="email"
                            className="form-control"
                            id="emailLogIn"
                            name="email"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.email}
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword" >

                        </label>
                        <input type="password"
                            className="form-control"
                            id="passwordLogIn"
                            name="password"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.password}
                            placeholder="Password"
                        />
                    </div>

                    <button type="button" className="btn btn-primary" onClick={this.handleLogin}>Login</button>
                    <button type="button" className="btn btn-primary" onClick={this.onRegisterClick}>Register now</button>
                </form>
            </div>

        )
    }


}

export default LogIn;



