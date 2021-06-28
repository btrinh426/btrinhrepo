import React from "react";
import * as UserService from "../services/userService";
import { toast } from "react-toastify";


class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordConfirm: "",
                avatarUrl: "",
                tenantId: 54681
            }
        }
    }

    buttonClicked = (e) => {
        e.preventDefault();
        console.log("Clicked!")
        let data = this.state.formData;


        UserService.register(data)
            .then(this.onDataSuccess)
            .catch(this.onDataError)
    }

    onDataSuccess = () => {
        toast.success("You've successfully registered!");

        this.props.history.push("/LogIn")


    }

    onDataError = () => {
        toast.error("Please try again...");
    }



    onNewDataEntered = (e) => {
        let currentTarget = e.currentTarget;

        let newValue = currentTarget.value;
        let inputName = currentTarget.name;
        console.log(inputName)

        this.setState(() => {
            let formData = { ...this.state.formData };
            formData[inputName] = newValue;
            return { formData };
        });
    };

    render() {
        return <React.Fragment>
            <div className="container" >
                <div className="row">
                    <div className="col 3">
                        <h3 className="registerText p-3" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>REGISTER HERE</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="firstName">Please Enter First Name</label>
                                <input className="form-control" type="text" id="firstName" name="firstName" value={this.state.formData.firstName} onChange={this.onNewDataEntered}></input>
                            </div>
                            <div className="form group">
                                <label htmlFor="lastName">Please Enter Last Name</label>
                                <input className="form-control" type="text" id="lastName" name="lastName" value={this.state.formData.lastName} onChange={this.onNewDataEntered}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Please Enter E-Mail Address</label>
                                <input className="form-control" type="email" id="email" name="email" value={this.state.formData.email} onChange={this.onNewDataEntered}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password1">Please Register a Password</label>
                                <input className="form-control" type="password" id="password" name="password" value={this.state.formData.password} onChange={this.onNewDataEntered}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password2">Please Confirm Password</label>
                                <input className="form-control" type="password" id="passwordConfirm" name="passwordConfirm" value={this.state.formData.passwordConfirm} onChange={this.onNewDataEntered}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="avatar">Please Enter an Avatar URL</label>
                                <input className="form-control" type="text" id="avatarUrl" name="avatarUrl" value={this.state.formData.avatarUrl} onChange={this.onNewDataEntered}></input>
                            </div>
                            <button onClick={this.buttonClicked}>You're Registering!</button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>



    }
}

export default Registration;