import React from "react";
import companyService from "./services/companyService";
class Companies extends React.Component {
  state = {
    formData: {
      name: "",
      profile: "",
      summary: "",
      headline: "",
      contactInformation: "",
      slug: "",
      statusId: "",
      images: "",
      urls: "",
      tags: "",
      friendIds: "",
    },
  };
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let formData = { ...prevState.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  onClickHandler = (e) => {
    let data = { ...this.state.formData };
    data.urls = data.urls.split(",");
    data.tags = data.tags.split(",");
    data.friendIds = data.friendIds.split(",");

    data.images = data.images[0].imageTypeId.split(",").join(",");

    console.log(data);
    // companyService
    //   .addCompany(data)
    //   .then(this.onAddCompanySuccess)
    //   .catch(this.onAddCompanyError);

    e.preventDefault();
    // const jobIdFromEdit = this.props.match.params.id;
    // const data = { ...this.state.formData };
    // data.skills = data.skills.split(",");
    // if (data.id || jobIdFromEdit) {
    //   jobService
    //     .updateOneJobById(data, data.id)
    //     .then(this.OnUpdateOneJobByIdSuccess)
    //     .catch(this.OnUpdateOneJobByIdError);
    // } else {
    //   jobService
    //     .addJob(data)
    //     .then(this.onAddJobSuccess)
    //     .catch(this.onAddJobError);
    // }
  };
  render() {
    return (
      <form>
        <div className="form-group row">
          <label
            htmlFor="exampleInputEmail1"
            className="col-sm-2 col-form-label"
          >
            Company Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.name}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Profile
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="profile"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.profile}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Summary
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="summary"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.summary}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Headline
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="headline"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.headline}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Contact Information
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="contactInformation"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.contactInformation}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Slug
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="slug"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.slug}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Image
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              name="images"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.images}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Urls
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              name="urls"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.urls}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputEmail1"
            className="col-sm-2 col-form-label"
          >
            Tags
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="tags"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.tags}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputEmail1"
            className="col-sm-2 col-form-label"
          >
            Friend Ids
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="friendIds"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.friendIds}
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
    );
  }
}

export default Companies;
