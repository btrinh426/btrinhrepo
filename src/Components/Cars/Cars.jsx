import React from "react";

class Cars extends React.Component {
  state = {
    currentCars: [
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
    showCars: [],
    year: "",
  };

  mapCars = (oneCar) => {
    return (
      <div className="card col-md-3 m-1">
        <div className="card-body">
          <h5 className="card-title">{oneCar.make}</h5>
          <h5 className="card-text">{oneCar.model}</h5>
          <h5 className="card-text">{oneCar.year}</h5>
        </div>
      </div>
    );
  };

  onShowCars = () => {
    this.setState(() => {
      let showCars = { ...this.state.showCars };
      showCars = this.state.currentCars.map(this.mapCars);
      return { showCars };
    });
  };
  onHideCars = () => {
    this.setState((prevState) => {
      let showCars = { ...prevState.showCars };
      showCars = null;
      return { showCars };
    });
  };
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    this.setState({ year: newValue });
    console.log(newValue);
    //    let currentTarget = e.currentTarget;
    //    let newValue = currentTarget.value;
    //    let inputName = currentTarget.name;
    //    this.setState(() => {
    //      let year = { ...this.state.year };
    //      year[inputName] = newValue;
    //      return year;
    //    });
    //  this.filteredCar();
  };
  filteredCar = () => {
    this.state.currentCars
      .filter(this.state.currentCar.year.includes(this.state.year))
      .map((filteredCar) => ({ filteredCar }));
  };
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            marginLeft: "7rem",
            padding: "7rem",
          }}
        >
          <div className="container">
            <div className="col-md-12 p-4">
              <h1>Available Cars</h1>
              <button
                className="btn btn-light btn-outline-secondary"
                onClick={
                  this.state.showCars ? this.onHideCars : this.onShowCars
                }
              >
                Show/Hide Cars
              </button>
              <div
                style={{
                  marginLeft: "2rem",
                  padding: "2rem",
                }}
              ></div>
              <div className="form-group">
                <select
                  id="year"
                  name="year"
                  className="form-group col-md-4"
                  onChange={this.onFormFieldChanged}
                  value={this.state.year}
                >
                  <option value="">Select Year</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                </select>
              </div>
              <div className="row">{this.state.showCars}</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Cars;
