import React from "react";
import SingleCar from "./SingleCar";

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
    showCars: false,
  };

  componentDidMount() {
    this.setState(() => {
      return { mappedCars: this.state.cars.map(this.mapCar) };
    });
  }

  onShowClicked = (e) => {
    e.preventDefault();

    const showCars = this.state.showCars;

    this.setState(() => {
      return { showCars: !showCars };
    });
  };

  onChange = (e) => {
    e.preventDefault();

    let valueSelected = parseInt(e.target.value);
    let result = [];

    if (valueSelected === 1) {
      result = this.state.cars;
    } else {
      result = this.state.cars.filter((car) => car.year === valueSelected);
    }

    this.setState(() => {
      return { mappedCars: result.map(this.mapCar) };
    });
  };

  mapCar = (oneCar) => {
    return (
      <React.Fragment
        key={`Car-${Math.floor(Math.random() * Math.floor(1000))}`}
      >
        <SingleCar car={oneCar}></SingleCar>
      </React.Fragment>
    );
  };

  render() {
    const showCars = this.state.showCars;
    return (
      <div className="col-md-12 p-5">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.onShowClicked}
        >
          Show All
        </button>
        <select
          name="dropdown"
          onChange={this.onChange}
          style={{ marginLeft: 5 }}
        >
          <option value="1">Show All</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
        </select>
        {showCars ? <div className="row">{this.state.mappedCars}</div> : null}
      </div>
    );
  }
}

export default Cars;
