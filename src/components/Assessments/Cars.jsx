import React from "react";

class Cars extends React.Component {
  state = {
    cars: [
      { id: 11, make: "Kia", model: "Sorento", year: 2020 },
      { id: 10, make: "Kia", model: "Optima", year: 2019 },
      { id: 9, make: "Tesla", model: "Model 3", year: 2021 },
      { id: 8, make: "Honda", model: "Civic", year: 2019 },
      { id: 7, make: "Honda", model: "Accord", year: 2018 },
      { id: 6, make: "Volkswagen", model: "Jetta", year: 2021 },
      { id: 5, make: "Toyota", model: "Camry", year: 2021 },
      { id: 4, make: "Ford", model: "Mustang", year: 2019 },
      { id: 3, make: "Ford", model: "F-150", year: 2019 },
      { id: 2, make: "Toyota", model: "Camry", year: 2020 },
      {
        id: 1,
        make: "Ford",
        model: "F-150",
        year: 2021,
      },
    ],
  };
  componentDidMount() {}
  mapCar = (oneCar) => {
    return <p key={`Cars-${oneCar.id}`}>{oneCar.name}</p>;
  };

  mapCar = (oneCar) => {
    return (
      <React.Fragment>
        <div key={`Cars-${oneCar.id}`} className="card col-md-3 m-1">
          <div className="card-body">
            <h5 className="card-title">{oneCar.make}</h5>
            <h5 className="card-text">{oneCar.model}</h5>
            <h5 className="card-text">{oneCar.year}</h5>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="row">
        <div className="col">{this.state.cars.map(this.mapCar)}</div>
      </div>
    );
  }
}
export default Cars;
