import React from "react";

class Cars extends React.Component {
  state = {
    selectedYear: "",
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

  ShowCars(event) {
    event.preventDefault();
  }

  mapCars = (oneCar) => {
    const { selectedYear } = this.state;

    if (selectedYear !== "" && JSON.stringify(oneCar.year) !== selectedYear) {
      return null;
    }

    return (
      <div key={`en-${oneCar.id}`} className="card col-md-3 m-1">
        <div className="card-body">
          <h5 className="card-make">{oneCar.make}</h5>
          <h5 className="card-model">{oneCar.model}</h5>
          <h5 className="card-year">{oneCar.year}</h5>
        </div>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div>""</div>
        <div>""</div>
        <div>""</div>

        <button onClick={this.ShowCars} href="#" className="btn btn-primary">
          ShowCars
        </button>

        <select
          onChange={(e) => this.setState({ selectedYear: e.target.value })}
        >
          <option value="Show All">Show All</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>

        {this.state.cars.map(this.mapCars)}
      </React.Fragment>
    );
  }
}

export default Cars;
