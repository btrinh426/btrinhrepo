import React from "react";
import Swal from "sweetalert2";

import {
  getTechCompany,
  updateCompany,
  addCompany,
} from "../services/techCompanyServices";

class TechCompanyForm extends React.Component {
  state = {
    id: 0,
    imageTypeId: 0,
    name: "",
    profile: "",
    summary: "",
    headline: "",
    contact: "",
    slug: "",
    statusId: "",
    image: "",

    isAdd: true,
  };

  componentDidMount = () => {
    if (this.props.location.search && this.props.location.search.length) {
      let fields = this.props.location.search.split("=");
      let id = +fields[1];

      getTechCompany(id)
        .then(this.getTechCompanySuccess)
        .catch(this.getTechCompanyError);
    }
  };

  getTechCompanySuccess = (response) => {
    let data = "generic@google.com";
    if (response.data.item.contactInformation) {
      data = response.data.item.contactInformation.data;
    }
    let image =
      "https://image.shutterstock.com/image-vector/connect-logo-concept-600w-1276794454.jpg";
    let imageTypeId = 1;
    if (response.data.item.images) {
      image = response.data.item.images[0].imageUrl;
      imageTypeId = response.data.item.images[0].imageTypeId;
    }
    this.setState(() => {
      return {
        id: response.data.item.id,
        name: response.data.item.name,
        profile: response.data.item.profile,
        summary: response.data.item.summary,
        headline: response.data.item.headline,
        contact: data,
        slug: response.data.item.slug,
        statusId: response.data.item.statusId,
        image: image,
        imageTypeId: imageTypeId,
        isAdd: false,
      };
    });
  };

  getTechCompanyError = (response) => {
    console.log("error");
    Swal.fire("Error getting tech company");
  };

  //////////////////////////////// FIELD CONTROL
  onFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let inputValue = currentTarget.value;

    this.setState(() => {
      let newState = {};
      newState[inputName] = inputValue;
      return newState;
    });
  };

  ///////////////////////////////////// CLICK HANDLERS
  onSubmit = (e) => {
    e.preventDefault();

    let payload = {
      id: this.state.id,
      name: this.state.name,
      profile: this.state.profile,
      summary: this.state.summary,
      headline: this.state.headline,
      contactInformation: this.state.contact,
      slug: this.state.slug,
      statusId: this.state.statusId,
      images: [
        {
          imageUrl: this.state.image,
        },
      ],
      urls: [],
      tags: [],
      friendIds: [0],
    };

    if (this.state.isAdd) {
      payload.images[0].imageTypeId = 1;
      addCompany(payload)
        .then(this.onAddCompanySuccess)
        .catch(this.onAddCompanyError);
    } else {
      payload.images[0].imageTypeId = this.state.imageTypeId;
      updateCompany(payload)
        .then(this.updateCompanySuccess)
        .catch(this.updateCompanyError);
    }
  };

  addCompanySuccess = (response) => {
    Swal.fire("add success");
  };

  addCompanyError = (response) => {
    Swal.fire("add error");
  };
  updateCompanySuccess = (response) => {
    Swal.fire("update success");
  };

  updateCompanyError = (response) => {
    Swal.fire("update error");
  };

  ///////////////////////////////////// RENDER
  getHeader = () => {
    if (this.state.isAdd) {
      return "Add Company";
    } else {
      return "Edit Company";
    }
  };

  render = () => {
    return (
      <form id="companyForm">
        <div className="form-floating">
          <h1 className="h3 mb-3 fw-normal">{this.getHeader()}</h1>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Company</label>
            <input
              id="name"
              className="edit-control"
              type="text"
              name="name"
              onChange={this.onFieldChange}
              value={this.state.name}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Profile</label>
            <input
              id="profile"
              className="edit-control"
              type="text"
              name="profile"
              onChange={this.onFieldChange}
              value={this.state.profile}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Summary</label>
            <input
              id="summary"
              className="edit-control"
              type="text"
              name="summary"
              onChange={this.onFieldChange}
              value={this.state.summary}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Headline</label>
            <input
              id="headline"
              className="edit-control"
              type="text"
              name="headline"
              onChange={this.onFieldChange}
              value={this.state.headline}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Contact</label>
            <input
              id="contact"
              className="edit-control"
              type="email"
              name="contact"
              onChange={this.onFieldChange}
              value={this.state.contact}
            />
          </div>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Slug</label>
            <input
              id="slug"
              className="edit-control"
              type="text"
              name="slug"
              onChange={this.onFieldChange}
              value={this.state.slug}
            />
          </div>

          <label className="col-sm-2 col-form-label">Status</label>
          <select
            className="form-select"
            id="statusId"
            name="statusId"
            onChange={this.onFieldChange}
            value={this.state.statusId}
          >
            <option value="0" key="Status-0"></option>
            <option value="Active" key="Active">
              Active
            </option>
          </select>

          <div className="form-group-row">
            <label className="col-sm-2 col-form-label">Logo</label>
            <input
              id="image"
              className="edit-control"
              type="text"
              name="image"
              onChange={this.onFieldChange}
              value={this.state.image}
            />
          </div>
        </div>
        <footer>
          <button
            type="button"
            className="btn btn-primary"
            id="Submit"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </footer>
      </form>
    );
  };
}

export default TechCompanyForm;
