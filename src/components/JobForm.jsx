import * as jobServices from "../services/jobServices.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class JobForm extends React.Component {
  state = {
    job: {
      id: "",
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: "",
      techCompanyId: "",
      skills: ["string"],
    },
    isReadyToPopulate: false,
  };

  initialState = {
    job: {
      id: "",
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: "",
      techCompanyId: "",
      skills: ["string"],
    },
    isReadyToPopulate: false,
  };

  componentDidUpdate() {
    console.log("hello this is updating...");
    if (this.props.formInfo.jobToEdit) {
      if (!this.state.isReadyToPopulate) {
        this.onFormFieldChanged();
        console.log("THIS IS TOTALLY ON FORM MODAL");
      } else {
        console.log("this.props.formInfo.jobToEdit does not exist");
        console.log(this.state.isReadyToPopulate);
      }
    }
  }

  onFormFieldChanged = (e) => {
    if (e) {
      var currentTarget = e.currentTarget;
      var newValue = currentTarget.value;
      var inputName = currentTarget.name;
    }

    this.setState((prevState) => {
      var job = { ...prevState.job };

      if (inputName) {
        if (inputName === "skills" && typeof newValue === "string") {
          var skillsArr = newValue.split(",");
          job.skills = skillsArr;
        } else {
          job[inputName] = newValue;
        }
      } else if (this.props.formInfo.jobToEdit) {
        this.addJobInfo(job);
      }
      return { job, isReadyToPopulate: true };
    });
  };

  addJobInfo = (newJobRec) => {
    let jobToEdit = this.props.formInfo.jobToEdit;

    let skillsArr = jobToEdit.skills.map(this.createJobArrFromObjArr);

    newJobRec.id = jobToEdit.id;
    newJobRec.title = jobToEdit.title;
    newJobRec.description = jobToEdit.description;
    newJobRec.summary = jobToEdit.summary;
    newJobRec.pay = jobToEdit.pay;
    newJobRec.slug = jobToEdit.slug;
    newJobRec.statusId = jobToEdit.statusId;
    newJobRec.techCompanyId = jobToEdit.techCompanyId;
    newJobRec.skills = skillsArr;
    return newJobRec;
  };

  createJobArrFromObjArr = (skillObj) => {
    return skillObj.name;
  };

  onSubmitClicked = (e) => {
    e.preventDefault();

    var jobPayload = this.state.job;

    var jobJson = JSON.stringify(jobPayload);

    if (this.state.job.id) {
      swal({
        text: "Are you sure you want to update this record?",
        buttons: true,
      }).then((updateRecord) => {
        if (updateRecord) {
          jobServices
            .updateJob(jobJson, jobPayload.id)
            .then(this.onUpdateJobSuccess)
            .catch(this.onUpdateJobError);
        }
      });
    } else {
      jobServices
        .addJob(jobJson)
        .then(this.onAddJobSuccess)
        .catch(this.onAddJobError);
    }
  };

  onUpdateJobSuccess = (response) => {
    // console.log(response);
    toast.success("Job Edited!", this.toastrOptions);
    this.resetFormAndClose();
  };

  onUpdateJobError = (response) => {
    console.log(response);
  };

  onAddJobSuccess = (response) => {
    // console.log(response);
    toast.success("Job Added!", this.toastrOptions);

    // this.this.props.history.push("/jobs");
    this.resetFormAndClose();
  };

  onAddJobError = (response) => {
    toast.error("Failed to submit, please try again...", this.toastrOptions);
  };

  toastrOptions = {
    position: toast.POSITION.BOTTOM_RIGHT,
    showDuration: 500,
    timeOut: 1000,
  };

  resetFormAndClose = (e) => {
    //i need to reset state and toggle modal
    console.log("close!!!");
    console.log(this.state.isReadyToPopulate);
    // reset props...
    this.setState(
      () => {
        return {
          isReadyToPopulate: this.initialState.isReadyToPopulate,
          job: this.initialState.job,
        };
      },
      () => {
        this.props.toggleModal();
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.props.isOpen} toggle={this.resetFormAndClose}>
          <ModalHeader toggle={this.resetFormAndClose}>Job Info</ModalHeader>
          <ModalBody>
            <div className="user-form">
              <form className="modal-form">
                <div className="modal-form-header font-weight-bold text-center">
                  {this.props.formInfo.jobToEdit
                    ? `there is something here thats ready to be used`
                    : "the info is empty"}
                </div>

                <div className="form-group">
                  {" "}
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={this.state.job.title}
                    placeholder="Enter Title"
                    onChange={this.onFormFieldChanged}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={this.state.job.description}
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
                    value={this.state.job.summary}
                    placeholder="Enter Summary Here"
                    onChange={this.onFormFieldChanged}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pay">Pay</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pay"
                    name="pay"
                    value={this.state.job.pay}
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
                    value={this.state.job.slug}
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
                    value={this.state.job.statusId}
                    placeholder="Enter Status"
                    onChange={this.onFormFieldChanged}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="techCompanyId">Tech Company Id</label>
                  <input
                    type="text"
                    className="form-control"
                    id="techCompanyId"
                    name="techCompanyId"
                    value={this.state.job.techCompanyId}
                    placeholder="Enter Tech Company Id"
                    onChange={this.onFormFieldChanged}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="skills">Skills</label>
                  <input
                    type="text"
                    className="form-control"
                    id="skills"
                    name="skills"
                    value={this.state.job.skills}
                    placeholder="Enter Skills Here"
                    onChange={this.onFormFieldChanged}
                    required
                  />
                </div>

                {/* <div className="form-group">
              <label htmlFor="primaryImage">Primary Image</label>
              <input
                type="text"
                className="form-control"
                id="primaryImage"
                name="primaryImage"
                // value={this.state.job.primaryImage}
                placeholder="Enter Image Url"
                // onChange={this.onFormFieldChanged}
                required
              />
            </div> */}
              </form>
              <br />
            </div>
            <hr />
            <br />
          </ModalBody>
          <ModalFooter>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onSubmitClicked}
            >
              Submit
            </button>
            <Button color="secondary" onClick={this.resetFormAndClose}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default JobForm;
