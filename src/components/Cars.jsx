import React from "react";
import CarsMap from "./CarsMap";

class Cars extends React.Component {
  state = {
    on: false,
    carsArray: [
      { id: 1, make: "Kia", model: "Sorento", year: 2020 },
      { id: 2, make: "Kia", model: "Optima", year: 2019 },
      { id: 3, make: "Tesla", model: "Model 3", year: 2021 },
      { id: 4, make: "Honda", model: "Civic", year: 2019 },
      { id: 5, make: "Honda", model: "Accord", year: 2018 },
      { id: 6, make: "Volkswagen", model: "Jetta", year: 2021 },
      { id: 7, make: "Toyota", model: "Camry", year: 2021 },
      { id: 8, make: "Ford", model: "Mustang", year: 2019 },
      { id: 9, make: "Ford", model: "F-150", year: 2019 },
      { id: 10, make: "Toyota", model: "Camry", year: 2020 },
      { id: 11, make: "Ford", model: "F-150", year: 2021 },
    ],
  };

  showCarsButton = () => {
    console.log("Toggling cars");
    //This button should toggle content on page
    this.setState({
      on: !this.state.on,
    });
  };

  componentDidMount() {
    this.setState((prevState) => {
      return { mappedCars: prevState.carsArray.map(this.mapCars) };
    });
  }

  mapCars = (oneCar) => {
    return (
      <React.Fragment key={`CarId-${oneCar.id}`}>
        <CarsMap carsArray={oneCar} />
      </React.Fragment>
    );
  };

  //   filterCars = ()=>{

  //   }

  //Dropdown button isn't working, checked bootstrap
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.showCarsButton}
          >
            Show Cars
          </button>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Year
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button className="dropdown-item">2021</button>
              </li>
              <li>
                <button className="dropdown-item">2020</button>
              </li>
              <li>
                <button className="dropdown-item">2019</button>
              </li>
            </ul>
            <div>
              {this.state.on && (
                <div className="col">
                  <div className="row">{this.state.mappedCars}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cars;
