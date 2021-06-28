import React from "react";
import CarsCard from "./CarsCard";
import { Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [
        {
          make: "Kia",
          model: "Sorento",
          year: 2020,
          vin: 1,
        },
        {
          make: "Kia",
          model: "Optima",
          year: 2019,
          vin: 2,
        },
        {
          make: "Tesla",
          model: "Model 3",
          year: 2021,
          vin: 3,
        },
        {
          make: "Honda",
          model: "Civic",
          year: 2019,
          vin: 4,
        },
        {
          make: "Honda",
          model: "Accord",
          year: 2018,
          vin: 5,
        },
        {
          make: "Volkswagen",
          model: "Jetta",
          year: 2021,
          vin: 6,
        },
        {
          make: "Toyota",
          model: "Camry",
          year: 2021,
          vin: 7,
        },
        {
          make: "Ford",
          model: "Mustang",
          year: 2019,
          vin: 8,
        },
        {
          make: "Ford",
          model: "F-150",
          year: 2019,
          vin: 9,
        },
        {
          make: "Toyota",
          model: "Camry",
          year: 2020,
          vin: 10,
        },
        {
          make: "Ford",
          model: "F-150",
          year: 2021,
          vin: 11,
        },
      ],
      mappedCars: [],
    };
  }

  componentDidMount() {
    this.renderCars();
  }

  renderCars = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        mappedCars: prevState.cars.map(this.mapCar),
      };
    });
  };

  onShowCars = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showCards: !prevState.showCards,
        mappedCars: prevState.cars.map(this.mapCar),
      };
    });
  };

  filterCar = (year) => {
    console.log("i clicked");
    let carYear = year.value;
    let modelYear = [...this.state.cars].filter((car) => {
      return this.getCarsByYear(car, carYear);
    });

    modelYear = modelYear.map(this.mapCar);
    this.setState((prevState) => {
      return {
        ...prevState,
        mappedCars: modelYear,
      };
    });
  };

  getCarsByYear = (car, carYear) => {
    return car.year == carYear;
  };

  mapCar = (car) => {
    return (
      <>
        <CarsCard
          car={car}
          key={`${car.vin}+${car.model}`} /*handleFilter={this.handleFilter}*/
        />
      </>
    );
  };

  // filteredCars = () => {
  //   this.setState((prevState) => {
  //     return {
  //       ...prevState,
  //       filteredCars: prevState.cars.filter(this.filterCar),
  //     };
  //   });
  // };

  // filteredCars = () => {
  //   this.renderCars.filter(this.filterCarByYear);
  // };

  // filterCarByYear = (car) => {
  //   let result = false;

  //   if (car.make === "") {
  //     if (car.make && car.make.indexOf(2021) >= 0) {
  //       result = true;
  //     }
  //   }
  //   return result;
  // };

  // onFilter21Clicked = (prevState, props) => {
  //   prevState.handleFilter(props.car.year);
  // };

  render() {
    return (
      <>
        <div>
          <Dropdown
            placeholder="Select an option"
            className="my-className"
            options={["2019", "2020", "2021"]}
            value="one"
            onChange={(value) => console.log("change!", value)}
            onSelect={(value) => this.filterCar(value)} // always fires once a selection happens even if there is no change
          />
          <button className="btn btn-outline-dark" onClick={this.onShowCars}>
            toggle off
          </button>
        </div>

        {this.state.mappedCars.length > 0
          ? this.state.mappedCars
          : "No records found"}
      </>
    );
  }
}

export default Cars;
