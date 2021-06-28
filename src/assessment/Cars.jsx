import React from "react";
import CarCard from "./CarCard";

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

  handleShow = () => {
    this.setState({
      isActive: true,
    });
  };

  handleHide = () => {
    this.setState({
      isActive: false,
    });
  };

  mapCar = (car) => <CarCard key={car.id} car={car} />;

  //   filterCarsByYear = () => {
  //     let filteredCars = this.state.cars.filter(this.filterCar);
  //     this.setState({ cars: filteredCars });
  //   };

  //   filterCar = (car) => {
  //     let result = false;

  //     if (car.year === 2021) {
  //       result = car.year;

  //     return result;
  //   };

  filterCars = (e) => {
    e.preventDefault();
    let filteredCars = this.state.cars.filter((cars) => cars.year === 2021);
    this.setState({ cars: filteredCars });
  };

  render() {
    return (
      <div>
        <h1>Cars</h1>
        <button type="button" className="btn btn-primary">
          Show Cars
        </button>

        {/* The dropdown menu was throwing me off, so I put a test button on my page so I could see if anything I was doing could pontentially work. */}

        <button
          type="button"
          className="btn btn-primary"
          onClick={this.filterCars}
        >
          Filter Test
        </button>

        <select className="form-select" aria-label="Default select example">
          <option value="">Select Car Year</option>
          <option value="1">2021</option>
          <option value="2">2020</option>
          <option value="3">2019</option>
        </select>

        <div className="row">{this.state.cars.map(this.mapCar)}</div>
        {/* <div className="row">
          {this.state.cars.filter((cars) => cars.year === 2021)}
        </div> */}
      </div>
    );
  }
}

export default Cars;
