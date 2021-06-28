import React from "react";
import * as friendService from "../services/friendServices";

class PersonForm extends React.Component {
  state = { UpdateData: {}, friend: this.props.location.state };

  onRegisterFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let UpdateData = { ...prevState.UpdateData };

      UpdateData[inputName] = newValue;

      return { UpdateData };
    });
  };

  onSubmitData = () => {
    let payload =
      this.props.match.path === "/people/new"
        ? { ...this.state.UpdateData }
        : { ...this.state.UpdateData, id: this.props.match.params.id };
    payload.statusId = Number(payload.statusId);

    this.props.match.path === "/people/new"
      ? friendService
          .addOne(payload)
          .then(this.onAddOneSuccess)
          .catch(this.onAddOneError)
      : friendService
          .upDate(payload)
          .then(this.onUpDateSuccess)
          .catch(this.onUpDateError);
  };

  onAddOneSuccess = (response) => {
    this.props.history.push("/people");
  };
  onAddOneError = (err) => {
    console.warn({ error: err });
  };
  onUpDateSuccess = (response) => {
    this.props.history.push("/people");
  };
  onUpDateError = (err) => {
    console.warn({ error: err });
  };

  render() {
    return (
      <div className="container edit-form">
        <div className="row" id="top-row">
          <div className="col-md-7">
            <form>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    placeholder={this.state.friend && this.state.friend.title}
                    name="title"
                    className="form-control"
                    id="colFormLabel"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Bio</label>
                <div className="col-sm-10">
                  <textarea
                    placeholder={this.state.friend && this.state.friend.bio}
                    className="form-control"
                    id="colFormLabel"
                    name="bio"
                    rows="3"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Summary</label>
                <div className="col-sm-10">
                  <input
                    placeholder={this.state.friend && this.state.friend.summary}
                    type="text"
                    className="form-control"
                    id="colFormLabel"
                    name="summary"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Headline</label>
                <div className="col-sm-10">
                  <input
                    placeholder={
                      this.state.friend && this.state.friend.headline
                    }
                    type="text"
                    className="form-control"
                    id="colFormLabel"
                    name="headline"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Slug</label>
                <div className="col-sm-10">
                  <input
                    placeholder={this.state.friend && this.state.friend.slug}
                    type="text"
                    className="form-control"
                    id="colFormLabel"
                    name="slug"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Status</label>
                <div className="col-sm-10">
                  <input
                    placeholder={
                      this.state.friend && this.state.friend.statusId
                    }
                    type="text"
                    className="form-control"
                    id="colFormLabel"
                    name="statusId"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Skills</label>
                <div className="col-sm-10">
                  <input
                    placeholder={this.state.friend && this.state.friend.skills}
                    type="text"
                    className="form-control"
                    id="colFormLabel"
                    name="skills"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Primary Image</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="colFormLabel"
                    name="primaryImage"
                    onChange={this.onRegisterFieldChanged}
                  />
                </div>
              </div>
              <div className="form-group row">
                <input
                  type="button"
                  className="btn btn-primary"
                  value="Submit"
                  id="edit-submit"
                  onClick={this.onSubmitData}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonForm;
