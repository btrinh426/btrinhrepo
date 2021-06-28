import React from "react";
import CarsMapped from "./CarsMapped";

class Cars extends React.Component {
  state = {
    carList: [
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

  onShowAllClick = (e) => {
    e.stopPropagation();
    console.log("show all clicked");
    this.mapCars();
  };

  renderCars = (aCar) => {
    return <CarsMapped car={aCar} />;
  };

  mapCars = () => {
    this.setState = () => {
      var cars = {
        carsMapped: this.state.carList.map(this.renderCars),
      };
      return cars;
    };
  };

  //   mapCars = () => {
  //     var cars = {
  //       carsMapped: this.state.carList.map(this.renderCars),
  //     };
  //     return cars;
  //   };

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.onShowAllClick}
        >
          Show All
        </button>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Car Year
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item">2021</a>
            <a className="dropdown-item">2020</a>
            <a className="dropdown-item">2019</a>
          </div>
        </div>
        <div className="card col-md-3 m-1">{this.state.carsMapped}</div>;
      </React.Fragment>
    );
  }
}

export default Cars;
