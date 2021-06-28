import React from "react";

import ShowOneCar from "./ShowOneCar";

class Cars extends React.Component {
  cars = [
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
  ];

  state = {
    cars: this.cars,

    displayedCars: [],

    isVisible: true,

    filterYear: 0,
    isFiltered: false,
  };

  componentDidMount = () => {
    this.giveIds();
    this.showCars();
  };

  giveIds = () => {
    this.setState((prevState) => {
      let uniqueIdCtr = 0;
      let retAr = [];
      retAr = prevState.cars.map(function (car) {
        car.id = uniqueIdCtr++;
        return car;
      });
      return { carsWithId: retAr };
    });
  };

  showCars() {
    if (!this.state.isFiltered) {
      this.setState((prevState) => {
        //   let mappedCars = prevState.cars.map(this.mapForDOM);
        let mappedCars = prevState.cars.map(this.mapForDOM);
        return { displayedCars: mappedCars };
      });
    } else {
      this.setState((prevState) => {
        //   let mappedCars = prevState.cars.map(this.mapForDOM);
        let mappedCars = prevState.displayedCars.map(this.mapForDOM);
        return { displayedCars: mappedCars };
      });
    }
  }

  displayCars(cars) {
    this.setState(() => {
      let mappedCars = cars.map(this.mapForDOM);
      return { displayedCars: mappedCars };
    });
  }

  mapForDOM = (car) => {
    if (this.state.isVisible) {
      return (
        <div className="card col-md-3 m-1" key={car.id}>
          <ShowOneCar car={car}></ShowOneCar>
        </div>
      );
    } else {
      return (
        <div className="card col-md-3 m-1 d-none" key={car.id}>
          <ShowOneCar car={car}></ShowOneCar>
        </div>
      );
    }
  };

  // JTG: on first click, does not hide cars but works fine after that
  onShow = (e) => {
    e.preventDefault();

    this.setState((prevState) => {
      let newIsVisible = prevState.isVisible ? false : true;
      return { isVisible: newIsVisible };
    }, this.showCars());
  };

  onYearSelected = (e) => {
    e.preventDefault();

    let currentTarget = e.currentTarget;
    let inputName = currentTarget.name;
    let inputValue = currentTarget.value;
    console.log(inputValue);

    let newCars = [...this.state.carsWithId]; // use full list of cars / may not need to copy
    let filteredCars = newCars.filter(function (car) {
      return car.year === +inputValue ? true : false;
    });

    // this.showCars(); // map for DOM
    this.displayCars(filteredCars); // map for DOM but with filteredCars

    this.setState(() => {
      let newState = {};
      newState[inputName] = inputValue;
      newState.isFiltered = true;
      // newState.cars = filteredCars;
      return { newState };
      //   return { inputName: inputValue, displayedCars: filteredCars };
    });
  };

  render = () => {
    return (
      <React.Fragment>
        <div className="row">
          <label className="col-sm-2 col-form-label">Select Year</label>
          <select
            className="form-select"
            id="select-year"
            name="year"
            value={this.state.filterYear}
            onChange={this.onYearSelected}
          >
            <option value="0" key="0"></option>
            <option value="2021" key="2021">
              2021
            </option>
            <option value="2020" key="2020">
              2020
            </option>
            <option value="2019" key="2019">
              2019
            </option>
          </select>
        </div>
        <div className="row">{this.state.displayedCars}</div>
        <footer>
          <button
            type="button"
            className="btn btn-primary"
            id="btn-show"
            onClick={this.onShow}
          >
            Show Cars
          </button>
        </footer>
      </React.Fragment>
    );
  };
}

export default Cars;
