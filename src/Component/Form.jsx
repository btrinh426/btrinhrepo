import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as formService from "../services/formService";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        manufacturer: "",
        description: "",
        cost: "",
      },
    };
  }

  componentDidMount() {
    if (this.props.history.location.state) {
      this.setState({
        formData: {
          name: this.props.history.location.state.name,
          manufacturer: this.props.history.location.state.manufacturer,
          description: this.props.history.location.state.description,
          cost: this.props.history.location.state.cost,
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

    let formEntry = this.props.match.params;

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
      <form style={{ margin: "200px " }}>
        <ToastContainer />
        <div>
          <label>
            <h1 style={{ margin: "30px" }}>Car Form</h1>
          </label>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onFormFieldChange}
              id="name"
              name="name"
              placeholder="Honda"
              value={this.state.formData.name}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onFormFieldChange}
              id="manufacturer"
              name="manufacturer"
              placeholder="Manufacturer"
              value={this.state.formData.manufacturer}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onFormFieldChange}
              id="description"
              name="description"
              placeholder="Description"
              value={this.state.formData.description}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="cost">Cost</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onFormFieldChange}
              id="cost"
              name="cost"
              placeholder="Cost"
              value={this.state.formData.cost}
            ></input>
          </div>

          <button
            type="button"
            style={{ marginTop: "30px" }}
            className="btn btn-primary"
            onClick={this.submitForm}
          >
            Submit Car
          </button>
        </div>
      </form>
    );
  }
}
export default Form;
