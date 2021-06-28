import React, { Component } from "react";
import SingleCar from "../components/SingleCar";
import "sweetalert2/dist/sweetalert2.css";

class Cars extends Component {
  state = {
    carsInfo: [
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
    mappedCarsInfo: [],

    shouldShow: false,
  };

  componentDidMount() {
    this.setState((prevState) => {
      return { mappedCarsInfo: prevState.carsInfo.map(this.mapCar) };
    });
  }

  mapCar = (aCar) => {
    return (
      <SingleCar
        {...this.props}
        key={`carId-${aCar.id}`}
        car={aCar}
        // filterACar={this.filterByYear}
      />
    );
  };

  onShowClicked = (e) => {
    this.state.shouldShow
      ? this.setState((prevState) => {
          return { shouldShow: false };
        })
      : this.setState((prevState) => {
          return { shouldShow: true };
        });
  };

  //   onSelectYear = (e) => {
  //     let selectedYear = parseInt(e.currentTarget.value);
  //     let myFilteredCars = this.filterByYear(this.state.carsInfo, selectedYear);
  //     console.log({ myFilteredCars });
  //     this.setState((prevState) => {
  //       return { carsInfo: myFilteredCars };
  //     });
  //     // this.componentDidMount();
  //     // this.refreshPage();
  //     // this.render();
  //   };

  onSelectYear = (e) => {
    let selectedYear = parseInt(e.currentTarget.value);
    console.log(this.state.mappedCarsInfo);
    //** I was about to do a for-loop here to get inside the mappedCarsInfo, and make a new arr based on it's "props.car", and then filter this new arr- but time is up! */
    let myFilteredCars = this.filterByYear(
      this.state.mappedCarsInfo,
      selectedYear
    );
    console.log({ myFilteredCars });
    this.setState((prevState) => {
      return { mappedCarsInfo: myFilteredCars };
    });
  };

  filterByYear = (carsInfoArr, aYear) => {
    let filterCar = function (aCar) {
      return aCar.year === aYear;
    };
    let filteredCarsArr = carsInfoArr.filter(filterCar);
    return filteredCarsArr;
  };

  //   refreshPage = () => {
  //     window.location.reload(false);
  //   };

  //****************************************************************************************************************************************** */

  render() {
    return (
      <React.Fragment>
        <div className="col-sm-10">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onShowClicked}
          >
            Show Cars
          </button>
        </div>
        <div className="row">
          {this.state.shouldShow && this.state.mappedCarsInfo}
        </div>
        <div className="col-sm-10">
          <div className="row">
            <label htmlFor="carYearSelect" className="col-sm-2 col-form-label">
              Select Year
            </label>
            <div className="col-sm-10">
              <select
                onChange={this.onSelectYear}
                //   value={this.state.jobForm.techCompanyId}
                className="form-control"
                name="year"
                id="carYearSelect"
              >
                <option value="">Select</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
              </select>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Cars;
