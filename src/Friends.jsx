import React from "react";

class Friends extends React.Component {
  render() {
    return (
      <React.Fragment>
        <form style={{ marginLeft: "100px", marginBottom: "100px" }}>
          <div>
            <h2 style={{ marginLeft: "400px", marginBottom: "50px" }}>
              User Profile
            </h2>
          </div>
          <div className="row mb-3">
            <label
              name="title"
              type="title"
              className="col-sm-2 col-form-label"
            >
              Title
            </label>
            <div className="col-sm-5">
              <input
                name="titleInput"
                type="titleInput"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label name="bio" type="bio" className="col-sm-2 col-form-label">
              Bio
            </label>
            <div className="col-sm-5">
              <input name="bioInput" type="bioInput" className="form-control" />
            </div>
          </div>
          <div className="row mb-3">
            <label
              name="summary"
              type="summary"
              className="col-sm-2 col-form-label"
            >
              Summary
            </label>
            <div className="col-sm-5">
              <input
                name="summaryInput"
                type="summaryInput"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              name="headline"
              type="headline"
              className="col-sm-2 col-form-label"
            >
              Headline
            </label>
            <div className="col-sm-5">
              <input
                name="headlineInput"
                type="headlineInput"
                className="form-control"
              />
            </div>
          </div>

          <div className="mb-3">
            <label for="formFile" className="form-label">
              Upload your Profile Picture Here
            </label>
            <div className="col-sm-5">
              <input className="form-control" type="file" />
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Friends;
