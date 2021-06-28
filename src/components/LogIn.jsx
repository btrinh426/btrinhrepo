import React from "react";
import * as userService from "../services/userService";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import debug from "sabio-debug"

const _logger = debug.extend(" Login")

class LogIn extends React.Component {



    state = {
        formData: {
            email: "",
            password: "",
            tenantId: "U01G9DC01FC"
        }

    };

    handleLogin = (values) => {
        
        userService
            .logIn(values)
            .then(this.onLogInClickSuccess)
            .catch(this.onLogInClickError);

        _logger("values:", values)

    }

    onLogInClickSuccess = (response) => {
        _logger("log in successful")
    }

    onLogInClickError = (errResponse) => {
        _logger("login error")
    }


    onRegisterClick = (e) => {
        console.log("click register button works")
        this.props.history.push("./Registration");
    }


    render() {
        _logger("rendering")

        return (
            <Formik
                initialValues={this.state.formData}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                })}
                onSubmit={this.handleLogin}
                enableReinitialize={true}
            >
                <div className="col-md-3">
                    <Form>
                        <div className="form-group">
                            <label htmlFor="InputEmail" >
                                Email
                            </label>
                            <Field
                                type="email"
                                className="form-control"
                                id="emailRegister"
                                name="email"
                                placeholder="Enter email"
                            />
                            <ErrorMessage name="email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="InputPassword" >
                                Password
                            </label>
                            <Field
                                type="password"
                                className="form-control"
                                id="passwordRegister"
                                name="password"
                            />
                            <ErrorMessage name="password" />
                        </div>


                        <button type="submit" className="btn btn-primary" >Login</button>
                        <button type="button" className="btn btn-primary" onClick={this.onRegisterClick}>Register now</button>
                    </Form>
                </div>
            </Formik>

        )
    }


}

export default LogIn;



