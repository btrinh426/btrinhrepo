import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { toast } from "react-toastify";
import * as jobService from "../services/jobService";

const JobForm = (props) => {
  let jobInfo;
  if (props.location.pathname !== "/jobs/new") {
    jobInfo = props.location.state.jobInfo;
  } else {
    jobInfo = {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "",
      statusId: "",
      techCompanyId: "",
      skills: "",
    };
  }

  // const onJobsFormChange = (e) => {
  //   let currentTargetName = e.currentTarget.name;
  //   let currentTargetValue = e.currentTarget.value;
  //   this.setState((prevState) => {
  //     let newState = { ...prevState };
  //     newState.newJob[currentTargetName] = currentTargetValue;
  //     return newState;
  //   });
  // };

  const clickJobSubmitButton = (e) => {
    console.log("Job submit button clicked.");
    e.preventDefault();
    const jobData = getNewJobData();
    if (
      props.location.pathname === "/jobs/new" &&
      document.getElementById("jobFormSubmitButton").innerText === "Submit"
    ) {
      // Add new job
      jobService.addJob(jobData).then(onAddJobSuccess).catch(onAddJobError);
    } else {
      // Update old job
      jobData.id = document.getElementById("jobUpdateId").innerText;
      jobService.updateJob(jobData).then(onUpdateJobSuccess).catch(onUpdateJobError);
    }
  };

  const getNewJobData = () => {
    const newJob = {
      title: document.getElementById("jobTitleInput").value,
      description: document.getElementById("jobDescInput").value,
      summary: document.getElementById("jobSummaryInput").value,
      pay: document.getElementById("jobPayInput").value,
      slug: document.getElementById("jobSlugInput").value,
      statusId: document.getElementById("jobStatusInput").value,
      techCompanyId: document.getElementById("jobTechCoIdInput").value,
      skills: [],
    };

    let skillText = document.getElementById("jobSkillsInput").value;
    if (skillText.indexOf(",") !== -1) {
      skillText = skillText.split(",");
    } else {
      skillText = skillText.split(" ");
    }
    newJob.skills = [...skillText];

    return newJob;
  };

  const onAddJobSuccess = (response) => {
    console.log(`Add job success: ${response.data.item}.`);
    toast.success(`Added new job, ID: ${response.data.item}`);
    document.getElementById("jobUpdateId").innerText = response.data.item;
    document.getElementById("jobFormSubmitButton").innerText = "Update";
    // props.history.push("/jobs");
    // Add new job to state:
    // const newJobData = JSON.parse(response.config.data);
    // console.log(newJobData);
    // this.setState(
    //   (prevState) => {
    //     let newState = { ...prevState };
    //     const newJob = {
    //       title: response.data.item,
    //       title: newJobData.title,
    //       description: newJobData.description,
    //       headline: newJobData.headline,
    //       summary: newJobData.summary,
    //       statusId: newJobData.statusId,
    //       skills: newJobData.skills,
    //       slug: newJobData.slug,
    //       primaryImage: { imageUrl: newJobData.primaryImage },
    //     };

    //     newState.jobs.reverse();
    //     newState.jobs.push(newJob);
    //     newState.jobs.reverse();
    //     return newState;
    //   },
    //   () => {
    //     console.log("State set with new job.");
    //     document.getElementById("getJobs").innerText = "Hide Active Jobs";
    //     this.props.history.push("/jobs");
    //     toast.success(`Job added.`);
    //   }
    // );
  };

  const onAddJobError = (error) => {
    debugger;
    console.error("Error adding new job.");
    const errorText = error.response.data.errors;
    const ErrorDiv = () => (
      <div>
        <p>Registration failed:</p>
        <p>{errorText.join("\n")}</p>
      </div>
    );
    toast.error(<ErrorDiv />, { autoClose: 10000 });
  };

  const onUpdateJobSuccess = (response) => {
    toast.success(`Job updated.`);
    console.log(`Job update success: `);
    console.log(response.config.data);
    // props.history.push("/jobs");
  };

  const onUpdateJobError = (error) => {
    debugger;
    console.error("Error updating job.");
    console.error(error);
  };

  const clickJobClearButton = (e) => {
    console.log("User clicked Job Form Reset button");
    document.getElementById("jobTitleInput").defaultValue = "";
    document.getElementById("jobDescInput").defaultValue = "";
    document.getElementById("jobSummaryInput").defaultValue = "";
    document.getElementById("jobPayInput").defaultValue = "";
    document.getElementById("jobSlugInput").defaultValue = "";
    document.getElementById("jobStatusInput").defaultValue = "";
    document.getElementById("jobTechCoIdInput").defaultValue = "";
    document.getElementById("jobSkillsInput").defaultValue = "";
  };

  const clickJobCancelButton = (e) => {
    e.preventDefault();
    console.log("User clicked cancel button");
    props.history.push("/jobs");
  };

  return (
    <div className="col pl-3 mr-3" style={{ zIndex: "10" }}>
      <div className="row m-0 pl-0 pt-2 pb-2 pr-2">
        <h3 className="col pl-0" id="mainTitle">
          Jobs
        </h3>
      </div>

      <div className="row pl-3">
        <div className="col nav-item pl-0 pr-3" style={{ marginBottom: "1rem" }}>
          <div className="row pl-3 pr-3 pb-3 pt-0">
            <div
              className=" container row border border-secondary rounded mb-0 mr-3 ml-0 p-3"
              id="jobAddUpdateFormBorder"
              style={{ backgroundColor: "rgb(210, 217, 235)", width: "fit-content" }}
            >
              <div className="col pl-3 pt-0 pb-0 m-0">
                <div className="row">
                  <Form
                    className="jobLogForm col m-0 pl-0 pr-0"
                    style={{ marginBottom: "1rem", minWidth: "500px", height: "fit-content" }}
                  >
                    <FormGroup className=" row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobTitleInput" className="form-label my-label col-3">
                            Title
                          </Label>
                          <Input
                            type="text"
                            className="form-control my-input-control col"
                            id="jobTitleInput"
                            aria-describedby="jobTitleHelp"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className=" row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobDescInput" className="form-label my-label col-3">
                            Description
                          </Label>
                          <textarea
                            className="form-control my-input-control col"
                            id="jobDescInput"
                            rows="4"
                            maxLength="2147483647"
                            style={{ resize: "none" }}
                          ></textarea>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className=" row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobSummaryInput" className="form-label my-label col-3">
                            Summary
                          </Label>
                          <textarea
                            className="form-control my-input-control col"
                            id="jobSummaryInput"
                            rows="4"
                            maxLength="255"
                            style={{ resize: "none" }}
                          ></textarea>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className=" row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobPayInput" className="form-label my-label col-3">
                            Pay
                          </Label>
                          <Input
                            type="text"
                            className="form-control my-input-control col"
                            id="jobPayInput"
                            aria-describedby="jobPayHelp"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className=" row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobSlugInput" className="form-label my-label col-3">
                            Slug
                          </Label>
                          <Input
                            type="text"
                            className="form-control my-input-control col"
                            id="jobSlugInput"
                            aria-describedby="jobSlugHelp"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className=" row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobStatusInput" className="form-label my-label col-3">
                            Status
                          </Label>
                          <select className="custom-select form-control my-input-control col" id="jobStatusInput">
                            <option value="">Choose...</option>
                            <option value="NotSet">Not Set</option>
                            <option value="Active">Active</option>
                            <option value="Deleted">Deleted</option>
                            <option value="Flagged">Flagged</option>
                          </select>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className=" row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobTechCoIdInput" className="form-label my-label col-3">
                            Tech Co ID
                          </Label>
                          <Input
                            type="text"
                            className="form-control my-input-control col"
                            id="jobTechCoIdInput"
                            aria-describedby="jobTechCoIdHelp"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobSkillsInput" className="form-label my-label col-3">
                            Skills
                          </Label>
                          <Input
                            type="text"
                            className="form-control my-input-control col"
                            id="jobSkillsInput"
                            aria-describedby="jobSkillsHelp"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <div
                      className="row mr-1 pt-3 ml-0"
                      style={{ justifyContent: "center", borderTop: "2px #8e9194 solid" }}
                    >
                      <Button
                        type="submit"
                        color="success"
                        className="m-1"
                        id="jobFormSubmitButton"
                        onClick={clickJobSubmitButton}
                      >
                        Submit
                      </Button>
                      <Button
                        type="reset"
                        color="warning"
                        className=" m-1"
                        id="jobFormClearButton"
                        onClick={clickJobClearButton}
                      >
                        Clear Form
                      </Button>
                      <Button
                        type="reset"
                        color="secondary"
                        className=" m-1"
                        id="friendFormCancelButton"
                        onClick={clickJobCancelButton}
                      >
                        Cancel
                      </Button>
                    </div>
                    <div id="jobUpdateId" className="d-none"></div>
                  </Form>
                  {/*                   
                  <Form
                    className="jobLogForm col-4 mr-3"
                    id="jobAddUpdateForm"
                    style={{ marginBottom: "1rem", minWidth: "350px", height: "fit-content" }}
                  >
                    <FormGroup className="form-group row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobTitleInput" className="form-label my-label col-3" style={{ minWidth: "68px" }}>
                            Title
                          </Label>
                          <Input
                            type="text"
                            className="form-control my-input-control col"
                            id="jobTitleInput"
                            name="title"
                            aria-describedby="jobTitleHelp"
                            defaultValue={jobInfo.title}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobBioInput" className="form-label my-label col-3">
                            Description
                          </Label>
                          <textarea
                            className="form-control my-Input-control col"
                            id="jobBioInput"
                            name="description"
                            rows="4"
                            defaultValue={jobInfo.description}
                          ></textarea>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobSummaryInput" className="form-label my-label col-3">
                            Summary
                          </Label>

                          <Input
                            type="text"
                            className="form-control my-input-control col"
                            id="jobSummaryInput"
                            name="summary"
                            aria-describedby="jobSummaryHelp"
                            defaultValue={jobInfo.summary}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobHeadlineInput" className="form-label my-label col-3">
                            Headline
                          </Label>
                          <Input
                            type="text"
                            className="form-control my-input-control col"
                            id="jobHeadlineInput"
                            name="headline"
                            aria-describedby="jobHeadlineHelp"
                            defaultValue={jobInfo.headline}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobSlugInput" className="form-label my-label col-3">
                            Slug
                          </Label>
                          <Input
                            type="text"
                            className="form-control my-input-control col"
                            id="jobSlugInput"
                            name="slug"
                            aria-describedby="jobSlugHelp"
                            defaultValue={jobInfo.slug}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobStatusInput" className="form-label my-label col-3">
                            Status
                          </Label>
                          <Input
                            type="select"
                            className="form-control my-input-control col"
                            id="jobStatusInput"
                            name="statusId"
                            defaultValue={jobInfo.statusId}
                          >
                            <option value="">Select Status...</option>
                            <option value="Active">Active</option>
                            <option value="NotSet">Not Set</option>
                            <option value="Deleted">Deleted</option>
                            <option value="Flagged">Flagged</option>
                          </Input>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1">
                      <div className="col">
                        <div className="row align-items-center">
                          <Label for="jobSkillsInput" className="form-label my-label col-3">
                            Skills
                          </Label>
                          <Input
                            type="text"
                            className="form-control my-input-control col"
                            id="jobSkillsInput"
                            name="skills"
                            aria-describedby="jobSkillsHelp"
                            defaultValue={jobInfo.skills}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group row mr-1 align-items-top">
                      <Label for="jobImageInput" className="col-3 form-label my-label" style={{ height: "10rem" }}>
                        Primary Image
                      </Label>
                      <div className="col pl-0 pr-0" style={{ minWidth: "100px" }}>
                        <CardImg
                          className="row ml-0"
                          style={{
                            objectFit: "scale-down",
                            objectPosition: "left top",
                            marginBottom: "0.25rem",
                            maxHeight: "150px",
                            maxWidth: "100%",
                          }}
                          src={jobInfo.primaryImage.imageUrl}
                          id="jobImageDisplay"
                          alt="Job avatar"
                        />
                        <Input
                          type="url"
                          className="form-control row p-1 ml-0"
                          id="jobImageInput"
                          name="primaryImage"
                          aria-describedby="jobImageHelp"
                          defaultValue={
                            jobInfo.primaryImage.imageUrl === defaultJobImage
                              ? "www.image-url-here.com"
                              : jobInfo.primaryImage.imageUrl
                          }
                        ></Input>
                        <Button
                          type="submit"
                          color="primary"
                          className="row ml-0"
                          style={{ width: "100% !important" }}
                          id="jobImageUploadButton"
                          onClick={clickJobImageSubmitButton}
                        >
                          <span className="fas fa-upload"> </span> Upload
                        </Button>
                      </div>
                    </FormGroup>

                    <div
                      className="row mr-1 pt-3 ml-0"
                      style={{ justifyContent: "center", borderTop: "2px #8e9194 solid" }}
                    >
                      <Button
                        type="submit"
                        color="success"
                        className="m-1"
                        id="jobFormSubmitButton"
                        onClick={clickJobSubmitButton}
                      >
                        Submit
                      </Button>
                      <Button
                        type="reset"
                        color="warning"
                        className=" m-1"
                        id="jobFormClearButton"
                        onClick={clickJobClearButton}
                      >
                        Clear Form
                      </Button>
                      <Button
                        type="reset"
                        color="secondary"
                        className=" m-1"
                        id="jobFormCancelButton"
                        onClick={clickJobCancelButton}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
