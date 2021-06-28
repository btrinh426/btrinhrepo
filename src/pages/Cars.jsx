import React, { Component } from "react";

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

    toggle: true,
  };

  handleChange = (e) => {
    let stateCars = [...this.state.cars];
    let selectVal = e.target.value;

    let newCars = stateCars.filter((car) => car.year === parseInt(selectVal));
    this.setState({ cars: newCars });
  };

  mapState = () => {
    return this.state.cars.map((car, i) => {
      return (
        <div key={i} className="card col-md-3 m-1">
          <div className="card-body">
            <h5 className="card-title">{car.make}</h5>
            <h5 className="card-text">{car.model}</h5>
            <h5 className="card-text">{car.year}</h5>
          </div>
        </div>
      );
    });
  };

  toggleCars = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    return (
      <div className="cars">
        <button onClick={this.toggleCars}>Show Cars</button>

        <div>
          <label htmlFor="cars">Choose a car:</label>

          <select name="year" onChange={this.handleChange}>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>

        <div>{this.state.toggle ? this.mapState() : null}</div>
      </div>
    );
  }
}

export default Cars;
