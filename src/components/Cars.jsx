import React from "react";
import CarCard from "./CarCard";

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
    };
  }

  state = {
    mapCars: [],
  };

  componentDidMount() {
    this.setState((prevState) => {
      return { mapCars: prevState.cars.map(this.mapCars) };
    });
  }

  mapCars = (cars) => {
    console.log(cars);
    return <CarCard car={cars} key={cars} />;
  };

  onYearSelect = (year) => {
    this.state({ cars: this.state.cars.filter((car) => car.year === year) });
  };

  showCarsClicked = (cars) => {
    console.log(cars);
  };
  selectYrClicked = () => {};

  render() {
    return (
      <div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.showCarsClicked}
        >
          Show Cars
        </button>

        <div className="col-md-12 p-5">
          <div className="col">{this.state.mapCars}</div>
        </div>

        <div class="dropdown">
          <button
            class="btn btn-secondary btn-sm dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Select Year
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div className="dropdown-item">2019</div>
            <div className="dropdown-item">2020</div>
            <div className="dropdown-item">2021</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cars;
