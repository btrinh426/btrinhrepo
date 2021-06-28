import React from "react";

class renderCars extends React.Component {
  state = {
    carsArray: [
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
  componentDidMount() {}

  mapCars = (Car) => {
    return (
      <div className="card col-md-3 m-1">
        <div className="card-body">
          <h5 className="card-title">{Car.make}</h5>
          <h5 className="card-text">{Car.model}</h5>
          <h5 className="card-text">{Car.year}</h5>
        </div>
      </div>
    );
  };
  onFilterCars = () => {
    // carsArray.filter(cars => carsArray.year < 2019).map(filteredCars => (
    //   <li>
    //     {filteredCars.years}
    //   </li>
  };

  render() {
    return (
      <main role="main">
        <div className="Cars">
          <div className="container">
            <div className="row"></div>
            <div className="col-md-12 p-5"></div>
            <h1>
              <button
                href="#"
                className="btn btn-primary md-3"
                onClick={this.onFilterCars}
              >
                Show Cars
              </button>
            </h1>
            <div className="col">
              <select class="form-select" aria-label="Default select example">
                <option selected>Show All</option>
                <option value="1">2019</option>
                <option value="2">2020</option>
                <option value="3">2021</option>
              </select>
            </div>
            <div className="row">{this.state.carsArray.map(this.mapCars)}</div>
          </div>
        </div>
      </main>
    );
  }
}
export default renderCars;
