import React from "react";
import { render } from "react-dom";
import SingleCar from "./SingleCar";

class Cars extends React.Component {
  state = {
    cars: [
      {
        // id: 0,
        make: "Kia",
        model: "Sorento",
        year: 2020,
      },
      {
        // id: 1,
        make: "Kia",
        model: "Optima",
        year: 2019,
      },
      {
        // id: 2,
        make: "Tesla",
        model: "Model 3",
        year: 2021,
      },
      {
        // id: 3,
        make: "Honda",
        model: "Civic",
        year: 2019,
      },
      {
        // id: 4,
        make: "Honda",
        model: "Accord",
        year: 2018,
      },
      {
        // id: 5,
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
      },
      {
        // id: 6,
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
        // id: 7,
        make: "Ford",
        model: "F-150",
        year: 2019,
      },
      {
        // id: 8,
        make: "Toyota",
        model: "Camry",
        year: 2020,
      },
      {
        // id: 9,
        make: "Ford",
        model: "F-150",
        year: 2021,
      },
    ],
    toggle: true,
  };

  componentDidMount() {
    this.setState((prevState) => {
      return { mappedCars: prevState.cars.map(this.mapCar) };
    });
  }

  mapCar = (oneCar) => {
    return (
      <React.Fragment key={`Cars-${oneCar}`}>
        <SingleCar
          {...this.props}
          cars={oneCar}
          onShowCarsRequested={this.onShowCarsClicked}
        ></SingleCar>
      </React.Fragment>
    );
  };

  //-----Select by year Click handler(s)-----

  handleChange = (e) => {
    let stateCars = [...this.state.cars];
    let selectVal = e.target.value;

    let newCars = stateCars.filter(
      (oneCar) => oneCar.year === parseInt(selectVal)
    );
    this.setState({ cars: newCars });
  };

  mapState = () => {
    return this.state.cars.map((oneCar, i) => {
      return (
        <div key={i} className="card col-md-3 m-1">
          <div className="card-body">
            <h5 className="card-title">{oneCar.make}</h5>
            <h5 className="card-text">{oneCar.model}</h5>
            <h5 className="card-text">{oneCar.year}</h5>
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
      <div className="col-md-12 p-5">
        <h1>Cars</h1>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.toggleCars}
        >
          Show Cars
        </button>
        <hr />
        <select
          name="year"
          onChange={this.handleChange}
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
        >
          <option selected>Open this select menu</option>
          <option value="2021" onClick={this.state.toggle}>
            2021
          </option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
        </select>
        <div className="row">{this.state.toggle ? this.mapState() : null}</div>
      </div>
    );
  }
}
export default Cars;
