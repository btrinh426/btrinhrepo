import React from "react";
//import * as userService from "../services/userService.js";

class Content extends React.Component {
  // state = { name: "Sabio", zipCode: "05854", cost: 5285 };
  // onButtonClicked = (e) => {
  //   e.preventDefault(e); // only needed for type="button" elem, not for div, why? b/c no default behavior on a div
  //   e.stopPropagation(); // stops child handlers from firing
  //   console.log("onSubmit currentTarget Element", e.currentTarget);
  //   console.log("here is one property from state", this.state.zipCode);
  //   console.log("here is the entire object from state", this.state);

  //   const data = { email: "user@google.com", password: "password" };

  //   userService
  //     .logIn(data)
  //     .then(this.onActionSuccess)
  //     .catch(this.onActionError);
  // };

  // onActionSuccess = (res) => {
  //   console.log("logged in", res);
  // };

  // onActionError = (errRes) => {
  //   console.log("login error", errRes);
  // };

  // //BINDING INPUT FIELDS
  // state = { firstName: "Jude", lastName: "Villars" }; // that we coordinate with the names of the
  // //properties of state
  // onFormFieldChanged = (e) => {
  //   let currentTarget = e.currentTarget;
  //   let newValue = currentTarget.value; //  we capture the property's value
  //   let inputName = currentTarget.name; // 4. grab the property name of the input value (i.e. firstName)
  //   console.log(newValue, currentTarget);

  //   this.setState(() => {
  //     let newState = {};
  //     newState[inputName] = newValue; // this is how you bind your state
  //     // to form fields
  //     return newState;
  //   });
  // };

  render() {
    return (
      <React.Fragment>
        {/* <div className="container">
          <div className="row">
            <div className="col-md-4 p-5">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Firstname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName" // 1. we coordinate the name of the input
                    value={this.state.firstName} // 2. with the name of the property in state
                    onChange={this.onFormFieldChanged} // 3. we create the onChange handler
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Lastname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    onChange={this.onFormFieldChanged}
                    value={this.state.lastName}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <hr />
        </div> */}
      </React.Fragment>
    );
  }
}

export default Content;
