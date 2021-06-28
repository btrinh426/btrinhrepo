import React from "react";
import * as userService from "../services/userService";
// import ReduxToastr from "react-redux-toastr";

class Form extends React.Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: 0,
    },
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = { ...this.state.formData };

      newState[inputName] = newValue;

      return { formData: newState };
    });
  };

  onPostClick = (e) => {
    console.log("post button clicked");
    e.preventDefault();
    const data = {
      name: this.state.formData.name,
      manufacturer: this.state.formData.manufacturer,
      description: this.state.formData.description,
      cost: this.state.formData.cost,
    };

    userService
      .postEntity(data)
      .then(this.onPostSuccess)
      .catch(this.onPostError);
  };
  onPostSuccess = (response) => {
    let entityId = response.data.item;
    console.log("Your Item ID: " + entityId);


    // toastr.success("Your Item ID: " + entityId)}
  };

  onPostError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <React.Fragment>
        <main role="main">
          <div className="container p-5">
            <div className="row">
              <div className="col 1-md-2 p-10">
                <form>
                  <h1>Entities Challenge</h1>
                  <div className="form-group" classID="register.Email">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input
                      type="text"
                      className="htmlForm-control p"
                      id="name"
                      name="name"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.name}
                    ></input>
                  </div>
                  <div className="form-group" classID="register.Email">
                    <label htmlFor="exampleInputEmail1">Manufacturer </label>
                    <input
                      type="text"
                      className="htmlForm-control"
                      id="manufacturer"
                      name="manufacturer"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.manufacturer}
                    ></input>
                  </div>
                  <div className="form-group" classID="register.Email">
                    <label htmlFor="exampleInputEmail1">Description </label>
                    <input
                      type="text"
                      className="htmlForm-control"
                      id="description"
                      name="description"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.description}
                    ></input>
                  </div>
                  <div className="form-group" classID="register.Email">
                    <label htmlFor="exampleInputEmail1">Cost </label>
                    <input
                      type="text"
                      className="htmlForm-control"
                      id="cost"
                      name="cost"
                      onChange={this.onFormFieldChanged}
                      value={this.state.formData.cost}
                    ></input>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.onPostClick}
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
export default Form;
