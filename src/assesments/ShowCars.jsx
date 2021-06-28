import React from "react";
import SingleCar from "../assesments/SingleCar";

class Cars extends React.Component {
  state = {
    cars: [
      {
        make: "Kia",
        model: "Sorento",
        year: "2020",
        id: 1,
      },
      {
        make: "Kia",
        model: "Optima",
        year: 2019,
        id: 2,
      },
      {
        make: "Tesla",
        model: "Model 3",
        year: 2021,
        id: 3,
      },
      {
        make: "Honda",
        model: "Civic",
        year: 2019,
        id: 4,
      },
      {
        make: "Honda",
        model: "Accord",
        year: 2018,
        id: 5,
      },
      {
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
        id: 6,
      },
      {
        make: "Toyota",
        model: "Camry",
        year: 2021,
        id: 7,
      },
      {
        make: "Ford",
        model: "Mustang",
        year: 2019,
        id: 8,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2019,
        id: 9,
      },
      {
        make: "Toyota",
        model: "Camry",
        year: 2020,
        id: 10,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2021,
        id: 11,
      },
    ],
    formData: {
      years: 0,
    },
  };

  onShowCarsClick = (e) => {
    this.props.history.push("/cars");
  };

  filterCars = (oneCar) => {
    return oneCar.year === this.state.formData.years;
  };

  componentDidMount() {
    // this.setState((prevState) => {
    //   return { filteredCars: prevState.cars.filter(this.filterCars) };
    // });
    this.setState((prevState) => {
      return { mappedCars: prevState.cars.map(this.mapCars) };
    });
  }

  mapCars = (oneCar) => {
    return (
      <React.Fragment key={`CarsId-${oneCar.id}`}>
        <SingleCar car={oneCar} />
      </React.Fragment>
    );
  };

  onFormFieldChange = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let formData = { ...this.state.formData };

      formData[inputName] = newValue;

      return { formData };
    });
  };

  componentDidUpdate() {
    console.log(this.state.formData.years);
  }

  render() {
    let titleStyles = {
      marginRight: "500px",
      marginLeft: "680px",
      marginTop: "10px",
    };

    let styles = {
      marginRight: "520px",
      marginLeft: "100px",
    };

    let buttonStyles = {
      marginRight: "500px",
      marginLeft: "680px",
      marginTop: "40px",
    };
    return (
      <React.Fragment>
        <h1 style={titleStyles}>Cars!</h1>

        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={buttonStyles}
          onClick={this.onShowCarsClick}
        >
          Hide Cars
        </button>
        <select
          style={buttonStyles}
          onChange={this.onFormFieldChange}
          name="years"
          value={this.state.formData.years}
          className="form-select form-select-sm"
        >
          <option value="">Open this select menu</option>
          <option value={2021}>2021</option>
          <option value={2020}>2020</option>
          <option value={2019}>2019</option>
        </select>
        <div className="col-md-12 p-5" style={styles}>
          <div className="row">{this.state.mappedCars}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cars;
