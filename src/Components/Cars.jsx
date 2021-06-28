import React from "react";

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      showCars: true,
      carYear: null,
    };
  }
  onShowCarsButtonClick() {
    this.setState({
      showCars: !this.state.showCars,
    });
  }

  onCarYearButtonClick(e) {
    if (e.currentTarget.innerHTML === "All Car Years") {
      this.setState({
        carYear: null,
      });
    } else {
      this.setState({
        carYear: parseInt(e.currentTarget.innerHTML),
      });
    }
  }

  render() {
    const filteredCars = this.state.cars.filter((car) => {
      if (!this.state.carYear) {
        return true;
      }
      return car.year === this.state.carYear;
    });

    const carCards = filteredCars.map((car, i) => {
      return (
        <div key={i} className="card col-md-3 m-1">
          <div className="card-body">
            <h5 className="card-title">{car.make}</h5>
            <h5 className="card-text">{car.model}</h5>
            <h5 className="card-text">{car.year}</h5>
          </div>
        </div>
      );
    });

    return (
      <React.Fragment>
        <div>
          <h5>What year are you looking for?</h5>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onCarYearButtonClick.bind(this)}
          >
            2019
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onCarYearButtonClick.bind(this)}
          >
            2020
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onCarYearButtonClick.bind(this)}
          >
            2021
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onCarYearButtonClick.bind(this)}
          >
            All Cars
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onShowCarsButtonClick.bind(this)}
          >
            {this.state.showCards ? "Hide" : "Show"} Cars
          </button>
          <div className="card-group">
            {this.state.showCards ? carCards : ""}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cars;
