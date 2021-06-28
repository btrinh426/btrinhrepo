import React from "react";
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
    isToggleOpen: false,
    mappedCars: "",
    formData: { year: "" },
  };
  componentDidMount() {
    console.log(this.state);
  }

  componentDidUpdate(prevState) {
    console.log("current state", this.state);
    console.log("prevState", prevState);
    // let prevYear = prevState.formData.year;
    // let currentYear = this.state.formData.year;

    // if (
    //   (prevYear === "" && currentYear === "2019") ||
    //   (prevYear === "2021" && currentYear === "2019") ||
    //   (prevYear === "2019" && currentYear === "2019")
    // ) {
    //   let filteredCars = this.state.cars.filter((car) => {
    //     return car.year === 2019;
    //   });
    //   let newMappedCars = filteredCars.map(this.mapCar);
    //   this.setState(() => {
    //     return { mappedCars: newMappedCars };
    //   });

    //   console.log("it is 2019");
    // } else {
    //   this.setState(() => {
    //     return { mappedCars: this.state.cars.map(this.mapCar) };
    //   });
    // }
  }

  //   onFormChanged = (e) => {
  //     let inputName = e.currentTarget.name;
  //     let newValue = e.currentTarget.value;
  //     this.setState((prevState) => {
  //       let formData = { ...prevState.formData };
  //       formData[inputName] = newValue;
  //       return { formData };
  //     });
  //   };

  toggle = (e) => {
    e.preventDefault();
    // if (this.state.isToggleOpen === false) {
    //   this.setState((prevState) => {
    //     return {
    //       isToggleOpen: !prevState.isToggleOpen,
    //       mappedCars: this.state.cars.map(this.mapCar),
    //     };
    //   });
    // } else {
    //   this.setState((prevState) => {
    //     return {
    //       isToggleOpen: !prevState.isToggleOpen,
    //       mappedCars: "",
    //     };
    //   });
    // }
    this.setState(() => {
      return {
        mappedCars: "12",
      };
    });
  };

  mapCar = (oneCar) => {
    return (
      <React.Fragment key={`id-${oneCar.model}-${oneCar.year}`}>
        <SingleCar car={oneCar}></SingleCar>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          id="showcars"
          className="btn btn-primary m-3"
          onClick={this.toggle}
        >
          Show Cars
        </button>
        {/* <select
          className="form-control"
          onChange={this.onFormChanged}
          value={this.state.formData.year}
          name="year"
        >
          <option value="">Show All</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
        </select>

        <div className="row">{this.state.mappedCars}</div> */}
      </React.Fragment>
    );
  }
}

export default Cars;
