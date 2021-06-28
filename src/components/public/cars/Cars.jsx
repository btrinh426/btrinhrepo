import React from "react";
import ACar from "./ACar";

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCars: true,
      filterFormData: {
        filterDisplay: "Display All",
      },
      carKeyStart: this.getKey(),
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
    };
  }

  componentDidMount() {
    console.log("... Cars componentDidMount firing ... ", this.state.carList);
    this.renderCars();
    console.log(this.revisionBFilteringCars("2019"));
  }

  // componentDidUpdate() {  WARNING  -  INFINITE LOOP  -  DO NOT USE
  //   console.log("... Cars componentDidUpdate firing ... ", this.state.carList);
  //   this.checkFilter();
  // }
  // componentDidUpdate(prevProps, prevState, snapshot) {  USE THIS ONE
  //   console.log("... Cars componentDidUpdate firing ... ", this.state.carList);

  //   // Typical usage (don't forget to compare props):
  //   if (this.props.userID !== prevProps.userID) {
  //     this.fetchData(this.props.userID);
  //   }
  // }

  // ---------------------------------- USER ACTIONS ----------------------

  onShowCars = (e) => {
    e.preventDefault();
    console.log("... Cars onShowCars firing ... ", this.state.showCars);
    this.setState({ showCars: !this.state.showCars });
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
      let filterFormData = { ...this.state.filterFormData };
      let carList = prevState.carList;

      filterFormData[inputName] = newValue;
      if (filterFormData.filterDisplay === "Display All") {
        console.log("display all ... ");

        return {
          ...prevState,
          filterFormData,
          mappedCarList: carList.map(this.mapCar),
        };
      } else {
        // const filterVal = filterFormData.filterVal;
        // console.log("filtering ... ", newValue);

        return {
          ...prevState,
          filterFormData,
          mappedCarList: carList
            .filter((oneCar) => {
              if (oneCar.year === parseInt(newValue)) {
                return true;
              } else {
                // console.log("oneca", newValue, oneCar.year);
                return false;
              }
            })
            .map(this.mapCar),
        };
      }
    }, this.onStateChangeComplete());
  };

  onStateChangeComplete = () => {
    console.log(" state change is now complete, I can use the new state");
  };

  // ---------------------------------- FILTERING -------------------------

  //   checkFilter = () => {
  //     const filterVal = this.state.filterFormData.filterDisplay;

  //     console.log("... Cars checkFilter firing ... ", filterVal);
  //     if (filterVal === "Display All") {
  //       console.log("not-filtering");
  //       this.renderCars();
  //     } else {
  //       console.log("filtering");
  //       this.filterCars();
  //     }
  //   };

  revisionBFilteringCars = (yearVal) => {
    return this.state.carList.filter(
      (oneCar) => oneCar.year === parseInt(yearVal)
    );
  };

  //   filterCars = () => {
  //     this.setState((prevState) => {
  //       const carList = prevState.carList;
  //       const filteredCarList = carList.filter(this.filterACar);
  //       return {
  //         ...prevState,
  //         mappedCarList: filteredCarList.filter(this.filterACar),
  //       };
  //     });
  //   };

  //   filterACar = (oneCar) => {
  //     let result = false;
  //     console.log("filtering", oneCar, this.state.filterFormData.filterDisplay);
  //     // if (oneCar.year.includes(this.state.filterFormData.filterDisplay)) {
  //     //   result = true;
  //     // }
  //     return result;
  //   };

  // ---------------------------------- RENDERING -------------------------

  renderCars = () => {
    console.log("... Cars onShowCars firing ... ", this.state.showCars);

    this.setState((prevState) => {
      let carList = prevState.carList;

      return { ...prevState, mappedCarList: carList.map(this.mapCar) };
    });
  };

  getKey = () => {
    return Date.now() - 1604440000000;
  };

  mapCar = (oneCar, index) => {
    // console.log("... Cars onShowCars firing ... before change: ", oneCar);
    const aKey = this.state.carKeyStart;
    oneCar.idKey = aKey + index;

    return <ACar oneCar={oneCar} key={`car_${oneCar.idKey}`} />;
  };

  render() {
    return (
      <div className="container">
        {/* --------------------------------------------- row */}

        <div className="row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onShowCars}
          >
            Show Cars
          </button>

          {/* drop-down menu here */}
          {/* <label htmlFor="filterDisplay" className="px-3">
            Filter:
          </label> */}
          <select
            className="form-control mx-2 col-md-2"
            name="filterDisplay"
            value={this.state.filterFormData.filterDisplay}
            onChange={this.onFormFieldChanged}
          >
            <option defaultValue="Display All">Display All</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
        </div>
        {/* --------------------------------------------- row */}
        <div className="row" hidden={!this.state.showCars}>
          {/* MAPPED CAR LIST HERE */}
          {this.state.mappedCarList}
        </div>
      </div>
    );
  }
}

export default Cars;
