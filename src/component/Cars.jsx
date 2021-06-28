import React, { Component } from "react";
import SingleCar from "./SingleCar";

class Cars extends React.Component {
  state = {
    cars: [
      {
        make: "Kia",
        model: "Sorento",
        year: 2020,
      },
      {
        make: "Kia",
        model: "Optima",
        year: 2019,
      },
      {
        make: "Tesla",
        model: "Model 3",
        year: 2021,
      },
      {
        make: "Honda",
        model: "Civic",
        year: 2019,
      },
      {
        make: "Honda",
        model: "Accord",
        year: 2018,
      },
      {
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
      },
      {
        make: "Toyota",
        model: "Camry",
        year: 2021,
      },
      {
        make: "Ford",
        model: "Mustang",
        year: 2019,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2019,
      },
      {
        make: "Toyota",
        model: "Camry",
        year: 2020,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2021,
      },
    ],
    isToggleOpen: false,
    mappedCars: "",
  };

  componenentDidUpdate(prevState) {
    console.log(this.state);
    if (prevState.isToggleOpen === false) {
      this.setState(() => {
        return {
          mappedCars: this.state.cars.map(this.mapCar),
        };
      });
    } else {
      this.setState(() => {
        return {
          mappedCars: "",
        };
      });
    }
  }

  toggle = (e) => {
    e.preventDefault();
    if (this.state.isToggleOpen === false) {
      this.setState((prevState) => {
        return {
          isToggleOpen: !prevState.isToggleOpen,
          mappedCars: this.state.cars.map(this.mapCar),
        };
      });
    } else if (this.state.isToggleOpen === true) {
      this.setState((prevState) => {
        return {
          isToggleOpen: !prevState.isToggleOpen,
          mappedCars: "",
        };
      });
    }
  };

  mapCar = (oneCar) => {
    return (
      <React.Fragment key={`id-${oneCar.model}`}>
        <SingleCar car={oneCar}></SingleCar>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          id="showcars"
          className="btn btn-primary m-3"
          onClick={this.toggle}
        >
          Show Cars
        </button>
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
        >
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>

        <div className="row-md-6">
          <div className="col col-md-6"> {this.state.mappedCars}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cars;
