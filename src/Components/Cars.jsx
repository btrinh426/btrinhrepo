import React from "react";
import CarsCards from "./CarsCards";

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
    mappedCarsForDisplay: "",
    showCars: true,
  };

  componentDidMount() {
    let carsMappedArr = this.state.cars.map(this.mapCarCards);
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.mappedCarsForDisplay = carsMappedArr;
      return newState;
    });
  }

  mapCarCards = (car) => {
    return (
      <div
        className="card mb-1 m-3 col-2"
        style={{ height: "200px" }}
        key={car.model + car.make + car.year}
      >
        <CarsCards car={car}></CarsCards>
      </div>
    );
  };

  hideCars = () => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.showCars = false;
      return newState;
    });
  };

  showCars = () => {
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState.showCars = true;
      return newState;
    });
  };

  toggleShowButton = () => {
    if (this.state.showCars) {
      return (
        <button
          className="btn btn-info m-3"
          style={{ width: "100px", height: "50px" }}
          onClick={this.hideCars}
        >
          Hide
        </button>
      );
    }

    return (
      <button
        className="btn btn-primary m-3"
        style={{ width: "100px", height: "50px" }}
        onClick={this.showCars}
      >
        Show
      </button>
    );
  };

  yearSelection = (e) => {
    let curVal = e.currentTarget.value;

    if (parseInt(curVal) === 999) {
      let carsMappedArr = this.state.cars.map(this.mapCarCards);
      this.setState((prevState) => {
        let newState = { ...prevState };
        newState.mappedCarsForDisplay = carsMappedArr;
        return newState;
      });
    } else {
      let filterCars = (car) => {
        if (car.year === parseInt(curVal)) {
          return true;
        }
      };

      let filteredCarsArr = this.state.cars.filter(filterCars);
      let mappedFilteredCars = filteredCarsArr.map(this.mapCarCards);
      this.setState((prevState) => {
        let newState = { ...prevState };
        newState.mappedCarsForDisplay = mappedFilteredCars;
        return newState;
      });
    }
  };

  render() {
    console.log(this.state.mappedCarsForDisplay);
    return (
      <div className="col">
        <div className="row" style={{ height: "100px" }}>
          <div>{this.toggleShowButton()}</div>
          <select
            className="mt-3 mb-3 ml-5"
            style={{ width: "200px", height: "50px" }}
            onChange={this.yearSelection}
          >
            <option defaultValue value={999}>
              Show All
            </option>
            <option value={2018}>2018</option>
            <option value={2019}>2019</option>
            <option value={2020}>2020</option>
            <option value={2021}>2021</option>
          </select>
        </div>
        <div className="row flex">
          {this.state.showCars && this.state.mappedCarsForDisplay}
        </div>
      </div>
    );
  }
}

export default Cars;
