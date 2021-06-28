import React from "react";

class JobForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobData: {
        title: "",
        description: "",
        summary: "",
        pay: "",
        slug: "",
        statusId: "NotSet",
        techCompanyId: 0,
        skills: [""],
      },
    };
  }

  handleChange = (e) => {
    let currentTarget = e.currentTarget;
    let value = currentTarget.value;
    let name = currentTarget.name;

    this.setState(() => {
      const jobData = { ...this.state.jobData };
      jobData[name] = value;

      return { jobData };
    });
  };

  render() {
    return (
      <div className="container">
        <form className="submitForm" onSubmit={this.submitForm}>
          <div className="row" style={{ marginTop: "1rem" }}>
            <h3>Add a Job</h3>
          </div>
          <div className="form-group">
            <label for="title" className="font-weight-bold">
              Position
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Hiring Position"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            value={this.state.techCompanyId}
            onChange={this.handleChange}
          >
            <option selected>Select an option</option>
            <option value="24646">Microsoft</option>
            <option value="24643">Google</option>
            <option value="24645">Apple</option>
            <option value="24644">Facebook</option>
            <option value="24642">Amazon</option>
          </select>
          <div className="form-group">
            <label for="description" className="font-weight-bold">
              Job Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Description about position"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label for="summary" className="font-weight-bold">
              Job Location
            </label>
            <input
              type="text"
              className="form-control"
              name="summary"
              placeholder="Job Location"
              value={this.state.summary}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label for="pay" className="font-weight-bold">
              Pay
            </label>
            <input
              type="text"
              className="form-control"
              name="pay"
              placeholder="Salary"
              value={this.state.pay}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label for="skills" className="font-weight-bold">
              Skills
            </label>
            <input
              type="text"
              className="form-control"
              name="skills"
              placeholder="Skills Requirement"
              value={this.state.skills}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label for="slug" className="font-weight-bold">
              Slug
            </label>
            <input
              type="text"
              className="form-control"
              name="slug"
              placeholder="Slug"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" form="submitForm">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default JobForms;
