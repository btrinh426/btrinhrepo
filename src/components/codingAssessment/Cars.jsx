import React from "react";
import CarsCard from "./CarsCard";

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
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
    };
  }

  toggleHidden = (e) => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  };

  handleCarChange = (e) => {
    const carYear = parseInt(e.currentTarget.value);
    console.log(carYear);

    this.setState((prevState) => {
      const cars = [...prevState.cars];
      const filteredCars = cars.filter((car) => car.year === carYear);
      return { ...prevState, cars: filteredCars };
    });
  };

  render() {
    return (
      <div style={{ margin: "30px" }}>
        <button
          type="button"
          className="btn btn-primary"
          style={{ margin: "10px" }}
          onClick={this.toggleHidden}
        >
          Toggle to Show/Hide Cars
        </button>

        <select
          className="form-select form-select-lg mb-3"
          value={this.state.cars.year}
          onChange={this.handleCarChange}
        >
          <option value="">Choose a Car Year</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>

        <div>
          {" "}
          {!this.state.isHidden &&
            this.state.cars.map((car) => (
              <CarsCard key={`${car.model}-${car.year}`} cars={car} />
            ))}
        </div>
      </div>
    );
  }
}

export default Cars;
