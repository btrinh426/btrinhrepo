import React from "react";

class Cars extends React.Component {
  state = {
    carData: [
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
    showMe: true,
  };

  mapCar = (oneCar) => {
    return (
      <React.Fragment>
        <div className="card col-md-3 m-1" style={{ margintop: "50px" }}>
          <div className="card-body">
            <h5 className="card-title">{oneCar.make}</h5>
            <h5 className="card-text">{oneCar.model}</h5>
            <h5 className="card-text">{oneCar.year}</h5>
          </div>
        </div>
      </React.Fragment>
    );
  };

  hideAndShow = () => {
    this.setState({
      showMe: !this.state.showMe,
    });
  };
  getUnique(arr, comp) {
    const unique = arr

      .map((e) => e[comp])

      .map((e, i, final) => final.indexOf(e) === i && i)

      .filter((e) => arr[e])

      .map((e) => arr[e]);

    return unique;
  }

  render() {
    const year = this.state.carData.year;
    const uniqueYear = this.getUnique(this.state.carData, "year");
    const filterYear = this.state.carData.filter(function (result) {
      return result.year === year;
    });
    return (
      <React.Fragment>
        <div className="Container" style={{ margintop: "100px" }}>
          <div className="col float-right">
            <button
              onClick={() => this.hideAndShow()}
              className="btn btn-outline-success my-2 my-sm-0 "
              style={{ float: "left" }}
              type="button"
            >
              Show Cars
            </button>
          </div>
          <label htmlFor="cars">Choose Year:</label>

          <select name="cars" id="cars" onChange={this.onChangeYear}>
            {uniqueYear.map((year) => (
              <option>{year.year}</option>
            ))}
          </select>

          {this.state.showMe ? (
            <div className="row ">{this.state.carData.map(this.mapCar)}</div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default Cars;
