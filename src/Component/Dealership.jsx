import React from "react";
import Car from "./Car";
import Dropdown from "bootstrap";

class Dealership extends React.Component {
  state = {
    year: "",
    display: true,
  };

  handleChange = (e) => {
    e.preventDefault();

    const newValue = e.currentTarget.value;

    console.log(newValue, "handle change firing.");

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
        display: !this.state.display,
      };
    });
  };

  render() {
    const items = [
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

    const carYear = items.filter((item) => {
      if (this.state.display === false) {
        return false;
      }
      if (this.state.year === item.year.toString() || this.state.year === "") {
        return true;
      }
      return false;
    });

    const cars = carYear.map((item, index) => (
      <Car key={index} make={item.make} model={item.model} year={item.year} />
    ));

    return (
      <div>
        {cars}
        <select
          className="custom-select"
          id="inputGroupSelect01"
          onChange={this.handleChange}
        >
          <option value="">Choose year</option>
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
    );
  }
}

export default Dealership;
