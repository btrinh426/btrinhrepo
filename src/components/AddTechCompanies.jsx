import React from "react";
import { render } from "react-dom";

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
        statusId: "NotSet",
        imageUrl: "",
        urls: [""],
        tags: [""],
        friendIds: [0],
      },
    };
  }
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
              id="title"
              name="title"
              value={this.state.tcData.name}
              onChange={this.onFormFieldChanged}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputBio">Profile</label>
            <input
              type="text"
              className="form-control"
              id="bio"
              name="bio"
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
            <div className="form-group row">
              <input
                id="friendId"
                type="url"
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
            <label htmlFor="inputPrimaryImage">FriendId's</label>
            <input
              type="text"
              className="form-control"
              id="friendIds"
              name="friendIds"
              value={this.state.tcData.friendIds}
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
