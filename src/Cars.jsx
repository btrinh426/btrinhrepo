import React from "react";
import "./App.css";

import SingleCar from "./SingleCar";

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
    isActive: true,
  };

  componentDidMount() {
    console.log("did mount");
    this.setState((preState) => {
      return {
        hardCodedCars: preState.cars.map(this.mapCars),
      };
    });
  }

  mapCars = (oneCar) => {
    return (
      <React.Fragment key={`Cars-${oneCar.model}-${oneCar.year}`}>
        <SingleCar car={oneCar}></SingleCar>
      </React.Fragment>
    );
  };

  showCars = () => {
    if (this.state.isActive === true) {
      this.setState({
        isActive: false,
      });
    } else {
      this.setState({
        isActive: true,
      });
    }
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    // console.log({ newValue, currentTarget });

    this.setState((prevState) => {
      let newState = { ...prevState.cars.year };
      newState[inputName] = newValue;

      return newState;
    });
  };

  //   getCars = (carYears) => {
  //       var newCarList = carYears.filter(filteredCars);
  //       filteredCars = (years) => {
  //           if (years === 2021){
  //               this.setState( ()=>{

  //               })
  //           }
  //       }
  //   }

  showByYear = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state.cars);
    let yearCar = this.state.cars.year;
    let yearDropdown = this.state.dropDownBox;
    let result = false;
    if (yearDropdown === yearCar) {
      result = true;
    }
    console.log(result);
    return result;
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 p-5"></div>
        <button onClick={this.showCars} type="submit" className="showCars">
          Show Cars
        </button>
        <div className="form-group1">
          <label htmlFor="exampleFormControlSelect1"></label>
          <select
            className="form-control"
            value={this.state.cars.year}
            onChange={this.onFormFieldChanged}
            name="year"
            id="dropDownBox"
          >
            <option value="">Select Year</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>

        <div className="row">
          {this.state.isActive ? this.state.hardCodedCars : null}
        </div>
      </React.Fragment>
    );
  }
}

export default Cars;
