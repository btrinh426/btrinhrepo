import React, { Component } from "react";
import Navbar from "./Components/SiteNav/NavBar";
import { toast } from "react-toastify";
import { addProduct } from "./services/UserService";
import "./App.css";

class App extends Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: "",
    },
  };

  onSubmit = (e) => {
    e.preventDefault();
    addProduct(this.state.formData)
      .then(this.onAddSuccess)
      .catch(this.onAddError);
  };
  onAddSuccess = (response) => {
    var id = response.data.item;
    toast.info("Your Product Id is " + id, {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log(response);
  };
  onAddError = (errResponse) => {
    toast.warning("Error - nothing submitted", {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log(errResponse);
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      parseInt(formData.cost);
      console.log(formData.cost);
      return { formData };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <div className="container">
            <div style={{ margin: "3rem", padding: "3rem" }}>
              <h1>
                <strong>Assessment</strong>
              </h1>
            </div>
          </div>
        </div>
        <div style={{ margin: "3rem", padding: "3rem" }}>
          <div className="container">
            <div style={{ marginTop: "4rem" }}>
              <h5>Add Your Info Here:</h5>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <form id="formRegister">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="name"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="enter your name"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="manufacturer">Manufacturer</label>
                  <input
                    type="text"
                    id="manufacturer"
                    name="manufacturer"
                    className="form-control"
                    placeholder="manufacturer"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.manufacturer}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    className="form-control"
                    placeholder="enter a description"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.description}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cost">Cost</label>
                  <input
                    type="text"
                    id="cost"
                    name="cost"
                    className="form-control"
                    placeholder="cost"
                    onChange={this.onFormFieldChanged}
                    value={this.state.formData.cost}
                  />
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <button
                    id="addInfo"
                    type="submit"
                    className="btn btn-primary mx-6"
                    onClick={this.onSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Navbar />
      </React.Fragment>
    );
  }
}

export default App;
