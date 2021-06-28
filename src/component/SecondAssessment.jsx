import React from "react";
import Card from "./Card";
import { Button } from "reactstrap";
class SecondAssessment extends React.Component {
  state = {
    carsData: [
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
    isButtonClicked: false,
    carsComponent: {},
    dropdownOpen: false,
    formData: {
      year: "",
    },
  };

  componentDidMount() {
    let newCarsComponent = this.state.carsData.map(this.mapData);
    this.setState(() => {
      return { carsComponent: newCarsComponent };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState, this.state);
    let prevYear = prevState.formData.year;
    let currentYear = this.state.formData.year;

    if (prevYear && currentYear === "") {
      let newCarsComponent = this.state.carsData.map(this.mapData);
      this.setState(() => {
        return { carsComponent: newCarsComponent };
      });
    }
  }

  mapData = (singleData, index) => {
    return <Card key={index} data={singleData} />;
  };

  onButtonClick = (e) => {
    e.preventDefault();
    this.setState(() => {
      return { isButtonClicked: !this.state.isButtonClicked };
    });
  };

  onFormChanged = (e) => {
    let newValue = e.currentTarget.value;
    let inputName = e.currentTarget.name;
    console.log(newValue);
    this.setState((prevState) => {
      let formData = { ...prevState.formData };
      formData[inputName] = newValue;
      return { formData };
    });

    let filteredCars = this.state.carsData.filter((car) => {
      return car.year === Number(newValue);
    });
    if (filteredCars && filteredCars.length > 0) {
      let newCarsComponent = filteredCars.map(this.mapData);
      this.setState(() => {
        return { carsComponent: newCarsComponent };
      });
    } else {
      let newCarsComponent = this.state.carsData.map(this.mapData);
      this.setState(() => {
        return { carsComponent: newCarsComponent };
      });
    }
  };

  render() {
    return (
      <div className="jumbotron">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1">
              <Button onClick={this.onButtonClick}>Show Cars</Button>
            </div>
            <div className="col-md-1.5">
              <div className="form-group">
                <select
                  value={this.state.formData.year}
                  name="year"
                  className="form-control"
                  onChange={this.onFormChanged}
                >
                  <option>Show All</option>
                  <option>2021</option>
                  <option>2020</option>
                  <option>2019</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row d-flex">
            <div className="row w-100">
              {this.state.isButtonClicked && this.state.carsComponent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SecondAssessment;
