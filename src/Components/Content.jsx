import React from "react";
import * as registerUserService from "../services/registerUserService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Content extends React.Component {
    state = {
        formData: {
            firstName: ""
            , lastName: ""
            , email: ""
            , password: ""
            , passwordConfirm: ""
            , avatarUrl: ""
            , tenantId: ""
        },
        isModalOpen: false,
        hasMadeAjax: true,
        arrayOfComp: [],

    }

    onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name; //firstName or lastName

        this.setState(() => {
            let formData = { ...this.state.formData };

            formData[inputName] = newValue;
            console.log({ formData });
            return { formData };
        });
    };

    onSubmitClicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        // console.log(e); // button works
        const payload = { ...this.state.formData }
        console.log(payload);

        registerUserService.register(payload)
            .then(this.onSubmitSuccess)
            .catch(this.onSubmitError);
    }
    onSubmitSuccess = (response) => {
        toast.success('Registration Successful', {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    onSubmitError = (error) => {
        toast.error('Registration Failed', {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    // onItemClicked = (e) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     const data = { email: "user@google.com", password: "Reactpassword123!", tenantId: "bootcamp2" };
    //     const payload = data;

    //     //... code omitted.

    //     userService.logIn(payload)
    //         .then(this.onActionSuccess)
    //         .catch(this.onActionError);
    // }
    // onActionSuccess = (response) => {
    //     console.log("I was clicked on", response, new Date());
    //     // do something
    // }

    // onActionError = (errResponse) => {
    //     console.log("There was an error on", errResponse, new Date());
    //     // do something
    // }

    render() {
        return (
            <div className="container">
                <h1 className="display-3">Register User</h1>
                <ToastContainer />
                <div className="row">
                    <div className="col-md-12">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="exampleFirstName1" className="col-sm-2 col-form-label">First Name</label>
                                <div className="col-sm-4">
                                    <input type="text"
                                        className="form-control"
                                        id="exampleFirstName1"
                                        name="firstName"
                                        aria-describedby="fnameHelp"
                                        placeholder="Enter First Name"
                                        onChange={this.onFormFieldChanged}
                                        value={this.state.formData.firstName}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="exampleLastName1" className="col-sm-2 col-form-label">Last Name</label>
                                <div className="col-sm-4">
                                    <input type="text"
                                        className="form-control"
                                        id="exampleLastName1"
                                        name="lastName"
                                        aria-describedby="lnameHelp"
                                        placeholder="Enter Last Name"
                                        onChange={this.onFormFieldChanged}
                                        value={this.state.formData.lastName}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="exampleInputEmail1" className="col-sm-2 col-form-label">Email address</label>
                                <div className="col-sm-4">
                                    <input type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        name="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Your Email"
                                        onChange={this.onFormFieldChanged}
                                        value={this.state.formData.email}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="exampleInputPassword1" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-4">
                                    <input type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="password"
                                        aria-describedby="passwordHelp"
                                        placeholder="Enter Your Password"
                                        onChange={this.onFormFieldChanged}
                                        value={this.state.formData.password}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="exampleInputPasswordConfirm1" className="col-sm-2 col-form-label">Confirm Password</label>
                                <div className="col-sm-4">
                                    <input type="password"
                                        className="form-control"
                                        id="exampleInputPasswordConfirm1"
                                        name="passwordConfirm"
                                        aria-describedby="confirmPasswordHelp"
                                        placeholder="Confirm Your Password"
                                        onChange={this.onFormFieldChanged}
                                        value={this.state.formData.passwordConfirm}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="exampleavatarUrl1" className="col-sm-2 col-form-label">Avatar</label>
                                <div className="col-sm-4">
                                    <input type="url"
                                        className="form-control"
                                        id="exampleavatarUrl1"
                                        name="avatarUrl"
                                        aria-describedby="avatarUrlHelp"
                                        placeholder="Provide Avatar Url"
                                        onChange={this.onFormFieldChanged}
                                        value={this.state.formData.avatarUrl}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="exampletenantId1" className="col-sm-2 col-form-label">Unique Id</label>
                                <div className="col-sm-4">
                                    <input type="text"
                                        className="form-control"
                                        id="exampletenantId1"
                                        name="tenantId"
                                        aria-describedby="tenantIdHelp"
                                        placeholder="Provide a Tenant Id"
                                        onChange={this.onFormFieldChanged}
                                        value={this.state.formData.tenantId}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.onSubmitClicked}
                            >
                                Submit Form
                            </button>


                            <p>&copy; Sabio 2019-2020</p>
                        </form>

                        {/*<h2>Heading</h2>
                        <p>
                            Donec id elit non mi porta gravida at eget metus. Fusce
                            dapibus, tellus ac cursus commodo, tortor mauris condimentum
                            nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                            malesuada magna mollis euismod. Donec sed odio dui.
                </p>
                        <p>
                            <button className="btn btn-secondary">
                                View details &raquo;
                  </button>
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h2>Heading</h2>
                        <p>
                            Donec id elit non mi porta gravida at eget metus. Fusce
                            dapibus, tellus ac cursus commodo, tortor mauris condimentum
                            nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                            malesuada magna mollis euismod. Donec sed odio dui.
                </p>
                        <p>
                            <button className="btn btn-secondary">
                                View details &raquo;
                  </button>
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h2>Heading</h2>
                        <p>
                            Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
                            egestas eget quam. Vestibulum id ligula porta felis euismod
                            semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                            condimentum nibh, ut fermentum massa justo sit amet risus.
                </p>
                        <p>
                            <button className="btn btn-secondary">
                                View details &raquo;
                  </button>
                        </p>

                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={this.onItemClicked}
                        >
                            Click Me
                        </button>


                    </div>*/}
                    </div>
                </div>

                <hr />
            </div>
        )
    }
}
export default Content;