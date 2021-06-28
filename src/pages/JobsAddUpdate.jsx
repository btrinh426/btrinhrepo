import React from "react";
import * as jobsService from "../services/jobsService";
import { toast } from "react-toastify";

class JobsAddUpdate extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  state = {
    jobData: {
      title: "",
      description: "",
      summary: "",
      pay: "",
      slug: "", // must be unique for ea. job posting
      statusId: "NotSet",
      techCompanyId: "", // must be the a valid co. id
      skillsForm: "", //  vanilla form bind string (change to array of strings)
    }, //in the database, we have an array of objs, but the UI wants to work with a string
  }; // so you end up contorting yourself trying to keep it as an array

  componentDidMount = () => {
    //let currentPath = this.props.location.pathname;
    console.log("componentDidMount");
    let jobId = this.props.location.state.payload.id;
    //debugger;
    console.log("JobsAddUpdate componentDidMount:", { jobId });
    if (jobId) {
      jobsService
        .getById(jobId)
        .then(this.onEditJobByIdSuccess)
        .catch(this.onEditJobByIdError);
    }
  };

  componentDidUpdate(preProps) {
    let jobId = this.props.match.params.jobId;
    console.log("JobsAddUpdate componentDidUpdate:");
    if (jobId && preProps.match.params.jobId !== jobId) {
      //if jobId && previousId (!match) jobId
      console.log("making an ajax call for jobId out of cDU:", { jobId }); // if new jobId is diff old jobId or jobId,

      //debugger; // id's don't match, so I'm going to make a different ajax call
    }
  }

  //-------POST JOB------
  // {
  //   "title": "string",
  //   "description": "string",
  //   "summary": "string",
  //   "pay": "string",
  //   "slug": "string",
  //   "statusId": "NotSet",
  //   "techCompanyId": 0,
  //   "skills": [
  //     "string, string2, string3"
  //   ]
  // }
  onEditJobByIdSuccess = (res) => {
    let jobToPop = res.data.item;
    console.log("onEditJobByIdSuccess res.data.item", jobToPop);

    this.setState(() => {
      let newState = { ...this.state.jobData };
      let jobData = { ...jobToPop };
      newState = {
        title: jobData.title,
        description: jobData.description,
        summary: jobData.summary,
        pay: jobData.pay,
        slug: jobData.slug,
        statusId: jobData.statusId,                 // convert csv string to an array of csv strings 
        skillsForm: jobData?.skills.map((s) => s.name).join(","), // joins the array of strings (undefined was throwing the "controlled/uncontrolled component error")
        primaryImage: jobData.techCompany.images[0].imageUrl, // ["Fire", "Air", "Water"] to "Fire,Air,Water"
      };  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      return { jobData: newState };
    });
  };

  onEditJobByIdError = () => {
    console.warn();
  };

  onFormFieldChanged = (e) => {
    //console.log(e.currentTarget);
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value; //  capt prop val
    let inputName = currentTarget.name; // assn prop name of input val (e.g. eMail)
    //console.log(newValue, currentTarget);
    this.setState((prevState) => {
      //current most recent state object
      let jobData = { ...prevState.jobData }; // copy all props of cur state
      jobData[inputName] = newValue; // bind state to ea field
      // as char entered
      return { jobData };
    });
  };

  //----1st Submit Button Click (Add Record)---- 2nd Submit Button Click (Update)
  onAddUpdateClick = (e) => {
    // the purpose of this function is to prepare my payload
    e.preventDefault();
    let data = { ...this.state.jobData }; //obj bound to form
    console.log("...this.state.jobData:", data);
    if (data) {
      //if not null
      data.skills = data.skillsForm.split(","); // sending the skills property as an array of CSV STRINGS that were entered into the form ["javascript", "react", "c#"]
      // (the API backend requires skills sent to the database to be an array of STRINGS)
      console.log("data.skills:", data.skills); //assemble data for transport
      jobsService
        .add(data)
        .then(this.onAddUpdateJobSuccess)
        .then(this.onAddJobError);
    }
  };

  onAddUpdateJobSuccess = (config) => {
    console.log("job added: ", config);
    toast["success"]("You Added A New Job");
    let id = config.data.item;
    console.log(id);
    this.props.history.push("/jobs");

    // record should still visible on the form
    //keep user on this page
  };
  //---- response Comes back from the API backend-----
  // {
  //   "item": {
  //     "id": 22886,
  //     "title": "Mr. Ed",
  //     "description": "King of England",
  //     "summary": "King of England",
  //     "pay": "400000",
  //     "entityTypeId": 6,
  //     "slug": "yujl7895ll7i",
  //     "statusId": "Active",
  //     "skills": [
  //       {
  //         "id": 1329,
  //         "name": "out"
  //       },
  //       {
  //         "id": 1330,
  //         "name": "this"
  //       },
  //       {
  //         "id": 1331,
  //         "name": "test"
  //       }
  //     ],
  //     "techCompany": {
  //       "id": 20727,
  //       "slug": "slug7",
  //       "statusId": "Active",
  //       "name": "Softwhere",
  //       "headline": "Codex shopping",
  //       "profile": "Software Company",
  //       "summary": "Provides Application Software",
  //       "entityTypeId": 2,
  //       "contactInformation": {
  //         "id": 433,
  //         "entityId": 20727,
  //         "data": "fake_e-mail@fake.com",
  //         "dateCreated": "2021-02-04T18:31:02.38Z",
  //         "dateModified": "2021-02-04T18:31:02.38Z"
  //       },
  //       "images": [
  //         {
  //           "id": 8789,
  //           "entityId": 20727,
  //           "imageTypeId": "Seo",
  //           "imageUrl": "https://dribbble.com/shots/14846041-Codex-Logo"
  //         }
  //       ],
  //       "urls": [
  //         {
  //           "id": 596,
  //           "entityId": 20727,
  //           "url": "string"
  //         }
  //       ],
  //       "friends": null,
  //       "tags": [
  //         {
  //           "id": 11,
  //           "entityId": 20727,
  //           "tagName": "string"
  //         }
  //       ],
  //       "dateCreated": "2021-02-04T18:31:02.3333333",
  //       "dateModified": "2021-02-04T18:31:02.3333333"
  //     },
  //     "dateCreated": "2021-03-06T19:36:59.1466667",
  //     "dateModified": "2021-03-06T19:36:59.1466667"
  //   },
  //   "isSuccessful": true,
  //   "transactionId": "e418dd31-69d9-4055-952a-c40fba4217b1"
  // }

  onAddJobError = () => {
    console.error("job add error"); // getting a job add error @ chunk  36549    return r.apply(this, arguments);
    //debugger;
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
                      <h3>Add/ Update Job </h3>
                      <h6>--Second Click of Submit Updates Record--</h6>
                    </div>

                    <label htmlFor="inputTitle" className="title">
                      Title
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="title"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.title}
                    />

                    <label htmlFor="inputDescription" className="description">
                      Description
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="description"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.description}
                    />

                    <label htmlFor="inputSummary" className="summary">
                      Summary
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="summary"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.summary}
                    />

                    <label htmlFor="inputPay" className="pay">
                      Pay
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="pay"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.pay}
                    />

                    <label htmlFor="inputSlug" className="slug">
                      Slug - Please enter a unique Slug
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="slug"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.slug}
                    />

                    <label htmlFor="inputStatusId" className="statusId">
                      StatusId - Please enter 1 for active
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="statusId"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.statusId}
                    />

                    <label
                      htmlFor="inputtechCompanyId"
                      className="techCompanyId"
                    >
                      TechCompanyId - Please enter a valid company Id
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="techCompanyId"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.techCompanyId || ""}
                    />

                    <label htmlFor="inputSkills" className="skills">
                      Skills
                    </label>
                    <input
                      className="form-control clear-fields"
                      type="text"
                      name="skillsForm"
                      onChange={this.onFormFieldChanged}
                      value={this.state.jobData.skillsForm} // form capture string  we control these key names
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="container middle">
              <div className="row">
                <div className="col-md-12">
                  <button
                    id="putAPI"
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

export default JobsAddUpdate;
