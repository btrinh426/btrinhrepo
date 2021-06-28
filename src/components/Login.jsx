import React from "react";
import * as userService from "../services/userService";
import Swal from "sweetalert2";

class Login extends React.Component
{
    state = {
        formData: { email: "",
                    password: "",
                    tenantId: "U01E6LHFVGW"
                }
    };

    onFormFieldChange = (e) =>
    {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState(() => {
            let formData = {...this.state.formData};

            formData[inputName] = newValue;

            return {formData};
        });
    }

    onLoginClicked = (e) =>
    {
        e.preventDefault();
        console.log(this.state.formData);

        userService.logIn(this.state.formData)
            .then(this.onLoginUserSuccess)
            .catch(this.onLoginUserError);
    }

    onRegisterClicked = (e) =>
    {
        e.preventDefault();
        console.log(this.state.formData);

        this.props.history.push("/register");
    }

    onLoginUserSuccess = (response) =>
    {
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You successfully logged in!'
      })

      this.props.history.push("/homepage");
    }

    onLoginUserError = (errResponse) =>
    {
      console.warn(errResponse.data);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'You were not able to be logged in!'
      })
    }

    render() {
        return (
            <main role="main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 p-5">
                            <div className="form-group">
                                <label htmlFor="email">Email Address:</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="email"
                                    onChange={this.onFormFieldChange} 
                                    placeholder="Enter email address"
                                    value={this.state.formData.email} 
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="password"
                                    onChange={this.onFormFieldChange}  
                                    placeholder="Password"
                                    value={this.state.formData.password}  
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                onClick={this.onLoginClicked}
                                >
                                    Login
                            </button>
                            <br />
                            <br />
                            <p className="text-muted">Need to Sign Up?</p>
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary"
                                onClick={this.onRegisterClicked}
                                >
                                    Register Now
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Login;