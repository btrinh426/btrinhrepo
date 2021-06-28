import React, { Component } from "react";
import { toast } from "react-toastify";
import { currentUser } from "../services/userService";
import {
  postTechCompanies,
  updateTechCompanies,
  getTechCompanies,
} from "../services/techCompaniesService";

class AddOrEditTechCompanies extends Component {
  state = {
    techCompany: {
      name: "",
      profile: "",
      summary: "",
      headline: "",
      contactInformation: "",
      slug: "",
      statusId: "",
      images: [],
      urls: [],
      tags: [],
      friendIds: [0],
    },
  };
  componentDidMount() {
    currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
    if (this.props.location.state) {
      let locState = this.props.location.state;
      if (locState.type === "techCompany_Obj") {
        let newTechCompany = locState.payload.oneTechCompany;
        newTechCompany.tags = newTechCompany.tags.map((tags) => {
          return tags.name;
        });
        newTechCompany.tags = newTechCompany.tags.join(", ");
        this.setState(() => {
          return { techCompany: newTechCompany };
        });
      }
    }
  }
  // getTechCompanies()
  //   .then((response) => {
  //     console.log(response);
  //     const techCompanies = response.data.item.pagedItems;
  //     this.setState({
  //       techCompanies,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  onInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = e.currentTarget.value;
    let inputData = currentTarget.name;

    this.setState(() => {
      let techCompany = { ...this.state.techCompany };
      techCompany[inputData] = newValue;
      return { techCompany };
    });
  };

  handleClickAdd = (e) => {
    e.preventDefault();
    console.log("postTechCompany");
    let imageUrls = this.state.techCompany.images.split(" ");
    let images = imageUrls.map((image) => {
      return { imageTypeId: 1, imageUrl: image };
    });

    let payload = {
      ...this.state.techCompany,
      tags: this.state.techCompany.tags.split(" "),
      urls: this.state.techCompany.urls.split(" "),
      images,
    };

    if (this.props.location.state) {
      console.log("update");
      updateTechCompanies(this.state.techCompany)
        .then(this.onUpdateTechCompaniesSuccess)
        .catch(this.onUpdateTechCompaniesError);
    } else {
      console.log("post");
      postTechCompanies(payload)
        .then(this.onPostTechCompaniesSuccess)
        .catch(this.onPostTechCompaniesError);
    }
  };

  onPostTechCompaniesSuccess = (res) => {
    console.log("postSuccess");
    toast.success(`You have successfully added a tech company!`);
    this.props.history.push("/techCompanies");
  };

  onPostTechCompaniesError = (res) => {
    console.log("postError");

    toast.error("Error adding a new tech company");
  };

  onUpdateTechCompaniesSuccess = (res) => {
    console.log("update response");
    toast.success(`You have successfully updated a tech company!`);
  };

  onUpdateTechCompaniesError = (res) => {
    console.log("errorUpdate");

    toast.error(`ErrorUpdate`);
  };
  getAllTechCompanies = () => {
    getTechCompanies()
      .then(this.getTechCompaniesSuccess)
      .catch(this.getTechCompaniesError);
  };

  render() {
    return (
      <div>
        <form>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Add a Company</h1>
              <p className="lead">
                Fill out the form below to add a Technology Company to the
                database. Have fun!
              </p>
              <p>
                <button className="btn btn-primary btn-lg">
                  Learn more &raquo;
                </button>
              </p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              onChange={this.onInputChange}
              value={this.state.techCompany.name}
              className="form-control"
              id="exampleInputName"
              aria-describedby="nameHelp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile">Profile</label>
            <input
              type="profile"
              name="profile"
              onChange={this.onInputChange}
              value={this.state.techCompany.profile}
              className="form-control"
              id="exampleInputProfile"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputSummary">Summary</label>
            <input
              type="summary"
              name="summary"
              onChange={this.onInputChange}
              value={this.state.techCompany.summary}
              className="form-control"
              id="exampleInputummary"
              aria-describedby="summaryHelp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputHeadline">Headline</label>
            <input
              onChange={this.onInputChange}
              type="headline"
              name="headline"
              value={this.state.techCompany.headline}
              className="form-control"
              id="exampleInputHeadline"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputContactInformation">
              Contact Information
            </label>
            <input
              type="contactInformation"
              name="contactInformation"
              onChange={this.onInputChange}
              value={this.state.techCompany.contactInformation}
              className="form-control"
              id="exampleInputContactInformation"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputSlug">Slug</label>
            <input
              type="slug"
              name="slug"
              onChange={this.onInputChange}
              value={this.state.techCompany.slug}
              className="form-control"
              id="exampleInputSlug"
            />
          </div>{" "}
          <div className="form-group">
            <label htmlFor="exampleInputStatusId">Status Id</label>
            <input
              type="statusId"
              name="statusId"
              onChange={this.onInputChange}
              value={this.state.techCompany.statusId}
              className="form-control"
              id="exampleInputStatusId"
            />
          </div>{" "}
          <div className="form-group">
            <label htmlFor="exampleInputImages">Images</label>
            <input
              type="images"
              name="images"
              onChange={this.onInputChange}
              value={this.state.techCompany.images}
              className="form-control"
              id="exampleInputImages"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputUrls">Urls</label>
            <input
              type="urls"
              name="urls"
              onChange={this.onInputChange}
              value={this.state.techCompany.urls}
              className="form-control"
              id="exampleInputUrls"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputTags">Tags</label>
            <input
              type="tags"
              name="tags"
              onChange={this.onInputChange}
              value={this.state.techCompany.tags}
              className="form-control"
              id="exampleInputTags"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputFriendIds">Friend Ids</label>
            <input
              type="friendIds"
              name="friendIds"
              onChange={this.onInputChange}
              value={this.state.techCompany.friendIds}
              className="form-control"
              id="exampleInputFriendIds"
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button onClick={this.handleClickAdd}>Submit</button>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </form>
      </div>
    );
  }
}

export default AddOrEditTechCompanies;
