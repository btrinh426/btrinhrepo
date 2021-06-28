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
    previewUrl: "",
    isFileCreated: false,
    form: [],
    dragging: false,
    fileNames: [],
    files: [],
  };

  componentDidMount = () => {
    this.dragCounter = 0;
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
      let previewUrl = URL.createObjectURL(file);
      if (previewUrl) {
        return { isFileCreated: true, previewUrl, form };
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

  handleDrop = (files) => {
    let fileNames = [...this.state.fileNames];
    let filesArray = [...this.state.files];
    console.log(files);
    let form = new FormData();
    for (let i = 0; i < files.length; i++) {
      fileNames.push(files[i].name);
      filesArray.push(files[i]);
      form.append("file", files[i]);
    }

    this.setState(() => {
      return { fileNames, files: filesArray, form };
    });
  };

  getForm = () => {};
  onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState(() => {
        return { dragging: false };
      });
    }
  };

  onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.dataTransfer.items.length);
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState(() => {
        return { dragging: true };
      });
    }
  };

  onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
  };

  onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.dataTransfer);
    this.setState(() => {
      return { dragging: false };
    });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.handleDrop(e.dataTransfer.files);
      this.dragCounter = 0;
    }
  };

  onHover = (e) => {
    e.currentTarget.style.cursor = "pointer";
  };

  onDeleteFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let fileName = e.currentTarget.innerText;
    if (fileName) {
      this.setState((prevState) => {
        let newFileNames = [...prevState.fileNames];
        let newFiles = [...prevState.files];
        let fileNameIndex = prevState.fileNames.findIndex((file) => {
          return file === fileName;
        });
        let fileIndex = prevState.files.findIndex((file) => {
          return file.name === fileName;
        });
        if (fileNameIndex >= 0) {
          newFileNames.splice(fileNameIndex, 1);
        }
        if (fileIndex >= 0) {
          newFiles.splice(fileIndex, 1);
        }
        return { fileNames: newFileNames, files: newFiles };
      });
    }
  };

  render() {
    let registgerUserStyle = {
      margin: "0 auto",
      fontSize: "x-large",
    };

    let previewStyle = {
      border: "1px solid rgba(0,0,0,0.2)",
      borderRadius: "25%",
      height: "15rem",
      width: "15rem",
    };

    const dropBoxStyle = {
      position: "relative",
      border: "1px solid rgba(0,0,0,1)",
      borderRadius: "15px",
      height: "8rem",
      width: "30rem",
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
                {/* <div className="form-group mb-5">
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
                </div> */}
                <div
                  className="form-group mb-5 p-2"
                  onDragEnter={this.onDragEnter}
                  onDragLeave={this.onDragLeave}
                  onDragOver={this.onDragOver}
                  onDrop={this.onDrop}
                  style={dropBoxStyle}
                >
                  {this.state.dragging && (
                    <div
                      style={{
                        border: "dashed grey 4px",
                        backgroundColor: "rgba(255,255,255,.8)",
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "30%",
                          right: 0,
                          left: 0,
                          textAlign: "center",
                          color: "grey",
                          fontSize: "1rem",
                        }}
                      >
                        <div>drop here :)</div>
                      </div>
                    </div>
                  )}
                  {this.state.fileNames.map((file, index) => (
                    <li
                      key={index}
                      onMouseEnter={this.onHover}
                      onClick={this.onDeleteFile}
                    >
                      {file}
                    </li>
                  ))}
                </div>
                {this.state.isFileCreated ? (
                  <div className="form-group mb-5">
                    <p>Do you want to upload this file?</p>
                    <p style={previewStyle}>
                      <img
                        src={this.state.files}
                        alt="Profile_Image"
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "25%",
                        }}
                      />{" "}
                    </p>
                  </div>
                ) : (
                  <div className="form-group mb-5">
                    <p>preview for image will be displayed here</p>
                    <p style={previewStyle}></p>
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
