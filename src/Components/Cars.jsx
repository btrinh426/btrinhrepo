import React from "react";
import Car from "./Car";

class Cars extends React.Component {
  state = {
    carAr: [
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
    yearSelected: "",
  };

  mapCar = (oneCar) => {
    return <Car myCar={oneCar} key={Math.random()}></Car>;
  };

  mapYear = (oneYear) => {
    return (
      <option value="" key={Math.random()}>
        {oneYear.year}
      </option>
    );
  };

  showHide = () => {
    console.log("Show me.");
    //setState if showCars=[] then map carAr to showCar else set showCars=[]
    this.setState(() => {
      return { showCars: this.state.carAr.map(this.mapCar) };
    });
  };

  onYearChange = (e) => {
    console.log(e.currentTarget.value);
    let currentYearSelected = e.currentTarget.value;
    let newArr = this.state.carAr.map(
      (car) => car.year === currentYearSelected
    );
    console.log();
    this.setState(() => {
      return { yearSelected: currentYearSelected, showCars: newArr }; //showCars: copyData
    });
    //search carAr find all obj.year that match e.currentTarget.value and map them to showCars
    //if "" then map all carAr to showCar
    // let copyData = { ...this.state.carAr };
    // //sort array by year?
    // let findIndexes = this.state.carAr.findIndex(
    //   (car) => car.year === e.currentTarget.value
    // );
    // console.log(findIndexes);
    // this.setState(()=>{})
    // if (e.currentTarget.value === 2021){}
    // return{showCars:copyData}
  };

  componentDidMount() {
    this.setState(() => {
      return { showCars: this.state.carAr.map(this.mapCar) };
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <button className="btn btn-primary" onClick={this.showHide}>
              Show Cars
            </button>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1"></label>
              <select
                className="form-control"
                name="yearSelector"
                value={this.state.yearSelected}
                onChange={this.onYearChange}
              >
                <option value="">Select Year</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                {/* {this.state.carAr.map(this.mapYear)} */}
              </select>
            </div>
          </div>
        </div>
        <div className="row">{this.state.showCars}</div>
      </div>
    );
  }
}

export default Cars;
