import React from "react";
import SingleCar from "./SingleCar";
import { Dropdown } from "react-dropdown-now";
import "react-dropdown-now/style.css";

class Cars extends React.Component {
  state = {
    carList: [
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
    showCars: false,
    carsByYear: false,
  };
  componentDidMount() {
    console.log("Cars Mounted");
    this.loadCars();
  }

  loadCars = () => {
    this.setState((prevState) => {
      let cars = this.state.carList;
      let mappedCars = cars.map(this.mapCars);
      console.log(cars);
      return {
        prevState,
        mappedCars,
      };
    });
  };
  onShowCars = (e) => {
    this.setState((prevState) => {
      let show = false;
      if (this.state.showCars) {
        console.log("in true");
      } else {
        show = true;
      }
      return {
        prevState,
        showCars: show,
        carsByYear: false,
      };
    });
  };

  onShowByYear = (year) => {
    console.log("need to grab" + year.value);
    this.setState({ currentYear: year.value }, this.updateFilter);
  };

  updateFilter = () => {
    let filteredCars = this.state.carList.filter(this.filterCars);
    console.log(filteredCars);

    this.setState((prevState) => {
      let filteredCarMap = filteredCars.map(this.mapCars);

      return {
        prevState,
        filteredCarMap,
        showCars: false,
        carsByYear: true,
      };
    });
  };

  filterCars = (car) => {
    let result = false;
    if (car.year == this.state.currentYear) {
      result = true;
    }
    return result;
  };
  mapCars = (car) => {
    return (
      <React.Fragment>
        <SingleCar oneCar={car} />
      </React.Fragment>
    );
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <h1>CarsCarsCars</h1>
          <form className="container d-flex">
            <button
              type="button"
              id="openAddFriend"
              className="btn btn-primary"
              onClick={this.onShowCars}
            >
              {this.state.showCars ? <h1>Hide Cars</h1> : <h1>Show Cars</h1>}
            </button>
            View by year:
            <Dropdown
              placeholder="View By Year"
              className="my-className"
              options={["2019", "2020", "2021"]}
              value="one"
              onChange={(value) => console.log("change!", value)}
              onSelect={(value) => this.onShowByYear(value)} // always fires once a selection happens even if there is no change
            />
            ;
          </form>
        </div>
        <div>
          <h1>Cars go here:</h1>

          {this.state.showCars ? (
            <div className="row pb-5 col-md-12 friend-container">
              {this.state.mappedCars}
            </div>
          ) : (
            <h1></h1>
          )}
          {this.state.carsByYear ? (
            <div className="row pb-5 col-md-12 friend-container">
              {this.state.filteredCarMap}
            </div>
          ) : (
            <h1></h1>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Cars;
