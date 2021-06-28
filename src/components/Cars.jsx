import React from "react";

class Car extends React.Component {
  state = {
    vehicles: [
      {
        make: "Kia",
        model: "Sorento",
        year: 2020,
        id: 0,
      },
      {
        make: "Kia",
        model: "Optima",
        year: 2019,
        id: 1,
      },
      {
        make: "Tesla",
        model: "Model 3",
        year: 2021,
        id: 2,
      },
      {
        make: "Honda",
        model: "Civic",
        year: 2019,
        id: 3,
      },
      {
        make: "Honda",
        model: "Accord",
        year: 2018,
        id: 4,
      },
      {
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
        id: 5,
      },
      {
        make: "Toyota",
        model: "Camry",
        year: 2021,
        id: 6,
      },
      {
        make: "Ford",
        model: "Mustang",
        year: 2019,
        id: 7,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2019,
        id: 8,
      },
      {
        make: "Toyota",
        model: "Camry",
        year: 2020,
        id: 9,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2021,
        id: 10,
      },
    ],
    toShow: false,
    selected: [],
  };

  mapCars = (car) => {
    return (
      <div
        className={
          this.state.toShow ? "card col-md-3 m-1" : "card col-md-3 m-1 d-none"
        }
        key={car.id}
      >
        <div className="card-body">
          <h5 className="card-title">{car.make}</h5>
          <h5 className="card-text">{car.model}</h5>
          <h5 className="card-text">{car.year}</h5>
        </div>
      </div>
    );
  };

  HideShowCars = () => {
    this.setState({ toShow: !this.state.toShow });
  };

  selectYear = (e) => {
    console.log(e.target.value);
    const yearValue = Number(e.target.value);
    const copyOfVehicles = [...this.state.vehicles];
    const filteredCars = copyOfVehicles.filter((car) => car.year === yearValue);
    this.setState({ yearState: yearValue, selected: filteredCars });
  };

  render() {
    const copyOfFilterd = [...this.state.selected];
    return (
      <div>
        <input
          type="button"
          className="btn btn-primary"
          value="Show Cars"
          onClick={this.HideShowCars}
        />
        <select name="cars" onChange={this.selectYear}>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
        {copyOfFilterd.map(this.mapCars)}
      </div>
    );
  }
}

export default Car;
