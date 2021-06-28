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

  onShowCarsClicked = (e) => {};

  onHideCarsClicked = (e) => {};

  onSelectFieldChanged = (e) => {
    let inputName = e.currentTarget;
    let newValue = e.currentTarget.value;
    console.log("inputName", inputName, "newValue", newValue);

    this.setState(() => {
      let cars = { ...this.state.cars };
      cars[inputName] = newValue;

      return cars;
    });
  };

  onYearClicked = (e) => {
    console.log(this.state.cars);

    let result = this.state.cars.filter((car) => (car.year = "2021"));

    return { cars: result };
  };

  mapCar = (oneCar) => {
    return (
      <React.Fragment key={`Cars-${oneCar.id}`}>
        <SingleCar {...this.props} car={oneCar}></SingleCar>
      </React.Fragment>
    );
  };

  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <button type="button" className="btn btn-primary">
                Show Cars
              </button>
              <button type="button" className="btn btn-success">
                Hide Cars
              </button>
              <select
                className="form-select"
                name="year"
                value={this.state.cars.year}
                onChange={this.onSelectFieldChanged}
              >
                <option value="">Show All</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
              {this.state.cars.map(this.mapCar)}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Cars;
