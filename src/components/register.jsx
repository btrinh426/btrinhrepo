import React from "react";
import * as Process from "../services/userService";
import { toast } from "react-toastify";
import SimpleNavBar from "../components/navbarsimple";

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            avatarURL: "",
            tenantID: 654651
        }
    }

    onDataEntered = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState((prevState) => { return { ...prevState, [name]: value } });
    }

    onClickedButton = (e) => {
        e.preventDefault();
        let data = this.state;
        Process.usersRegister(data).then(this.onPassingData).catch(this.onPassingError)
    }

    onPassingData = () => { toast.success("Registered!"); this.props.history.push("/login") }

    onPassingError = () => toast.error("Please review your data and try again")



    render() {
        return <React.Fragment>
            <SimpleNavBar />
            <div className="container form">
                <div className="row"></div>
                <div className="row-3">
                    <h3 className="registerText p-1">REGISTER HERE</h3>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="firstName">Please Enter Your First Name</label>
                        <input className="form-control" type="text" id="firstName" name="firstName" value={this.state.firstName} onChange={this.onDataEntered} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Please Enter Your Last Name</label>
                        <input className="form-control" type="text" id="lastName" name="lastName" value={this.state.lastName} onChange={this.onDataEntered} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Please Enter Your Email Address</label>
                        <input className="form-control" type="email" id="email" name="email" value={this.state.email} onChange={this.onDataEntered} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password1">Please Enter Your Password</label>
                        <input className="form-control" type="password" id="password" name="password" value={this.state.password} onChange={this.onDataEntered} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Please Re-Enter That Same Password</label>
                        <input className="form-control" type="password" id="passwordConfirm" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.onDataEntered} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="avatar">Please Enter an Avatar URL</label>
                        <input className="form-control" type="text" id="avatarURL" name="avatarURL" value={this.state.avatarURL} onChange={this.onDataEntered} />
                    </div>
                    <button onClick={this.onClickedButton}>Click to Register!</button>
                </form>
                <div className="row"></div>
            </div>
        </React.Fragment>;
    }
}

export default Register;