import React from "react";
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
    mappedCars: null,
    currentYear: "allYears",
  };
  mapCar = (oneCar) => {
    return (
      <SingleCar key={this.state.cars.indexOf(oneCar)} car={oneCar}></SingleCar>
    );
  };
  onShowCarsClick = () => {
    console.log("Show Cars was clicked");

    if (this.state.mappedCars) {
      this.setState(() => {
        return { mappedCars: null };
      });
    } else {
      this.setState(() => {
        let cars = this.state.cars;

        let filteredCars = cars.filter(this.yearFilter);

        let mappedCars = filteredCars.map(this.mapCar);

        return { mappedCars };
      });
    }
  };

  yearFilter = (car) => {
    var carYear = car.year.toString();
    if (this.state.currentYear === "allYears") {
      return car;
    } else if (this.state.currentYear === carYear) {
      return car;
    }
  };

  onSelectorChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    this.setState(() => {
      let currentYear = { ...this.state.currentYear };

      currentYear = newValue;
      return { currentYear };
    });
    if (this.state.mappedCars) {
      this.setState(() => {
        let cars = this.state.cars;

        let filteredCars = cars.filter(this.yearFilter);

        let mappedCars = filteredCars.map(this.mapCar);

        return { mappedCars };
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">{this.state.mappedCars}</div>
        <div className="d-flex justify-content-center mt-3">
          <select className="mr-3" name="year" onChange={this.onSelectorChange}>
            <option value="allYears">All Years</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onShowCarsClick}
          >
            Show Cars
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Cars;
