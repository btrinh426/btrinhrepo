import React from "react";
import { Link } from "react-router-dom";

class Jobs extends React.Component {
  state = {
    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: "",
    statusId: "",
    techCompanyId: "",
    skills: [""],
  };

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <div className="container">
            <div style={{ marginTop: "3rem" }}>
              <h1>Jobs</h1>
              <h3>Create a Job:</h3>
            </div>
          </div>
        </div>

        <div style={{ marginLeft: "8rem", padding: "8rem" }}>
          <div className="container">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="inputEmail4">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label for="inputPassword4">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="form-group">
                <label for="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                />
              </div>
              <div className="form-group">
                <label for="inputAddress2">Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="inputCity">City</label>
                  <input type="text" className="form-control" id="inputCity" />
                </div>
                <div className="form-group col-md-4">
                  <label for="inputState">State</label>
                  <select id="inputState" className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label for="inputZip">Zip</label>
                  <input type="text" className="form-control" id="inputZip" />
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" for="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </form>
            <div style={{ marginTop: "3rem" }}>
              <Link to="/Home">
                <button className="btn btn-secondary">Home &raquo;</button>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Jobs;
