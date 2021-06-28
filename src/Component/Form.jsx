import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as formService from "../services/formService";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: "",
        body: "",
        userId: "",
      },
    };
  }

  componentDidMount() {
    if (this.props.history.location.state) {
      this.setState({
        formData: {
          title: this.props.history.location.state.title,
          body: this.props.history.location.state.body,
          userId: this.props.history.location.state.userId,
        },
      });
    }
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
    console.log("posted to url");

    let formEntry = this.props.match.params.id;

    if (formEntry) {
      formService
        .postForm(this.state.formData, formEntry)
        .then(this.postFormSuccess)
        .catch(this.postFormError);
    }
  };

  postFormSuccess = () => {
    toast.success("successfully posted");
  };

  postFormError = () => {
    toast.error("didn't post to url");
  };

  render() {
    return (
      <form style={{ margin: "100px " }}>
        <ToastContainer />
        <div>
          <label>
            <h1 style={{ margin: "30px" }}>I grabbed these values</h1>
          </label>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onFormFieldChange}
              id="title"
              name="title"
              placeholder="ie. Web Developer"
              value={this.state.formData.title}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="body">Body</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onFormFieldChange}
              id="body"
              name="body"
              placeholder="Add info here"
              value={this.state.formData.body}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="userId">User Id</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onFormFieldChange}
              id="userId"
              name="userId"
              placeholder="What is your user id"
              value={this.state.formData.userId}
            ></input>
          </div>
          <button
            type="button"
            style={{ marginTop: "30px" }}
            className="btn btn-primary"
            onClick={this.submitForm}
          >
            Post to Url
          </button>
        </div>
      </form>
    );
  }
}
export default Form;
