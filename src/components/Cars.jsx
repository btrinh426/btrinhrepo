import React from "react";
import SingleCar from "./SingleCar";

class Cars extends React.Component {
  state = {
    cars: [
      { id: 1, make: "Kia", model: "Sorento", year: 2020 },
      { id: 2, make: "Kia", model: "Optima", year: 2019 },
      { id: 3, make: "Tesla", model: "Model 3", year: 2021 },
      { id: 4, make: "Honda", model: "Civic", year: 2019 },
      { id: 5, make: "Honda", model: "Accord", year: 2018 },
      { id: 6, make: "Volkswagen", model: "Jetta", year: 2021 },
      { id: 7, make: "Toyota", model: "Camry", year: 2021 },
      { id: 8, make: "Ford", model: "Mustang", year: 2019 },
      { id: 9, make: "Ford", model: "F-150", year: 2019 },
      { id: 10, make: "Toyota", model: "Camry", year: 2020 },
      { id: 11, make: "Ford", model: "F-150", year: 2021 },
    ],
  };
  //handlers + filters
  onShowCarsClicked = (e) => {
    e.preventDefault();
    let carsList = this.state.cars;
    this.renderCars(carsList);
  };
  on2021Clicked = (e) => {
    let result = 2021;
    this.setState((prevState) => {
      const filteredCars = prevState.mappedCars.filter((item) => {
        return item.props.car.year === result;
      });
      return { mappedCars: filteredCars };
    });
  };
  on2020Clicked = (e) => {
    let result = 2020;
    this.setState((prevState) => {
      const filteredCars = prevState.mappedCars.filter((item) => {
        return item.props.car.year === result;
      });
      return { mappedCars: filteredCars };
    });
  };
  on2019Clicked = (e) => {
    let result = 2019;
    this.setState((prevState) => {
      const filteredCars = prevState.mappedCars.filter((item) => {
        return item.props.car.year === result;
      });
      return { mappedCars: filteredCars };
    });
  };

  //map & render car
  mapCar = (aCar) => {
    return <SingleCar key={aCar.id} {...this.props} car={aCar}></SingleCar>;
  };
  renderCars = (cars) => {
    this.setState(() => {
      console.log("mapping...");
      return { mappedCars: this.state.cars.map(this.mapCar) };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <button
            className="btn btn-primary link-btn"
            onClick={this.onShowCarsClicked}
          >
            Show Hector Some Cars!
          </button>
        </div>
        <div className="row">
          <button
            className="btn btn-secondary link-btn"
            onClick={this.on2021Clicked}
          >
            2021
          </button>
          <button
            className="btn btn-secondary link-btn"
            onClick={this.on2020Clicked}
          >
            2020
          </button>
          <button
            className="btn btn-secondary link-btn"
            onClick={this.on2019Clicked}
          >
            2019
          </button>
        </div>

        <div className="container">
          <div className="col">{this.state.mappedCars}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cars;
