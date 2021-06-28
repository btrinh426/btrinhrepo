import React from "react";
import { NavLink } from "react-router-dom";

class Register extends React.Component {
  state = {
    formData: {},
  };

  Register = () => {
    return (
      <div className="card-container">
        <div className="card" style="width: 36rem;">
          <div className="card-body">
            <div className="card-title">Register a new membership</div>
            <form id="registrationForm">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                />
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                />
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                />
              </div>

              <div className="form-floating  mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>

              <div className="form-floating  mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  placeholder="Retype password"
                />
              </div>

              <div className="form-floating  mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="avatarUrl"
                  placeholder="Avatar Url"
                />
              </div>

              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="termsCheck"
                      />
                      <label>I agree to the terms</label>
                      <br>
                        <NavLink to="/login" exact>
                          <li className="nav-item nav-link active">
                            Already have an account?
                          </li>
                        </NavLink>
                      </br>
                    </div>

                    <div className="col">
                      <a
                        className="btn btn-primary"
                        id="registerSubmit"
                        style="float:right"
                      >
                        Register
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

export default Register;
