import React from "react";
import Registration from "../Components/Register";
import * as UserService from "../services/userService";
import { toast } from "react-toastify";

class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                email: "",
                password: "",
            }
        }
    }

    registerRedirect = () => {
        this.props.history.push("/register")
    }

    signInButton = e => {
        e.preventDefault();
        let data = this.state.formData;

        UserService.logIn(data)
            .then(this.logInSuccessful)
            .catch(this.logInUnsuccessful)
    }

    logInSuccessful = () => {

        toast.success("Welcome!")
        this.props.history.push("/home")
    }

    logInUnsuccessful = () => {
        toast.error("CHECK YOUR INFO AGAIN")
    }

    onDataEntered = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputValue = newValue.name;
        this.setState(() => {
            let formData = { ...this.state.formData };
            formData[inputValue] = newValue;
            return { formData };
        })
    }

    render() {
        return <React.Fragment>
            <div className="container" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                <div className="row"><form>
                    <div className="col">
                        <h3 className="logInText p-3">LOG IN HERE</h3>
                    </div>

                    <div className="form-group">
                        <input className="form-control" type="email" id="email" name="email" value={this.state.formData.email} onChange={this.onDataEntered} placeholder="Enter Email Address"></input>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" id="password" name="password" value={this.state.formData.password} onChange={this.onDataEntered} placeholder="Enter Password"></input>
                    </div>
                    <button onClick={this.signInButton}>Sign In</button>
                    <div className="col p-3">
                        <h3 className="logInText p-3">Need to Register?</h3>
                        <button onClick={this.registerRedirect}>Register Here</button>
                    </div>
                </form>

                </div>

            </div>
        </React.Fragment>
    }
}



export default LogIn;