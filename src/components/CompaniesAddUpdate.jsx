import React from "react";
import * as companiesService from "../services/companiesService";

class CompaniesAddUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        name: "",
        profile: "",
        summary: "",
        headline: "",
        contactInformation: "",
        slug: "", // must be unique for each added company
        statusId: "", // 1 for active
        images: "", // array of objs  [{"imageTypeId": 1, "imageUrl": ""}]
        urls: "", // slice?
        tags: "",
        friendIds: "number", //  [0]   number
      },
    };
  }

  // convert from obj to JSON string  //  input  {x:5, y: 6}
  // JSON.stringify({})   // "{"x":5, "y": 6}"

  // convert to obj from JSON string
  // JSON.parse("{}")    // {}

  //-------convert an object containing objects to an array of objects
  // let data = {
  //   a: { "0": "1" },
  //   b: { "1": "2" },
  //   c: { "2": "3" },
  //   d: { "3": "4" }
  // };

  // const mappedDataArray = [];

  // for (const key in data) {
  //   const mappedData = {
  //     ...data[key]
  //   };
  //   mappedDataArray.push(mappedData);
  // }
  //   console.log(mappedDataArray);
  // console.log(data);

  onFormFieldChanged = (e) => {
    //console.log(e.currentTarget.name, e.currentTarget.value);
    let inputName = e.currentTarget.name;
    let newValue = e.currentTarget.value;
    this.setState((prevState) => {
      let formData = { ...prevState.formData };
      formData[inputName] = newValue;
      return { formData };
    });
  };

  onAddUpdateClick = (e) => {
    // prepare data for transport "123, thisUrl".split(",") = ["123", " thisUrl"]
    e.preventDefault(); //
    let compData = { ...this.state.formData };
    if (compData) {
      if (compData.statusId === "" || null) {
        return;
      } else {
        // prepare data for transport here
        companiesService
          .add(compData)
          .then(this.onAddCompanySuccess)
          .catch(this.onAddCompanyError);
      }
    }
  };

  onAddCompanySuccess = (res) => {
    console.log("onAddCompanySuccess ", res);
  };

  onAddCompanyError = (res) => {
    console.warn("onAddCompanySuccess Error ", res);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container main flex-column bkground">
          <div className="container parent-container d-flex">
            <div className="container left">
              <div className="row">
                <div className="col">
                  <form>
                    <div className="title" text="html">
                      <h3>Add/ Update TechCompany </h3>
                      <h6>--Second Click of Submit Updates Record--</h6>
                    </div>

                    <label htmlFor="inputName" className="name">
                      Name
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="name"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.name}
                    />

                    <label htmlFor="inputProfile" className="profile">
                      Profile
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="profile"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.profile}
                    />

                    <label htmlFor="inputSummary" className="summary">
                      Summary
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="summary"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.summary}
                    />

                    <label htmlFor="inputHeadline" className="headline">
                      Headline
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="headline"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.headline}
                    />

                    <label
                      htmlFor="inputContactInformation"
                      className="contactInformation"
                    >
                      Contact Information
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="contactInformation"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.contactInformation}
                    />

                    <label htmlFor="inputSlug" className="slug">
                      Slug - Please enter a unique Slug for each Company
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="slug"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.slug}
                    />

                    <label htmlFor="inputStatusId" className="statusId">
                      StatusId - Please enter 1 for active
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="statusId"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.statusId}
                    />

                    <label htmlFor="inputImages" className="images">
                      Input imageTypeId, imageUrl
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="images"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.images}
                    />

                    <label htmlFor="inputUrls" className="urls">
                      urls
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="urls"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.urls}
                    />

                    <label htmlFor="inputTags" className="tags">
                      Tags
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="tags"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.tags} // form capture string  we control these key names
                    />

                    <label htmlFor="inputFriendIds" className="friendIds">
                      Friend Id's
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="friendIds"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.friendIds}
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="container middle">
              <div className="row">
                <div className="col-md-12">
                  <button
                    type="submit"
                    className="btn btn-success ml-3 mb-5"
                    onClick={this.onAddUpdateClick}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CompaniesAddUpdate;
