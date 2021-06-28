import React from "react";
import * as userService from "../services/userService";
import * as filesService from "../services/filesService";
import Swal from "sweetalert2";
class Register extends React.Component {
  state = {
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      tenantId: "SabioNation",
      avatarUrl: "",
    },
    files: "",
    isFileSelected: false,
    form: {},
  };

  onFormInput = (e) => {
    let newValue = e.currentTarget.value;
    let inputName = e.currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    });
  };

  onUploadImage = (e) => {
    let fileList = e.currentTarget.files;
    let inputName = e.currentTarget.name;
    let file = [...fileList][0];
    console.log(file);
    let form = new FormData();
    form.append(inputName, file);
    this.setState(() => {
      let files = URL.createObjectURL(file);
      if (files) {
        return { isFileSelected: true, files, form };
      }
    });
  };

  onSubmitClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let file = this.state.form;
    filesService
      .upload(file)
      .then(this.onUploadSuccess)
      .catch(this.onUploadError);
  };

  onUploadSuccess = (res) => {
    let newUrl = res.data.items[0];
    console.log(newUrl);
    this.setState((prevState) => {
      let newFormData = { ...prevState.formData };
      newFormData.avatarUrl = newUrl;
      return { formData: newFormData };
    });
    let data = this.state.formData;
    if (data.avatarUrl) {
      userService.add(data).then(this.onAddSuccess).catch(this.onAddError);
    }
  };

  onUploadError = (res) => {
    console.error(res);
  };

  onAddSuccess = (res) => {
    console.log(res);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "User successfully added!",
      showConfirmButton: false,
      timer: 2500,
    });
    this.props.history.push("/login");
  };

  onAddError = (res) => {
    console.error(res);
  };
  render() {
    let registgerUserStyle = {
      margin: "0 auto",
      fontSize: "x-large",
    };

    let previewStyle = {
      height: "100%",
      width: "100%",
      border: "1px solid black",
    };
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="container-fluid">
            <div className="row bg-white p-3">
              <p className="font-weight-bolder" style={registgerUserStyle}>
                Register User
              </p>
            </div>
          </div>
          <div className="bg-light container-fluid">
            <div className="w-75 container">
              <form>
                <div className="form-group mb-5 pt-5">
                  <label htmlFor="inputFirstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    id="inputFirstName"
                    placeholder="Enter your firstname"
                    value={this.state.formData.firstName}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-5">
                  <label htmlFor="inputLastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    id="inputLastName"
                    placeholder="Enter your lastname"
                    value={this.state.formData.lastName}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-5">
                  <label htmlFor="inputEmail">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="inputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={this.state.formData.email}
                    onChange={this.onFormInput}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group mb-5">
                  <label htmlFor="inputPassword">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="more than 8 characters"
                    value={this.state.formData.password}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-5">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="re-enter password"
                    value={this.state.formData.passwordConfirm}
                    onChange={this.onFormInput}
                  />
                </div>
                <div className="form-group mb-5">
                  <label htmlFor="avatar">Avatar</label>
                  <input
                    type="file"
                    name="file"
                    className="form-control"
                    id="avatar"
                    multiple
                    accept=".png, .jpg, .jpeg"
                    placeholder="upload your picture here"
                    file={this.state.files}
                    onChange={this.onUploadImage}
                  />
                </div>
                {this.state.isFileSelected ? (
                  <div
                    className="form-group mb-5"
                    style={{ height: "10rem", width: "15rem" }}
                  >
                    <p>Do you want to upload this file?</p>
                    <img
                      src={this.state.files}
                      alt="Profile_Image"
                      style={previewStyle}
                    />{" "}
                  </div>
                ) : (
                  <div className="form-group mb-5">
                    <p
                      style={{
                        border: "1px solid rgba(0,0,0,0.2)",
                        width: "20rem",
                      }}
                    >
                      preview for image will be displayed here
                    </p>
                  </div>
                )}
                <button
                  className="btn btn-primary mb-5"
                  onClick={this.onSubmitClick}
                >
                  Submit Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
