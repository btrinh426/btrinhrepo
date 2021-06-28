import React from "react";
import CarCards from "./CarCards";

class Cars extends React.Component {
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
      mappedCars: [],
      filterYear: 0,
    };
  }

  componentDidMount() {
    this.createCarCards();
  }

  createCarCards = () => {
    let cars = [...this.state.cars];

    console.log(cars);
    this.setState({ mappedCars: cars.map(this.mapCars) });
  };

  mapCars = (cars) => {
    // I know that I'm missing the Key, but not sure where
    // to get it or if I should create it myself
    return <CarCards cars={cars} key={Math.random()}></CarCards>;
  };

  onShowCarsClicked = (e) => {
    console.log("show was clicked", e);
    if (this.state.mappedCars.length > 0) {
      this.setState({ mappedCars: [] });
    } else {
      this.createCarCards();
    }
  };

  onFilterByYear = (e) => {
    console.log("filter activated", e);

    this.setState({ filterYear: parseInt(e.currentTarget.value) });

    let filterYearCopy = this.state.filterYear;
    let carsCopy = [...this.state.cars];

    let newCars = carsCopy.filter((car) => car.year === filterYearCopy);

    console.log("fy Copy", filterYearCopy);
    console.log(newCars);

    if (this.state.filterYear > 0) {
      console.log("newCars Array greater than 0", newCars.length);
      this.setState({ mappedCars: newCars.map(this.mapCars) });
    } else {
      this.createCarCards();
    }
  };

  render() {
    return (
      <div>
        {/* Create a button called show */}
        <h1>This is the Cars Page</h1>

        {/* Create a button called Show Cars that upon clicking on it will hide or show the list of cars. */}
        <button
          type="button"
          className="btn btn-primary m-2"
          name="showCars"
          onClick={this.onShowCarsClicked}
        >
          Show Cars
        </button>

        <br />

        {/* Create a < select > tag (dropdown box) with options 2021, 2020, 2019 that upon */}
        <select
          className="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          onChange={this.onFilterByYear}
          value={this.state.filterYear}
        >
          <option value={0}>Filter by Year</option>
          <option value={2021}>2021</option>
          <option value={2020}>2020</option>
          <option value={2019}>2019</option>
        </select>

        <br />
        {this.state.mappedCars}
      </div>
    );
  }
}
export default Cars;
