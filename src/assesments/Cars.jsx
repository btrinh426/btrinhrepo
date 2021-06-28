import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

class Cars extends React.Component {
  state = {
    carArr: [
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
    mappedCars: [],
    filteredCars: [],
    showedCars: [],
  };

  componentDidMount() {
    this.createMappedCars();
  }

  createMappedCars = (arr) => {
    var cars = this.state.carArr;
    var mappedCars = cars.map(this.mapCar);

    this.setState(() => {
      return { mappedCars };
    });
  };

  mapCar = (car) => {
    return (
      <div
        className="card col-md-3 m-1"
        key={`${car.make}-${car.model}-${car.year}`}
      >
        <div className="card-body">
          <h5 className="card-title">Make: {car.make}</h5>
          <h5 className="card-text">Model: {car.model}</h5>
          <h5 className="card-text">Year: {car.year}</h5>
        </div>
      </div>
    );
  };
  onSelectClick = (e) => {
    var cars = this.state.mappedCars;
    var filterBy = parseInt(e.currentTarget.name);
    var filteredCars = cars.filter((car) => car.key.includes(filterBy));

    this.setState(() => {
      return { filteredCars, showedCars: filteredCars };
    });
  };

  filterCar = (car) => {};

  onShowClick = (e) => {
    this.setState((prevState) => {
      var mappedCars = prevState.mappedCars;
      return { showedCars: mappedCars };
    });
  };

  onHideClick = (e) => {
    this.setState(() => {
      return { showedCars: [] };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="btn-container row justify-content-between">
          <h1>Cars</h1>

          <div className="dropdown show-hide-cars">
            <button
              className="btn btn-primary btn-sm "
              onClick={this.onShowClick}
            >
              Show
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={this.onHideClick}
            >
              Hide
            </button>
          </div>
          <div className="btn-container">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button
                className="dropdown-item"
                type="button"
                name="2021"
                onClick={this.onSelectClick}
              >
                2021
              </button>
              <button
                className="dropdown-item"
                type="button"
                name="2020"
                onClick={this.onSelectClick}
              >
                2020
              </button>
              <button
                className="dropdown-item"
                type="button"
                name="2019"
                onClick={this.onSelectClick}
              >
                2019
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row"> {this.state.showedCars}</div>
      </React.Fragment>
    );
  }
}

export default Cars;
