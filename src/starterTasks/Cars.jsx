import React from "react";
import CarCard from "./CarCard";

class CarsAssessment extends React.Component {
  state = {
    hideCards: true,
    uniqueYears: [],
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
  };

  showCarsButton = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        hideCards: !prevState.hideCards,
      };
    });
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
        {this.state.hideCards ||
          // filteredYears.map((car) => {
          this.state.cars.map((car) => {
            return (
              <CarCard car={car} key={`${car.make}-${car.model}-${car.year}`} />
            );
          })}

        <button
          onClick={this.showCarsButton}
          type="button"
          className="btn btn-secondary"
        >
          Show Cars
        </button>
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
            {this.state.cars.map((car) => {
              return (
                <li>
                  <a className="dropdown-item" key={car.year}>
                    {car.year}
                  </a>
                </li>
              );
            })}
          </ul>
        </div> */}
      </>
    );
  }
}

export default CarsAssessment;
