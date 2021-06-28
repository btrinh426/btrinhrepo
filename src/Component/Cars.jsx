import React from "react";
import RenderCar from "./RenderCar";
import * as userService from "../services/userService";

class Cars extends React.Component {
  state = {
    carData: {
      make: "",
      model: "",
      year: "",
    },
  };

  componentDidMount() {
    userService.getCars().then(this.onMountSuccess).catch(this.onMountFail);
  }

  onMountSuccess = (response) => {
    console.log(response);
    const thisCar = response.data.items;
    thisCar.isHidden = false;
    this.setState((preState) => {
      return { mappedCar: thisCar.map(this.mapCar) };
    });
  };
  onMountFail = (err) => {
    console.log(err);
  };

  mapCar = (car) => {
    return (
      <React.Fragment key={`uniqueCar-${car.id}`}>
        <RenderCar carInfo={car}></RenderCar>
      </React.Fragment>
    );
  };
  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  };

  render() {
    return (
      <div>
        {" "}
        {this.state.mappedCar}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.toggleHidden}
        >
          Show/Hide
        </button>
        {!this.state.isHidden}
      </div>
    );
  }
}
export default Cars;
