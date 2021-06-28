import React, { Component } from "react";
import OneCar from "./OneCar";

class Cars extends Component {
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
    mappedCars: [],
  };

  // let carArr = { ...this.state.cars };
  //   componentDidUpdate() {
  //     let carArr = { ...this.state.cars };
  //     this.setState((prevState) => {
  //       return {
  //         ...prevState,
  //         carArr,
  //         mappedCars: carArr.map(this.mapCar),
  //       };
  //     });
  //   }
  //   componentDidMount() {}

  //   carMapping = () => {
  //     let carArr = this.state.cars;
  //     this.setState((prevState) => {
  //       return {
  //         ...prevState,
  //         carArr,
  //         mappedCars: carArr.map(this.mapCar),
  //       };
  //     });
  //   };

  handleClick = (e) => {
    //let cars = {...this.state.cars}
    e.preventDefault();
    this.setState((prevState) => {
      return {
        prevState,
        mappedCars: this.state.cars.map(this.mapCar),
      };
    });
    // if () {
    //   this.setState((prevState) => {
    //     return {
    //       prevState,
    //       mappedCars: this.state.cars.map(this.mapCar),
    //     };
    //   });
    // } else if () {
    //   this.setState((prevState) => {
    //     return { prevState, mappedCars: [] };
    //   });
    // }
  };

  removeCars = (e) => {
    //let removeCar = { ...this.state.mappedCars };
    e.preventDefault();
    this.setState((prevState) => {
      return { prevState, mappedCars: [] };
    });
  };

  filterCarOne = (car) => {
    let result = false;
    if (car.year === 2019) {
      result = true;
    }
    return result;
  };

  filterCarTwo = (car) => {
    let result = false;
    if (car.year === 2020) {
      result = true;
    }
    return result;
  };
  filterCarThree = (car) => {
    let result = false;
    if (car.year === 2021) {
      result = true;
    }
    return result;
  };

  carsFiltered = this.state.cars.filter(this.filterCarOne);
  carsFilteredTwo = this.state.cars.filter(this.filterCarTwo);
  carsFilteredThree = this.state.cars.filter(this.filterCarThree);
  show2019 = () => {
    //let cars = { ...this.state.cars };
    //let filterCar = this.filterCarOne();
    this.setState((prevState) => {
      return {
        prevState,
        mappedCars: this.carsFiltered.map(this.mapCar),
      };
    });
  };
  show2020 = () => {
    this.setState((prevState) => {
      return {
        prevState,
        mappedCars: this.carsFilteredTwo.map(this.mapCar),
      };
    });
  };
  show2021 = () => {
    this.setState((prevState) => {
      return {
        prevState,
        mappedCars: this.carsFilteredThree.map(this.mapCar),
      };
    });
  };

  mapCar = (car) => {
    return (
      <OneCar
        //key={car.year + 1}
        car={car}
      />
    );
  };

  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-outline-success showCars"
          type="submit"
          onClick={this.handleClick}
        >
          Show Cars
        </button>
        <button
          className="btn btn-outline-success showCars"
          type="submit"
          onClick={this.removeCars}
        >
          Hide Cars
        </button>
        <button
          className="btn btn-outline-success show2019"
          type="submit"
          onClick={this.show2019}
        >
          2019
        </button>
        <button
          className="btn btn-outline-success show2020"
          type="submit"
          onClick={this.show2020}
        >
          2020
        </button>
        <button
          className="btn btn-outline-success show2021"
          type="submit"
          onClick={this.show2021}
        >
          2021
        </button>
        {/* <select className="col-sm-10 custom-select" id="dropDown">
          <option selected={""}>select</option>
          <option value="1" onChange={this.show2019}>
            2019
          </option>
          <option value="2">2020</option>
          <option value="3">2021</option>
        </select> */}
        <div>{this.state.mappedCars}</div>
      </React.Fragment>
    );
  }
}

export default Cars;
