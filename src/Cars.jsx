import React from "react";
import SingleCar from "./SingleCar";

class Cars extends React.Component {
  state = {
    cars: [
      {
        make: "Kia",
        model: "Sorento",
        year: 2020,
        id: 1,
      },
      {
        make: "Kia",
        model: "Optima",
        year: 2019,
        id: 2,
      },
      {
        make: "Tesla",
        model: "Model 3",
        year: 2021,
        id: 3,
      },
      {
        make: "Honda",
        model: "Civic",
        year: 2019,
        id: 4,
      },
      {
        make: "Honda",
        model: "Accord",
        year: 2018,
        id: 5,
      },
      {
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
        id: 6,
      },
      {
        make: "Toyota",
        model: "Camry",
        year: 2021,
        id: 7,
      },
      {
        make: "Ford",
        model: "Mustang",
        year: 2019,
        id: 8,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2019,
        id: 9,
      },
      {
        make: "Toyota",
        model: "Camry",
        year: 2020,
        id: 10,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2021,
        id: 11,
      },
    ],
  };

  mapCars = (car) => {
    return <SingleCar key={`Cars-${car.id}`} car={car} />;
  };

  hideCarsClick = () => {
    this.props.history.push("/cars/hide");
  };

  onSelectCarChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let carsByYear = { ...this.state.cars.year };

      carsByYear[inputName] = newValue;

      return { carsByYear };
    });
  };
  const;

  //   filterCars = (e) => {
  //     if (e.year === "") {
  //     }
  //     let query = new Query();
  //     query = this.state.cars.filter();
  //   };

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Cars</h1>
        </div>
        <div>
          <button
            className="bt bt-outline-primary bt-sm"
            type="button"
            onClick={this.hideCarsClick}
          >
            Show Cars
          </button>
          <select
            name="year"
            className="form-select"
            value={this.state.cars.year}
            onChange={this.onSelectCarChange}
            aria-label="Default select example"
            // allowFiltering={true}
            // filtering={(this.filterCars = this.onFiltering.bind(this))}
            // query={this.query}
          >
            <option value="selected">Show All</option>
            <option value="1">2019</option>
            <option value="2">2020</option>
            <option value="3">2021</option>
          </select>
        </div>
        <div>{this.state.cars.map(this.mapCars)}</div>
      </React.Fragment>
    );
  }
}

export default Cars;
