import React from "react";

import CarsSingle from "./CarsSingle";

class Cars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: { year: "" },
      cars: [
        { id: 1, make: "Kia", model: "Sorento", year: 2020 },
        { id: 2, make: "Kia", model: "Optima", year: 2019 },
        { id: 3, make: "Tesla", model: "Model 3", year: 2021 },
        { id: 4, make: "Honda", model: "Civic", year: 2019 },
        { id: 5, make: "Honda", model: "Accord", year: 2018 },
        { id: 6, make: "Volkswagen", model: "Jetta", year: 2021 },
        { id: 7, make: "Toyota", model: "Camry", year: 2021 },
        { id: 8, make: "Ford", model: "Mustang", year: 2019 },
        { id: 9, make: "Ford", model: "F-150", year: 2019 },
        { id: 10, make: "Toyota", model: "Camry", year: 2020 },
        { id: 11, make: "Ford", model: "F-150", year: 2021 },
      ],
      isFiltered: false
    };
  }

  componentDidMount() {
    let carsArray = this.state.cars; // vanilla js cars array
    //console.log(carsArray);
    this.setState(() => {
      return {
        cars: carsArray, //returned js cars array
        mappedCars: carsArray.map(this.mapCar), // component
      };
    });
  }

  mapCar = (oneCar) => {
    //console.log(oneCar);
    return (
      <React.Fragment key={`CarId ${oneCar.id}`}>
        <CarsSingle {...this.props} cars={oneCar}></CarsSingle>
      </React.Fragment>
    );
  };

  onShowClicked = (e) => {
    //console.log("on Show or Hide clicked, currentTarget:", e.currentTarget);
    //mappedCars: carsArray.map(this.mapCar);
  };

  carsFilter = (eachElem) => {
    let result = false;
    //console.log(eachElem.year);
    console.log("this.state.formData.year:", this.state.formData.year);
    console.log(
      "typeof year",
      typeof eachElem.year,
      "eachElem year",
      eachElem.year
    );
    if (eachElem.year === 2019) {
      result = true;
    }
    return result;
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    });
    this.filterCars(e);
  };

  filterCars = (e) => {
    //console.log(e.currentTarget.value);
    let currentlySelectedYear = e.currentTarget.value;
    // let stateYear = {...this.state.formData.year}
    // this.setState({stateYear: currentlySelectedYear})
    let carsArrCopy = [...this.state.cars];
    //console.log("carsArrCopy:", carsArrCopy);
    if (currentlySelectedYear === "2019") {
      let filterCars = carsArrCopy.filter(this.carsFilter);
      console.log("filteredCars:", filterCars);
      return this.setState({ filteredCars: filterCars, isFiltered: true });
    } else if (currentlySelectedYear === "2020") {
      //console.log("2020", true);
    } else {
      //console.log("2021", true);
    }
  };

  componentDidUpdate() {}

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Cars</h1>
            <h3 className="float-left p-2"> </h3>

            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1"></label>
              <select
                onChange={this.onFormFieldChanged}
                className="form-control"
                name="year"
                value={this.state.formData.year}
              >
                <option value="">Select Year</option>
                <option>2021</option>
                <option>2020</option>
                <option>2019</option>
              </select>
            </div>

            <button
              className="btn btn-secondary my-2 my-sm-0"
              type="submit"
              onClick={this.onShowClicked}
            >
              Show Cars
            </button>
          </div>
        </div>

        <div className="cars-container">
          
          <div className="row">{this.state.mappedCars}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cars;
