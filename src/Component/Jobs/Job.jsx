import React from "react";
import * as JobService from "../../services/JobService";

class Job extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        profile: "",
        summary: "",
        headline: "",
        contactInformation: "",
        slug: "",
        statusId: "",
        images: [
          {
            imageTypeId: "",
            imageUrl: "",
          },
        ],
        tags: ["string"],
        friendIds: [0],
      },
    };
  }

  componentDidMount() {
    JobService.addCompany()
      .then(this.onAddCompanySuccess)
      .catch(this.onAddCompanyError);
  }

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    let jobName = this.state.formData.name;

    JobService.getJob(jobName)
      .then(this.onGetJobSuccess)
      .catch(this.onGetJobError);
  };

  render() {
    return <form className="form-inline my-2 my-lg-0"></form>;
  }
}

export default Job;
