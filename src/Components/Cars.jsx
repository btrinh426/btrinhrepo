import React from "react";
import ACar from "./ACar";
import TheCars from "./TheCars";
// import * as userService from "../services/userService";

class Cars extends React.Component {
  state = {
    cars: [
      {
        id: 1,
        make: "Kia",
        model: "Sorento",
        year: 2020,
      },
      {
        id: 19,
        make: "Kia",
        model: "Optima",
        year: 2019,
      },
      {
        id: 18,
        make: "Tesla",
        model: "Model 3",
        year: 2021,
      },
      {
        id: 17,
        make: "Honda",
        model: "Civic",
        year: 2019,
      },
      {
        id: 16,
        make: "Honda",
        model: "Accord",
        year: 2018,
      },
      {
        id: 15,
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
      },
      {
        id: 14,
        make: "Toyota",
        model: "Camry",
        year: 2021,
      },
      {
        id: 13,
        make: "Ford",
        model: "Mustang",
        year: 2019,
      },
      {
        id: 12,
        make: "Ford",
        model: "F-150",
        year: 2019,
      },
      {
        id: 11,
        make: "Toyota",
        model: "Camry",
        year: 2020,
      },
      {
        id: 10,
        make: "Ford",
        model: "F-150",
        year: 2021,
      },
    ],
  };

  mapCars = (oneCar) => {
    return (
      <React.Fragment key={`Cars-${oneCar.id}`}>
        <ACar car={oneCar} {...this.props} />
      </React.Fragment>
    );
  };

  onHideClick = () => {
    this.props.history.push("/");
  };

  onFormFieldChanged = (e) => {
    e.preventDefault();
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    console.log(newValue);
    this.setState((prevState) => {
      return {
        filteredCars: this.state.cars.filter(this.filterCars),
      };
    });
  };

  filterCars = (oneCar) => {
    return <TheCars car={oneCar} {...this.props} />;
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-row align-items-center pl-5">
            <div className="col-auto my-1">
              <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
                Year
              </label>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={this.onFormFieldChanged}
                value={this.state.cars.year}
              >
                <option defaultValue>Choose...</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
            </div>
            {/* <div className="col-auto my-1">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div> */}
          </div>
        </form>
        <div className="container p-5">{this.state.cars.map(this.mapCars)}</div>
      </React.Fragment>
    );
  }
}
export default Cars;
