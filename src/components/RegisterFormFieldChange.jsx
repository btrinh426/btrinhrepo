import React from "react";
// import * as userService from "../services/userService";


class Registration extends React.Component {
    componentDidMount() { }

    state = {
        formData: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            avatarUrl: "https://api.remotebootcamp.dev/apihelp/rbclogo.png",
            tenantId: "U01G9DC01FC"
        }

    };

    handleRegistration = (e) => {
        e.preventDefault();
        // userService.register(this.state.formData)
        //     .then(this.onRegisterSuccess)
        //     .catch(this.onRegisterError);

    }

    onRegisterSuccess = (response) => {
        console.log("registration successful")
    }

    onRegisterError = (errResponse) => {
        console.error("registration error")
    }




    onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;


        this.setState(() => {
            let newState = { ...this.state.formData };

            newState[inputName] = newValue;

            console.log("newState", newState.firstName, { newState });

            return { formData: newState };
        })
    }

    render() {
        return (
            <div className="col-md-3">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputFirstName">
                            First Name
                    </label>
                        <input type="text"
                            className="form-control"
                            id="firstNameRegister"
                            name="firstName"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.firstName}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputLastName" >
                            Last Name
                    </label>
                        <input type="text"
                            className="form-control"
                            id="lastNameRegister"
                            name="lastName"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.lastName}

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail" >
                            Email
                    </label>
                        <input type="email"
                            className="form-control"
                            id="emailRegister"
                            name="email"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.email}
                            placeholder="example@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword" >
                            Password
                    </label>
                        <input type="password"
                            className="form-control"
                            id="passwordRegister"
                            name="password"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.password}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPasswordConfirm" >
                            Password Confirm
                    </label>
                        <input type="password"
                            className="form-control"
                            id="passwordConfirmRegister"
                            name="passwordConfirm"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.passwordConfirm}
                        />
                    </div>


                    <button type="button" className="btn btn-primary" onClick={this.handleRegistration}>Submit Registration</button>
                </form>
            </div>


        )
    }
}

export default Registration;