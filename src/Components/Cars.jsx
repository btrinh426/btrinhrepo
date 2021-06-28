import React, { Component } from "react";
import CarCard from "./CarCard";

class Cars extends Component {
  state = {
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
    displayCards: false,
    mappedCars: [],
  };

  componentDidMount() {
    console.log("mounted!");
    this.renderCars();
  }

  onShowCars = () => {
    console.log("showCars clicked");

    this.setState({ displayCards: !this.state.displayCards });
  };

  renderCars = () => {
    const cars = this.state.cars;

    this.setState(() => {
      return {
        mappedCars: cars.map(this.mapCar),
      };
    });
  };

  mapCar = (car, i) => {
    return <CarCard key={`Car-${i}`} car={car}></CarCard>;
  };

  onDropdownChange = (e) => {
    console.log("dropdown", e.currentTarget.value);
    if (e.currentTarget.value === "All") {
      this.setState(() => {
        return {
          mappedCars: this.state.cars.map(this.mapCar),
        };
      });
    } else {
      const targetYear = +e.currentTarget.value;
      const filteredCarArray = this.state.cars.filter((car) =>
        this.filterCarsByYear(car, targetYear)
      );
      console.log(filteredCarArray);
      this.setState(() => {
        return {
          mappedCars: filteredCarArray.map(this.mapCar),
        };
      });
    }
  };

  filterCarsByYear = (carObj, targetYear) => {
    console.log(carObj.year, targetYear);
    return carObj.year === targetYear;
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="row">
            <div className="col-md-2">
              <button
                type="showCars"
                className="btn btn-primary showCars"
                style={{
                  height: "38px",
                  marginLeft: "15px",
                  marginTop: "35px",
                  marginBottom: "20px",
                }}
                id="show-cars-button"
                onClick={this.onShowCars}
              >
                Show Cars
              </button>
            </div>
            <div className="col-md-2">
              <select
                className="form-control car-year-dropdown"
                id="carYearDropdown"
                name="carYearDropdown"
                style={{
                  marginTop: "35px",
                  marginBottom: "20px",
                }}
                onChange={this.onDropdownChange}
              >
                <option hidden>Select</option>
                <option value="All">Show All</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
              </select>
            </div>
          </div>

          <div className="row" style={{ marginLeft: "13px" }}>
            {this.state.displayCards && this.state.mappedCars}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cars;
