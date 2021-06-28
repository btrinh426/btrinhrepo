import React from "react";
import { render } from "react-dom";
import TechCompaniesService from "../services/TechCompaniesService";
import { toast } from "react-toastify";

class addTechCompanies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tcData: {
        name: "",
        profile: "",
        summary: "",
        headline: "",
        contactInformation: "",
        slug: "",
        statusId: "Active",
        imageUrl: "",
        urls: [""],
        tags: [""],
        tcId: [0],
      },
    };
  }
  componentDidMount() {
    let tcId = this.props.match.params.tcId;
    console.log("Tech Company Add componentDidMount", { tcId });
    if (tcId) {
      TechCompaniesService.getById(tcId)
        .then(this.onEditByIdSuccess)
        .catch(this.onEditByIdError);
    }
    console.log("Got TechCompany", { tcId });
  }

  componentDidUpdate(prevProps) {
    let tcId = this.props.match.params.tcId;
    console.log("Add TechCompanies componentDidUpdate");
    if (tcId && prevProps.match.params.tcId !== tcId) {
      console.log("making an ajax call for input Id out of cDU;", { tcId });

      debugger;
    }
  }
  onEditByIdSuccess = (response) => {
    console.log({ ...response.data });

    this.setState(() => {
      let newState = { ...this.state.tcData };
      let cardData = { ...response.data.item };
      newState = {
        name: cardData.name,
        profile: cardData.profile,
        summary: cardData.summary,
        headline: cardData.headline,
        contactInformation: cardData.contactInformation,
        slug: cardData.slug,
        statusId: cardData.statusId,
        imageUrl: cardData.imageUrl,
        urls: cardData.urls,
        tags: cardData.tags,
        tcId: "Tech Company",
      };
      console.log({ tcData: newState });
      return { tcData: newState };
    });
  };
  onEditByIdError = (err) => {
    console.error(err);
  };

  //-----Edit & Create Ajax Call w/ click handler-----
  onEditClicked = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const data = this.state.tcData;
    let id = this.props.match.params.tcId;

    if (id) {
      TechCompaniesService.update(data, id)
        .then(this.onEditTcSuccess)
        .catch(this.onEditTcError);
    } else {
      TechCompaniesService.addTc(data)
        .then(this.onAddTcSuccess)
        .catch(this.onAddTcError);
    }
  };

  onEditTcSuccess = (response) => {
    toast.info("Edit Submitted", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    this.props.history.push("/techCompanies/");
    console.log(response);
  };
  onEditTcError = (errResponse) => {
    toast.warning("Edit not submitted", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log(errResponse);
  };

  onAddTcSuccess = (response) => {
    toast.success("Added a tech company", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log("Successfully added a tech company", response);
    this.props.history.push("/techCompanies/");
  };

  onAddTcError = (err) => {
    toast.warning("Add tech company unsuccessful", err, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.error(err);
  };
  //-----Form Field Changed-----
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let tcData = { ...this.state.tcData };

      tcData[inputName] = newValue;

      return { tcData };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h5>Tech Company Profile</h5>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="inputTitle">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={this.state.tcData.name}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputBio">Profile</label>
            <input
              type="text"
              className="form-control"
              id="profile"
              name="profile"
              value={this.state.tcData.profile}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSummary">Summary</label>
            <input
              type="text"
              className="form-control"
              id="summary"
              name="summary"
              value={this.state.tcData.summary}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSlug">Headline</label>
            <input
              type="text"
              className="form-control"
              id="headline"
              name="headline"
              value={this.state.tcData.headline}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputContactInfo">Contact Information</label>
            <input
              type="text"
              className="form-control"
              id="contactInformation"
              name="contactInformation"
              value={this.state.tcData.contactInformation}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSlug">Slug</label>
            <input
              type="text"
              className="form-control"
              id="slug"
              name="slug"
              value={this.state.tcData.slug}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSlug">Status Id</label>
            <input
              type="text"
              className="form-control"
              id="statusId"
              name="statusId"
              value={this.state.tcData.statusId}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPrimaryImage">Images</label>
            <input
              type="url"
              className="form-control"
              id="primaryImage"
              name="primaryImage"
              value={this.state.tcData.images}
              onChange={this.onFormFieldChanged}
            />
            <div className="form-group">
              <label htmlFor="inputUrls">Urls</label>
              <input
                id="urls"
                name="urls"
                type="text"
                value={this.state.tcData.urls}
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPrimaryImage">Tags</label>
            <input
              type="text"
              className="form-control"
              id="tags"
              name="tags"
              value={this.state.tcData.tags}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPrimaryImage">tcId's</label>
            <input
              type="text"
              className="form-control"
              id="tcId"
              name="tcId"
              value={this.state.tcData.tcId}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <button
            type="submit"
            className="btn btn-secondary btn-lg btn-block"
            onClick={this.onEditClicked}
          >
            Update
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default addTechCompanies;
