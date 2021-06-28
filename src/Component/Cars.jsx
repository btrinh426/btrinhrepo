import React from "react";
import * as userService from "../services/userServices";

class Cars extends React.Component {
  state = {
    formData: {
      make: "",
      model: "",
      year: Number,
    },
  };

  carList = () => {
    const item = [
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
    ];

    return (
      <div className="cars">
        {item.map((car) => (
          <div className="car">
            {car.make} {car.model} {car.year}
          </div>
        ))}
      </div>
    );
  };

filterCars = () => {
    return (
        {carList({item})item.filter(item => item.includes('make')).map(filteredCar => (
            {filteredCar.make}
        ))}
    )
}

  render() {
    return (
      <div className="card col-md-3 m-1">
        <div className="card-body">
          <h5 className="card-title">{this.state.formData.make}</h5>
          <h5 className="card-text">{this.state.formData.model}</h5>
          <h5 className="card-text">{this.state.formData.year}</h5>
        </div>
      </div>
    );
  }
}
