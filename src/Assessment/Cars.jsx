import React from "react";
import CarsCard from "./CarCard";

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
    toggleButton: false,
  };

  componentDidMount() {
    this.setState((prevState) => {
      let cars = prevState.cars;
      return {
        ...prevState.cars,
        mappedCars: cars.map(this.mapCars),
      };
    });
  }

  onShowCars = (e) => {
    e.preventDefault();

    this.setState((prevState) => {
      let toggle = { ...prevState.toggleButton };

      return { toggleButton: !toggle.toggleButton };
    });
  };

  onSelectedYear = (e) => {
    let selectedYear = e.target.value;

    this.setState((prevState) => {
      return {
        ...prevState,
        mappedCars: prevState.cars.filter(this.filterCars),
        targetYear: selectedYear,
      };
    });
  };

  filterCars = (cars) => {
    console.log(cars);
    let result = false;
    if (cars.year === this.state.targetYear) {
      result = true;
    }
    //set state and map again with filter results?
    return result;
  };

  mapCars = (cars) => {
    let number = Math.random() * 1000;
    let key = Math.ceil(number);

    return <CarsCard key={`currentCarId-${key}`} car={cars} />;
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 m-4">
            <h2 className="ml-5">
              Cars <span aria-label="car">🚗</span>
            </h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <button
              className="btn btn-info btn-block"
              onClick={this.onShowCars}
            >
              Show Cars
            </button>
          </div>
        </div>
        <div className="row mt-3 justify-content-center">
          <div className="col-md-4 mx-auto">
            {this.state.toggleButton && (
              <select className="form-select" onChange={this.onSelectedYear}>
                <option defaultValue>Select Year</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
            )}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            {this.state.toggleButton ? this.state.mappedCars : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default Cars;
