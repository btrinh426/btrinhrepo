import React from "react";
import * as friendServices from "../services/friendServices.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";

class PersForm extends React.Component {
  state = {
    person: {
      id: "",
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: "",
    },
  };

  componentDidMount() {
    if (this.props.history.location.state) {
      if (!this.state.id) {
        this.onFormFieldChanged();
      }
    }
  }

  onFormFieldChanged = (e) => {
    if (e) {
      var currentTarget = e.currentTarget;
      var newValue = currentTarget.value;
      var inputName = currentTarget.name;
    }

    this.setState(
      (prevState) => {
        var person = { ...prevState.person };

        if (inputName) {
          person[inputName] = newValue;
        } else if (this.props.history.location.state) {
          if (!this.state.id) {
            // console.log(person)
            this.addEditPersonInfo(person);
          }
        }

        return { person };
      },
      () => console.log(this.state)
    );
  };

  addEditPersonInfo = (oldState) => {
    let personToEdit = this.props.history.location.state;

    oldState.id = personToEdit.id;
    oldState.title = personToEdit.title;
    oldState.bio = personToEdit.bio;
    oldState.summary = personToEdit.summary;
    oldState.headline = personToEdit.headline;
    oldState.slug = personToEdit.slug;
    oldState.statusId = personToEdit.statusId;
    oldState.primaryImage = personToEdit.primaryImage;

    return oldState;
  };

  onSubmitClicked = (e) => {
    e.preventDefault();
    // console.log(this.state.person)

    var personJson = JSON.stringify(this.state.person);

    if (this.state.person.id) {
      swal({
        text: "Are you sure you want to update this record?",
        buttons: true,
      }).then((updateRecord) => {
        if (updateRecord) {
          friendServices
            .editPerson(personJson, this.state.person.id)
            .then(this.onEditPersonSuccess)
            .catch(this.onPersonError);
        }
      });
    } else {
      friendServices
        .addPerson(personJson)
        .then(this.onAddPersonSuccess)
        .catch(this.onPersonError);
    }
  };

  onEditPersonSuccess = (response) => {
    console.log(response);
    toast.success("Person Updated!", this.toastrOptions);

    this.props.history.push("/people");
  };

  onAddPersonSuccess = (response) => {
    console.log(response);
    toast.success("Person Added!", this.toastrOptions);

    this.props.history.push("/people");
  };

  onPersonError = (response) => {
    toast.error("Failed to submit, please try again...", this.toastrOptions);
  };

  toastrOptions = {
    position: toast.POSITION.BOTTOM_RIGHT,
    showDuration: 500,
    timeOut: 1000,
  };

  render() {
    return (
      <React.Fragment>
        <div className="container user-form">
          <form className="form">
            <div className="form-header">User Info</div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={this.state.person.title}
                placeholder="Enter Title"
                onChange={this.onFormFieldChanged}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                className="form-control"
                id="bio"
                name="bio"
                value={this.state.person.bio}
                placeholder="Enter Bio here"
                onChange={this.onFormFieldChanged}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <input
                type="text"
                className="form-control"
                id="summary"
                name="summary"
                value={this.state.person.summary}
                placeholder="Enter Summary Here"
                onChange={this.onFormFieldChanged}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="headline">Headline</label>
              <input
                type="text"
                className="form-control"
                id="headline"
                name="headline"
                value={this.state.person.headline}
                placeholder="Enter Headline Here"
                onChange={this.onFormFieldChanged}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                className="form-control"
                id="slug"
                name="slug"
                value={this.state.person.slug}
                placeholder="Enter slug Here"
                onChange={this.onFormFieldChanged}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="statusId">Status</label>
              <input
                type="text"
                className="form-control"
                id="statusId"
                name="statusId"
                value={this.state.person.statusId}
                placeholder="Enter Status"
                onChange={this.onFormFieldChanged}
                required
              />
            </div>

            {/* <div className="form-group">
                            <label htmlFor="skills">Skills</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="skills" 
                                name="skills" 
                                //  value={this.state.person.skills} 
                                placeholder="Enter Skills Here" 
                                // onChange={this.onFormFieldChanged} 
                                required
                            />
                        </div> */}

            <div className="form-group">
              <label htmlFor="primaryImage">Primary Image</label>
              <input
                type="text"
                className="form-control"
                id="primaryImage"
                name="primaryImage"
                value={this.state.person.primaryImage}
                placeholder="Enter Image Url"
                onChange={this.onFormFieldChanged}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onSubmitClicked}
            >
              Submit
            </button>
          </form>
          <br />
        </div>
        <hr />
        <br />
      </React.Fragment>
    );
  }
}

export default PersForm;
