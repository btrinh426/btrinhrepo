import React, { Component } from "react";
import SingleCar from "./SingleCar";
import { Button } from "reactstrap";

class Cars extends Component {
  state = {
    carData: [
      {
        id: 1,
        make: "Kia",
        model: "Sorento",
        year: 2020,
      },
      {
        id: 2,
        make: "Kia",
        model: "Optima",
        year: 2019,
      },
      {
        id: 3,
        make: "Tesla",
        model: "Model 3",
        year: 2021,
      },
      {
        id: 4,
        make: "Honda",
        model: "Civic",
        year: 2019,
      },
      {
        id: 5,
        make: "Honda",
        model: "Accord",
        year: 2018,
      },
      {
        id: 6,
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
      },
      {
        id: 7,
        make: "Toyota",
        model: "Camry",
        year: 2021,
      },
      {
        id: 8,
        make: "Ford",
        model: "Mustang",
        year: 2019,
      },
      {
        id: 9,
        make: "Ford",
        model: "F-150",
        year: 2019,
      },
      {
        id: 10,
        make: "Toyota",
        model: "Camry",
        year: 2020,
      },
      {
        id: 11,
        make: "Ford",
        model: "F-150",
        year: 2021,
      },
    ],
    isToggled: false,
  };

  mapCars = (oneCar) => {
    return (
      <SingleCar
        key={`Cars-${oneCar.id}`}
        {...this.props}
        singleCar={oneCar}
      ></SingleCar>
    );
  };

  componentDidMount() {
    this.setState(() => {
      return {
        carsToMap: this.state.carData.map(this.mapCars)
      }; 
    });
  }

  showHide = () => {
    this.setState({ isToggled: !this.state.isToggled });
  };

  onYearClicked = (e) => {
    let allCars = this.state.carData;
    let carYear = e.target.value;
    let filteredCars = allCars.filter((car) => car.year === parseInt(carYear));
    this.setState(() => {
      return {
        carsToMap: filteredCars.map(this.mapCars)
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="year"></label>
          <select
            className="w-25 form-control"
            name="year"
            value={this.state.carData.year}
            onClick={this.onYearClicked}
          >
            <option value="">Select Year</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
          </select>
        </div>
        <div>{this.state.isToggled && this.state.carsToMap}</div>
        <Button
          className="btn btn-primary"
          type="submit"
          onClick={this.showHide}
        >
          Show/Hide
        </Button>
      </React.Fragment>
    );
  }
}

export default Cars;


  