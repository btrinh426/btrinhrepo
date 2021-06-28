import React from "react";
import SingleCar from "./SingleCar";

//most of my time was searching how to generate a unique id to place in a copy array. not using index
class Cars extends React.Component {
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
    mappedCars: [],
    filterOption: "All Cars",
    isOpen: false,
  };
  //during component lifecycle this initiates a copy of cars into mappedCars, so i don't destroy the original array
  componentDidMount() {
    this.allCars();
  }

  //this copys all the cars to mappedCars
  allCars = () => {
    this.setState(() => {
      return {
        mappedCars: this.state.cars.map(this.mapCar),
      };
    });
  };

  //this returns a templated subcomponent for each mapped car
  mapCar = (aCar) => {
    return (
      <SingleCar car={aCar} key={`${aCar.make}${aCar.year}${aCar.model}`} />
    );
  };

  //handleSubmit hides or shows cars on click
  handleSubmit = () => {
    this.setState((preState) => {
      return { isOpen: !preState.isOpen };
    }, console.log("isOpen: ", this.state.isOpen));
  };

  //this sets the filterOption in state, to know what year to filter the mappedCars to
  optionSelect = (e) => {
    let newValue = e.currentTarget.value;
    this.setState(
      () => {
        return { filterOption: newValue };
      }, //upon this setState finishing, i've tried multiple functions in the callback -unsuccessfully
      () => this.filterCars()
    );
  };

  //i've tried, map() filter() findIndex() but can't get it to filter appropiately/change dom

  filterCars = () => {
    if (this.state.filterOption === "All Cars") {
      this.allCars();
    } else {
      this.newestCars();
    }
  };

  filtering = (aCar) => {
    return aCar.year === this.state.filterOption;
  };

  hereWeGo = () => {
    let newState = [...this.state.cars].filter(this.filtering);
    console.log("herewego: ", newState);
  };

  newestCars = () => {
    this.setState((preState) => {
      const yearOfCar = preState.mappedCars.findIndex(
        (aCar) => aCar.props.car.year !== this.state.filterOption
      );
      const updatedCars = [...preState.mappedCars];
      if (yearOfCar >= 0) {
        updatedCars.splice(yearOfCar, 1);
      }
    }, this.stateChanged);
  };

  newCars = () => {
    this.setState(() => {
      return { mappedCars: this.state.cars.map(this.mapCar) };
    });
  };

  render() {
    return (
      <div className="">
        <h1>Cars</h1>
        <hr></hr>
        <div className="row">
          <form className="form-inline">
            <button
              type="button"
              className="btn btn-primary ml-4"
              onClick={this.handleSubmit}
            >
              Show Cars
            </button>
            <select
              className="form-control ml-5"
              name="filterOption"
              onChange={this.optionSelect}
            >
              <option>All Cars</option>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
            </select>
          </form>
        </div>
        <div className="container">
          <div className="row">
            {this.state.isOpen ? this.state.mappedCars : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Cars;
