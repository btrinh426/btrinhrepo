import React from "react";
import Services from "../../services/Sabio API Ajax/userServices"
import Toast from "../../scripts/toast"

class Register extends React.Component {

  state = {
    payload: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatarUrl: "",
      tenantId: "00001",
    },
    checked: false,
    errors: [],
  };


  onInputChange = (e) => {
    const type = e.currentTarget.type;
    const name = e.currentTarget.name;
    const value = type === "checkbox" ? e.currentTarget.checked : e.currentTarget.value;

    if(type === "text" || type === "email" || type === "password"){
      this.setState(prevState => {prevState.payload[name] = value; return prevState;});
    }

    if(type === "checkbox"){
      this.setState(prevState => {prevState[name] = value; return prevState;});
    }
  };


  submit = () => {
    if(!this.state.checked){
      this.setError(["Please Agree To The Terms Of Service"]);
      return;
    }
    Services.register(this.state.payload)
      .then(this.onThen)
      .catch(this.onCatch);
  }


  onThen = () => {
    Toast.renderToast("success", "Registration Successful");
    this.setError([]);
    this.props.app.props.history.push("/login/");
  }


  onCatch = (response) => {
    this.setError(response.response.data.errors);
    Toast.renderToast("error", "Registration Failure");
  }


  setError = (errors) => {
    this.setState(prevState => {prevState.errors = errors; return prevState;});
  }


  render() {
    return (
      <React.Fragment>
        <form className="register-form">
          <p className="register-form-label">Register a new membership</p>

          <div className="form-input">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="firstName"
              onChange={this.onInputChange}
              value={this.state.payload.firstName}
            />
          </div>

          <div className="form-input">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lastName"
              onChange={this.onInputChange}
              value={this.state.payload.lastName}
            />
          </div>

          <div className="form-input">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              onChange={this.onInputChange}
              value={this.state.payload.email}
            />
          </div>

          <div className="form-input">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={this.onInputChange}
              value={this.state.payload.password}
            />
          </div>

          <div className="form-input">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="passwordConfirm"
              onChange={this.onInputChange}
              value={this.state.payload.passwordConfirm}
            />
          </div>

          <div className="form-input">
            <input
              type="text"
              className="form-control"
              placeholder="Avatar URL"
              name="avatarUrl"
              onChange={this.onInputChange}
              value={this.state.payload.avatarUrl}
            />
          </div>

          <div>
            <label htmlFor="box">I agree to the terms</label>
            <input 
            type="checkbox" 
            name="checked"
            id="box"
            onChange={this.onInputChange}
            value={this.state.checked}
            />
          </div>

          <div>
            <p className="color-blue login-page-link">Already have an account?</p>
          </div>

          <button 
          type="button" 
          className="btn btn-primary" 
          onClick={this.submit}
          >
              Register
          </button>

          {this.state.errors.map((error, i) => {return <p key={"uniqueId"+i}>{error}</p>})}

        </form>
      </React.Fragment>
    );
  }
}

export default Register;
