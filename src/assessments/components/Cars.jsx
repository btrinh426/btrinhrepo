import React from "react";
import SingleCar from "./SingleCar";

class Cars extends React.Component {
  state = {
    carsList: [
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
    targetYear: 0,
    filteredCars: [],
    mappedCars: [],
    show: true,
  };

  componentDidMount() {
    this.renderCars();
  }

  onFormChange = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let desiredYear = parseInt(currentTarget.value);
    this.setState((prevState) => {
      return {
        ...prevState,
        targetYear: desiredYear,
      };
    });
    this.renderCars();
  };

  renderCars = () => {
    let carsList = this.state.carsList;
    this.setState((prevState) => {
      let desiredYear = prevState.targetYear;
      let filteredCars = prevState.filteredCars;
      if (desiredYear !== 0) {
        filteredCars = carsList.filter((car) => {
          return car.year === desiredYear;
        });
      } else {
        filteredCars = carsList;
      }
      return {
        ...prevState,
        filteredCars,
        mappedCars: filteredCars.map(this.mapCar),
      };
    });
  };

  mapCar = (singleCar) => <SingleCar car={singleCar} key={singleCar.id} />;

  onClickToggleDisplay = () => {
    this.setState((prevState) => {
      return {
        show: !prevState.show,
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="text-center mb-3 text-center">
          <h1>My Cars</h1>
        </div>
        <div>
          <button type="button" onClick={this.onClickToggleDisplay}>
            Show Cars
          </button>
          <form>
            <div className="form-group row">
              <label
                htmlFor="carYear"
                className="col-form-label col-form-label-sm col-2"
              >
                Year
              </label>
              <div className="col-8">
                <select
                  className="form-control form-control-sm"
                  name="carYear"
                  value={this.state.carsList.year}
                  onChange={this.onFormChange}
                >
                  <option value="0">Select Year</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        {this.state.show ? (
          <div className="clone-container card-deck">
            <div className="text-center">{this.state.mappedCars}</div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Cars;
