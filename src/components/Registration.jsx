import React from "react";
import * as userService from "../services/userService";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import debug from "sabio-debug";

const _logger = debug.extend("Registration");

class Registration extends React.Component {

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

    handleRegistration = (values) => {

        userService
            .register(values)
            .then(this.onRegisterSuccess)
            .catch(this.onRegisterError);

        console.log("values:", values)

        // setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));   //<---converts the result object into a string and is set to fire at a specific time
        // }, 400);
    }

    onRegisterSuccess = (response) => {
        console.log("registration successful")
    }

    onRegisterError = (errResponse) => {
        console.error("registration error")
    }




    render() {
        _logger("rendering")
        return (
            <Formik
                initialValues={this.state.formData}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    passwordConfirm: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                })}
                onSubmit={this.handleRegistration}
                enableReinitialize={true}
            >
                <div className="col-md-3">
                    <Form>
                        <h1>Register</h1>
                        <div className="form-group">
                            <label htmlFor="InputFirstName">
                                First Name
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="firstNameRegister"
                                name="firstName"
                            />
                            <ErrorMessage name="firstName" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="InputLastName" >
                                Last Name
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="lastNameRegister"
                                name="lastName"
                            />
                            <ErrorMessage name="lastName" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="InputEmail" >
                                Email
                            </label>
                            <Field
                                type="email"
                                className="form-control"
                                id="emailRegister"
                                name="email"
                                placeholder="example@example.com"
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

                        <div className="form-group">
                            <label htmlFor="InputPasswordConfirm" >
                                Password Confirm
                            </label>
                            <Field
                                type="password"
                                className="form-control"
                                id="passwordConfirmRegister"
                                name="passwordConfirm"
                            />
                            <ErrorMessage name="passwordConfirm" />
                        </div>

                        <button type="submit" className="btn btn-primary" >Submit Registration</button>
                    </Form>
                </div>
            </Formik>
        )
    }
}

export default Registration;