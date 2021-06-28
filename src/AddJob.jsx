import React from "react";
import { toast } from "react-toastify";
import jobService from "./services/jobService";

class AddJob extends React.Component {
  state = {
    formData: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: "",
      techCompanyId: "",
      skills: "",
      id: "",
      show: true,
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
    e.preventDefault();
    const jobIdFromEdit = this.props.match.params.id;
    const data = { ...this.state.formData };

    data.skills = data.skills.split(",");

    if (data.id || jobIdFromEdit) {
      jobService
        .updateOneJobById(data, data.id)
        .then(this.OnUpdateOneJobByIdSuccess)
        .catch(this.OnUpdateOneJobByIdError);
    } else {
      jobService
        .addJob(data)
        .then(this.onAddJobSuccess)
        .catch(this.onAddJobError);
    }
  };

  onAddJobSuccess = (response) => {
    let jobId = response.data.item;
    toast.success("success");
    this.setState(() => {
      let newState = this.state.formData;
      newState.id = jobId;
      return newState;
    });
  };

  onAddJobError(response) {
    toast.error(response);
  }

  OnUpdateOneJobByIdSuccess = (response) => {
    toast.success("update success");
    console.log(response);
    this.setState(() => {
      let formData = { ...response };
      formData.show = true;

      return { formData };
    });
  };

  OnUpdateOneJobByIdError = (response) => {
    toast.error("update error");
  };

  componentDidMount() {
    const jobIdFromEdit = this.props.match.params.id;
    if (this.props.location.state) {
      let locState = this.props.location.state;
      var fromOtherCom = this.props.location.state.payload;
      console.log(fromOtherCom);
      if (locState.type) {
        this.setState(() => {
          let formData = { ...fromOtherCom };
          formData.show = true;
          formData.techCompanyId = fromOtherCom.techCompany.id;
          let countSkills = fromOtherCom.skills;
          formData.skills = countSkills.map((name) => name.name).join(",");
          // for (var i = 0; i < countSkills.length; i++) {
          //   formData.skills = countSkills[i].name.join(" ");
          // }

          return { formData };
        });
      }
    } else if (jobIdFromEdit) {
      jobService
        .getOneJobById(jobIdFromEdit)
        .then(this.getOneJobByIdSuccess)
        .catch(this.getOneJobByIdError);
    }
  }

  getOneJobByIdSuccess = (response) => {
    console.log(response);
    var jobData = response.data.item;
    let countSkills = response.data.item.skills;
    this.setState(() => {
      let formData = jobData;
      formData.techCompanyId = jobData.techCompany.contactInformation.entityId;
      formData.skills = countSkills.map((name) => name.name).join(",");
      formData.show = true;

      return { formData };
    });
    toast.success("Get Job Information Success");
  };
  getOneJobByIdError = (response) => {
    let error = response;
    toast.error("Invalid ID");
    this.setState(() => {
      let newState = {};
      newState.formData = { show: false };
      return newState;
    });
  };
  render() {
    return <div>{this.state.formData.show && this.renderMessage()}</div>;
  }

  renderMessage() {
    return (
      <form>
        <div className="form-group row">
          <label
            htmlFor="exampleInputEmail1"
            className="col-sm-2 col-form-label"
          >
            Title
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="title"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.title}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Address
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="description"
              id="description"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.description}
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
              id="summary"
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
            Salary
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="pay"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.pay}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            imageUrl
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="slug"
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
            StatusId
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              name="statusId"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.statusId}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Tech Company Id
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="primaryImage"
              name="techCompanyId"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.techCompanyId}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="exampleInputPassword1"
            className="col-sm-2 col-form-label"
          >
            Skills
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              id="skills"
              name="skills"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.skills}
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

export default AddJob;
