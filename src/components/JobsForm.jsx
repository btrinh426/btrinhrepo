import React from "react";

class JobsForm extends React.Component {
  render() {
    return (
      <>
        <div className="row">
          <div className="col-4">
            <h2 className="ml-5">
              Add/Edit Jobs{" "}
              <span role="img" aria-label="job">
                💼
              </span>
            </h2>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="row mb-3">
                    <label htmlFor="role" className="col-sm-2 col-form-label">
                      Role
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        name="role"
                        id="role"
                        placeholder="role"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default JobsForm;
