import React, { Component } from "react";
import { toast } from "react-toastify";
import { currentUser } from "../services/userService";

import { postHouses, updateHouses } from "../services/houseService";

class AddOrEditHouses extends Component {
  state = {
    house: {
      address: [""],
      stateUs: [""],
      zipcode: [""],
    },
  };

  componentDidMount() {
    currentUser()
      .then(this.onCurrentUserSuccess)
      .catch(this.onCurrentUserError);
    if (this.props.location.state) {
      let locState = this.props.location.state;
      if (locState.type === "house_Obj") {
        let newHouse = locState.payload.oneHouse;

        this.setState(() => {
          return { house: newHouse };
        });
      }
    }
  }
  onInputChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputData = currentTarget.name;

    this.setState(() => {
      let house = { ...this.state.house };
      house[inputData] = newValue;
      return { house };
    });
  };
  handleClickAdd = (e) => {
    e.preventDefault();
    console.log("post");
    if (this.props.location.state) {
      updateHouses(this.state.house)
        .then(this.onUpdateHousesSuccess)
        .catch(this.onUpdateHousesError);
    } else {
      postHouses(this.state.house)
        .then(this.onPostHousesSuccess)
        .catch(this.onPostHousesError);
    }
  };

  onPostHousesSuccess = (res) => {
    console.log({ house: res });
    toast.success(`You have successfully added a new house!`);
    this.props.history.push("/houses");
  };

  onPostHousesError = (res) => {
    console.log("errorPost");

    toast.error(`ErrorPost`);
  };

  onUpdateHousesSuccess = (res) => {
    console.log({ house: res });
    toast.success(`You have successfully updated a new house!`);
    this.props.history.push("/houses");
  };

  onUpdateHousesError = (res) => {
    console.log("errorUpdate");

    toast.error(`ErrorUpdate`);
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="address"
            name="address"
            onChange={this.onInputChange}
            value={this.state.house.address}
            className="form-control"
            id="exampleInputAddress"
            aria-describedby="addressHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="state"
            name="state"
            onChange={this.onInputChange}
            value={this.state.house.state}
            className="form-control"
            id="exampleInputState"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputZipcode">Zip Code</label>
          <input
            type="zipcode"
            name="zipcode"
            onChange={this.onInputChange}
            value={this.state.house.zipcode}
            className="form-control"
            id="exampleInputZipcode"
            aria-describedby="zipcodeHelp"
          />
        </div>
        <button onClick={this.handleClickAdd}>Submit</button>
      </div>
    );
  }
}
export default AddOrEditHouses;
