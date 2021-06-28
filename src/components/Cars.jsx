import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Cars extends Component {
  state = {
    showCars: true,
    carYearSelect: "All",
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
    carsObjs: [],
  };

  componentDidMount = () => {
    this.setState(() => {
      const carsObjs = this.state.cars.map((car) => this.mapSingleCar(car));
      return { carsObjs };
    });
  };

  mapSingleCar = (aCar) => {
    return (
      <div className="card col-md-3 m-1 p-1" style={{ maxWidth: "200px", backgroundColor: "#478b1d" }}>
        <div className="card-body p-2">
          <h5 className="card-title">{aCar.make}</h5>
          <h5 className="card-text">{aCar.model}</h5>
          <h5 className="card-text">{aCar.year}</h5>
        </div>
      </div>
    );
  };

  clickShowCarsButton = (e) => {
    e.preventDefault();
    this.setState(() => {
      const showCars = !this.state.showCars;
      return { showCars };
    });
  };

  onCarSelectChange = (e) => {
    const carYearSelection = e.currentTarget.value;
    let carsToRender;

    if (carYearSelection === "All") {
      carsToRender = this.state.cars;
    } else {
      carsToRender = this.state.cars.filter((car) => car.year === parseInt(carYearSelection));
    }

    const carsObjs = carsToRender.map((car) => this.mapSingleCar(car));

    this.setState(() => {
      const carYearSelect = carYearSelection;
      return { carYearSelect, carsObjs };
    });
  };

  render() {
    let showCarsButton = (
      <button
        className="col-1 btn btn-primary mb-1 ml-0 mt-0 mr-3"
        style={{ minWidth: "fit-content", height: "fit-content" }}
        id="showCarsButton"
        onClick={this.clickShowCarsButton}
      >
        {this.state.showCars ? "Hide Cars" : "Show Cars"}
      </button>
    );

    return (
      <div className="col pl-3 mr-3">
        <div className="row m-0 pl-0 pt-2 pb-2 pr-2">
          <h3 className="col pl-0" id="mainTitle">
            Cars
          </h3>
        </div>
        <div
          className="container row border border-secondary rounded mb-0 mr-3 ml-0 pl-3 pt-3 pr-3 pb-0 "
          id="mainView"
          style={{ backgroundColor: "rgb(210, 217, 235)", minWidth: "600px", maxWidth: "2100px" }}
        >
          <div className="col pl-3 pt-0 pb-0 m-0">
            <div className="row pl-0 pr-3 pt-0 pb-0 mb-2">
              {showCarsButton}
              <div className="col">
                <div className="row">
                  <select
                    type="select"
                    className="custom-select form-control my-input-control col"
                    style={{ maxWidth: "fit-content" }}
                    name="carYearSelect"
                    value={this.state.carYearSelect}
                    onChange={this.onCarSelectChange}
                  >
                    <option>All</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row" id="displayCarCards">
              <div className="col nav-item pl-0 pr-3">
                <div className="row displayCarCards pl-3 pr-3 pb-3 pt-0">
                  {this.state.showCars ? this.state.carsObjs : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Cars);
