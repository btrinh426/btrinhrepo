import React from "react";
import Car from "../Assessment/Car";

class Showroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [
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
      year: "",
      display: true,
    };
  }

  carYear = () => {
    this.state.vehicles.filter((car) => {
      if (this.state.display === false) {
        return false;
      }
      if (this.state.year === car.year.toString() || this.state.year === "") {
        return true;
      }
      return false;
    });
  };

  mappedCars = () => {
    this.carYear.map((car, index) => (
      <Car key={index} make={car.make} model={car.model} year={car.year} />
    ));
  };

  handleChange = (e) => {
    e.preventDefault();

    const newValue = e.currentTarget.value;

    console.log(newValue, "handleChange fx firing");

    this.setState(() => {
      return {
        year: newValue,
      };
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log("showing all cars");

    this.setState(() => {
      return {
        return: !this.state.display,
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <label>
          <h1>React Mapping Assessment</h1>
        </label>

        <div>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            onChange={this.handleChange}
          >
            <option defaultValue="">Choose year</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleClick}
          >
            Show Cars
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Showroom;
