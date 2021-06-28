import React from "react";
import CarsCard from "./CarsCard";

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [
        {
          make: "Kia",
          model: "Sorento",
          year: 2020,
          vin: 1,
        },
        {
          make: "Kia",
          model: "Optima",
          year: 2019,
          vin: 2,
        },
        {
          make: "Tesla",
          model: "Model 3",
          year: 2021,
          vin: 3,
        },
        {
          make: "Honda",
          model: "Civic",
          year: 2019,
          vin: 4,
        },
        {
          make: "Honda",
          model: "Accord",
          year: 2018,
          vin: 5,
        },
        {
          make: "Volkswagen",
          model: "Jetta",
          year: 2021,
          vin: 6,
        },
        {
          make: "Toyota",
          model: "Camry",
          year: 2021,
          vin: 7,
        },
        {
          make: "Ford",
          model: "Mustang",
          year: 2019,
          vin: 8,
        },
        {
          make: "Ford",
          model: "F-150",
          year: 2019,
          vin: 9,
        },
        {
          make: "Toyota",
          model: "Camry",
          year: 2020,
          vin: 10,
        },
        {
          make: "Ford",
          model: "F-150",
          year: 2021,
          vin: 11,
        },
      ],
      mappedCars: [],
    };
  }

  componentDidMount() {
    this.renderCars();
  }

  renderCars = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        mappedCars: prevState.cars.map(this.mapCar),
      };
    });
  };

  mapCar = (car) => (
    <CarsCard car={car} key={car.vin} handleDelete={this.handleDelete} />
  );

  handleDelete = (vin) => {
    console.log(vin);
  };

  render() {
    return (
      <>
        {this.state.mappedCars.length > 0
          ? this.state.mappedCars
          : "No records found"}
      </>
    );
  }
}

export default Cars;
