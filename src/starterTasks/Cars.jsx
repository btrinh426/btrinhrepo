import React from "react";
import CarCard from "./CarCard";
import { Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";

class CarsAssessment extends React.Component {
  state = {
    hideCards: true,

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
    carCards: [],
  };

  showCarsButton = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        hideCards: !prevState.hideCards,
        carCards: prevState.cars.map(this.carMap),
      };
    });
  };

  carMap = (car) => {
    return <CarCard car={car} key={`${car.make}-${car.model}-${car.year}`} />;
  };

  onYearClicked = (year) => {
    const yr = year.value;
    console.log(yr);
    let carYears = [...this.state.cars].filter((car) => {
      return this.carsByYear(car, yr);
    });
    carYears = carYears.map(this.carMap);
    console.log(carYears);
    this.setState((prevState) => {
      return {
        ...prevState,
        carCards: carYears,
      };
    });
  };

  carsByYear = (car, yr) => {
    return car.year == yr;
  };

  //   filterYears = (year) => {
  //     if (!this.state.uniqueYears.some(year)) {
  //       this.setState((prevState) => {
  //         return {
  //           ...prevState,
  //           uniqueYears: [...prevState.uniqueYears, year],
  //         };
  //       });
  //     }
  //   };

  render() {
    // const filteredYears = this.state.cars.filter(this.filterYears);
    return (
      <>
        <button
          onClick={this.showCarsButton}
          type="button"
          className="btn btn-secondary"
        >
          Show Cars
        </button>
        <Dropdown
          placeholder="Select an option"
          className="my-className"
          options={["2019", "2020", "2021"]}
          value="one"
          onChange={(value) => console.log("change!", value)}
          onSelect={(value) => this.onYearClicked(value)} // always fires once a selection happens even if there is no change
        />
        {this.state.hideCards ||
          // filteredYears.map((car) => {
          this.state.carCards}
        ;
        {/* <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item"></a>
            </li>
            );
          </ul>
        </div> */}
      </>
    );
  }
}

export default CarsAssessment;
