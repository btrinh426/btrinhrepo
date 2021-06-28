import React, { Component } from "react";
import CarsSearch from "./CarsSearch";
import CarsFilter from "./CarsFilter";

class CarsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

      searchTerm: "",
      showCars: false,
    };
  }

  handleInput = (e) => {
    console.log(e.target.value);
    this.setState({ searchTerm: e.target.value });
  };

  onShowCarsClick = (e) => {
    e.preventDefault();
    this.setState({ showCars: true });
  };

  onHideCarsClick = (e) => {
    e.preventDefault();
    this.setState({ showCars: false });
  };

  render() {
    let filteredCars = this.state.cars;
    if (this.state.searchTerm) {
      filteredCars = this.state.cars.filter((car) => {
        //return JSON.stringify(car).includes(this.state.searchTerm);
        return car.year.toString().includes(this.state.searchTerm);
      });
    }
    return (
      <div className="card col-md-3 m-1">
        <CarsSearch handleInput={this.handleInput}> </CarsSearch>
        <button
          id="showCars"
          className="btn btn-primary edit"
          onClick={this.onShowCarsClick}
          href="button"
        >
          {" "}
          Show Cars
        </button>
        <button
          id="hideCars"
          className="btn btn-primary delete"
          onClick={this.onHideCarsClick}
          href="button"
        >
          Hide Cars
        </button>
        {this.state.showCars && (
          <CarsFilter filteredCars={filteredCars}></CarsFilter>
        )}
      </div>
    );
  }
}

export default CarsPage;
