import React from "react";
import CarsCards from "./CarsCards"

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCars: [
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
      mapAllCars: [],
      dropDownData: {},
      showCars: true
    };
  }
componentDidMount(){
  this.renderAllCars()
}
mapVehicles = (car) => <CarsCards car={car} key={car.id} />

renderAllCars = () => {
  this.setState(prevState => {
    return {
      ...prevState,
      mapAllCars: prevState.allCars.map(this.mapVehicles)
    }
  })
};

onFieldChange = (e) => {
  let currentTarget = e.currentTarget;
  let newValue = currentTarget.value;
  let inputName = currentTarget.name;

  this.setState(() => {
    let dropDownData = { ...this.state.dropDownData };

    dropDownData[inputName] = newValue
  
    return { dropDownData };
  });
};
toggleContent = () => {
this.setState({
  showCars: false
})
}

  render() {
    return (
    <React.Fragment>
        <div className="form-group">
        <label htmlfor="exampleFormControlSelect1">
        <div style={{ flex: 1, marginBottom: 20 }}></div>
          <button
              type="button"
              className="btn btn-primary btn"
              onClick={this.toggleContent}
              >
                Show Cars
                <h1>
                  {/* {this.state.showCars ?} */}
                </h1>
            </button>
        </label>

        <select 
          name="year"
          onChange={this.onFieldChange}
          className="form-control" 
          value={this.state.allCars.year}
          
          >
          <option value="">Vehicle Year</option>
          <option>2021</option>
          <option>2020</option>
          <option>2019</option>
        </select>
      </div>
      <div className="row"> 
      <>{this.state.mapAllCars}</>
      </div>

    </React.Fragment>
      
    )
  }
}

export default Cars;
