import React from "react";
import userService from "./services/userService";
import { ToastContainer, toast } from "react-toastify";

class Form extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "",
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log({ newValue, currentTarget });

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      return newState;
    });
    // console.log(e.target);
    // const name = e.target.name;
    // const value = e.target.value;
    // this.setState({ [name]: value });
  };

  onClickHandler = (e) => {
    e.preventDefault();

    // const firstName = this.state.firstName;
    // const lastName = this.state.lastName;
    // const data = {...this.state}
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      avatarUrl: this.state.avatarUrl,
      tenantId: this.state.tenantId,
    };
    console.log(data);

    //     //... code omitted.
    userService
      .register(data)
      .then(this.onActionSuccess)
      .catch(this.onActionError);
  };
  onActionSuccess = (response) => {
    // <Route path="/LoginPage" exact component={LoginPage}></Route>;
    // // console.log(response);
    // this.setState(() => {
    //   let newState = {
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     password: "",
    //     passwordConfirm: "",
    //     avatarUrl: "",
    //     tenantId: "",
    //   };

    //   return newState;
    // });
    this.props.history.push("/loginPage");
    toast.success("Registeration Successful, Please login to continue");
  };
  onActionError = (errResponse) => {
    console.log(errResponse);
    toast.error(
      "Register fail, Please Check your input requirement or user already exists"
    );
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-group row">
            <label
              htmlFor="exampleInputEmail1"
              className="col-sm-2 col-form-label"
            >
              First Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                onChange={this.onFormFieldChanged}
                value={this.state.firstName}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="exampleInputPassword1"
              className="col-sm-2 col-form-label"
            >
              Last Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="lastName"
                id="lastName"
                onChange={this.onFormFieldChanged}
                value={this.state.lastName}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="exampleInputPassword1"
              className="col-sm-2 col-form-label"
            >
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={this.onFormFieldChanged}
                value={this.state.email}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="exampleInputPassword1"
              className="col-sm-2 col-form-label"
            >
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={this.onFormFieldChanged}
                value={this.state.password}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="exampleInputPassword1"
              className="col-sm-2 col-form-label"
            >
              Comfirm Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="passwordConfirm"
                name="passwordConfirm"
                onChange={this.onFormFieldChanged}
                value={this.state.passwordConfirm}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="exampleInputPassword1"
              className="col-sm-2 col-form-label"
            >
              Image Url
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                id="avatarUrl"
                name="avatarUrl"
                onChange={this.onFormFieldChanged}
                value={this.state.avatarUrl}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="exampleInputPassword1"
              className="col-sm-2 col-form-label"
            >
              Tenent Id
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                id="tenantId"
                name="tenantId"
                onChange={this.onFormFieldChanged}
                value={this.state.tenantId}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={this.onClickHandler}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
export default Form;
