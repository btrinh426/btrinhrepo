import React from "react";
import { render } from "react-dom";
import SingleCar from "./SingleCar";

class Cars extends React.Component {
  state = {
    cars: [
      {
        // id: 0,
        make: "Kia",
        model: "Sorento",
        year: 2020,
      },
      {
        // id: 1,
        make: "Kia",
        model: "Optima",
        year: 2019,
      },
      {
        // id: 2,
        make: "Tesla",
        model: "Model 3",
        year: 2021,
      },
      {
        // id: 3,
        make: "Honda",
        model: "Civic",
        year: 2019,
      },
      {
        // id: 4,
        make: "Honda",
        model: "Accord",
        year: 2018,
      },
      {
        // id: 5,
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
      },
      {
        // id: 6,
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
        // id: 7,
        make: "Ford",
        model: "F-150",
        year: 2019,
      },
      {
        // id: 8,
        make: "Toyota",
        model: "Camry",
        year: 2020,
      },
      {
        // id: 9,
        make: "Ford",
        model: "F-150",
        year: 2021,
      },
    ],
  };

  componentDidMount() {
    this.setState((prevState) => {
      return { mappedCars: prevState.cars.map(this.mapCar) };
    });
  }

  mapCar = (oneCar) => {
    return (
      <React.Fragment key={`Cars-${oneCar}`}>
        <SingleCar
          {...this.props}
          cars={oneCar}
          onShowCarsRequested={this.onShowCarsClicked}
        ></SingleCar>
      </React.Fragment>
    );
  };

  //-----Show Cars Click Handler-----

  onShowCarsClicked = (e) => {};

  //-----Select by year Click handler(s)-----

  on2021Clicked = (e) => {
    this.setState((prevState) => {
      const result = this.state.cars.filter((car) => car.year === 2021);
      return { cars: result };
    });
  };

  on2020Clicked = (e) => {
    this.setState((prevState) => {
      const result = this.state.cars.filter((car) => car.year === 2020);
      return { cars: result };
    });
  };

  on2019Clicked = (e) => {
    this.setState((prevState) => {
      const result = this.state.cars.filter((car) => car.year === 2019);
      return { cars: result };
    });
  };

  render() {
    return (
      <div className="col-md-12 p-5">
        <h1>Cars</h1>
        <hr />
        <select
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
        >
          <option selected>Open this select menu</option>
          <option value={this.state.cars.year} onClick={this.on2021Clicked}>
            2021
          </option>
          <option value={this.state.cars.year}>2019</option>
          <option value={this.state.cars.year}>2020</option>
        </select>
        <div className="row">{this.state.mappedCars}</div>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.onShowCarsClicked}
        ></button>
      </div>
    );
  }
}
export default Cars;
