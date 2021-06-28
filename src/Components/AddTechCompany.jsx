import React from "react";
import * as techService from "../services/techService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class AddCompany extends React.Component {
  state = {
    companyData: {
      name: "",
      profile: "",
      summary: "",
      headline: "",
      contactInformation: "",
      slug: "",
      statusId: "1",
      imageUrl: "",
      urls: ["string"],
      tags: ["string"],
      friendIds: [0],
    },
  };

  onCompanyFormChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name; //firstName or lastName

    this.setState(() => {
      let companyData = { ...this.state.companyData };
      companyData[inputName] = newValue;

      return { companyData };
    });
  };

  onAddCompanyHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    techService
      .addCompany(this.state.companyData)
      .then(this.onAddCompanySuccess)
      .catch(this.onAddCompanyError);

    console.log(this.state);
  };

  onAddCompanySuccess = (response) => {
    this.props.history.push("/Tech Companies/");
    toast.success("You have registered a new company.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onAddCompanyError = (errResponse) => {
    toast.error("You could not register a new company.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={this.onCompanyFormChanged}
                    value={this.state.companyData.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="profile" className="form-label">
                    Profile
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="profile"
                    onChange={this.onCompanyFormChanged}
                    value={this.state.companyData.profile}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="summary" className="form-label">
                    Summary
                  </label>
                  <textarea
                    rows="3"
                    type="summary"
                    className="form-control"
                    name="summary"
                    onChange={this.onCompanyFormChanged}
                    value={this.state.companyData.summary}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="headline" className="form-label">
                    Headline
                  </label>
                  <input
                    type="headline"
                    className="form-control"
                    name="headline"
                    onChange={this.onCompanyFormChanged}
                    value={this.state.companyData.headline}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactInformation" className="form-label">
                    Contact Information
                  </label>
                  <input
                    type="contactInformation"
                    className="form-control"
                    name="contactInformation"
                    onChange={this.onCompanyFormChanged}
                    value={this.state.companyData.contactInformation}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="slug" className="form-label">
                    Slug
                  </label>
                  <input
                    type="slug"
                    className="form-control"
                    name="slug"
                    onChange={this.onCompanyFormChanged}
                    value={this.state.companyData.slug}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    Avatar
                  </label>
                  <input
                    className="form-control"
                    name="imageUrl"
                    onChange={this.onCompanyFormChanged}
                    value={this.state.companyData.imageUrl}
                  />
                </div>

                <div id="nameHelp" className="form-text">
                  We'll never share your friend's information with anyone else.
                </div>
                <p></p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onAddCompanyHandler}
                >
                  Submit
                </button>
                <p></p>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={this.onUpdateClicked}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default AddCompany;
