import React from "react";
import OneCar from "./OneCar";

class Cars extends React.Component {
  state = {
    cars: [
      {
        id: 1,
        make: "Kia",
        model: "Sorento",
        year: 2020,
        avatar: "https://fs3.ebait.biz/c4RpU5aF/review_337290_1.jpg",
      },
      {
        id: 2,
        make: "Kia",
        model: "Optima",
        year: 2019,
        avatar:
          "https://www.newcartestdrive.com/wp-content/uploads/2019/06/2019_Kia_Optima_hero-610x400.jpg",
      },
      {
        id: 3,
        make: "Tesla",
        model: "Model 3",
        year: 2021,
        avatar:
          "https://www.autoloansolutions.ca/wp-content/uploads/2015/04/upside-down-bond-car-300x195.jpg",
      },
      {
        id: 4,
        make: "Honda",
        model: "Civic",
        year: 2019,
        avatar:
          "https://cars.usnews.com/static/images/Auto/izmo/i103961693/2019_honda_civic_hatchback_angularfront.jpg",
      },
      {
        id: 5,
        make: "Honda",
        model: "Accord",
        year: 2018,
        avatar:
          "https://cdn.arstechnica.net/wp-content/uploads/2018/06/Honda-Accord-Sport-3-800x600.jpg",
      },
      {
        id: 6,
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
        avatar:
          "https://www.autotrader.com/wp-content/uploads/2020/07/2021-volkswagen-jetta-front-left-side.jpg?resize=880,588&strip=all",
      },
      {
        id: 7,
        make: "Toyota",
        model: "Camry",
        year: 2021,
        avatar:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-toyota-camry-hybrid-xle-mmp-1-1603215410.png?crop=0.886xw:0.836xh;0.0721xw,0.164xh&resize=1200:*",
      },
      {
        id: 8,
        make: "Ford",
        model: "Mustang",
        year: 2019,
        avatar:
          "https://www.chicagotribune.com/resizer/PZ_W1AqlKchYCXo1Hzx80cP7j7c=/800x450/top/www.trbimg.com/img-5c080ecc/turbine/ct-1544031942-9w746pjczg-snap-image",
      },
      {
        id: 9,
        make: "Ford",
        model: "F-150",
        year: 2019,
        avatar:
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-ford-f-150-limited-3p5l-crew-cab-1544727022.jpg?crop=0.926xw:0.851xh;0,0.149xh&resize=1200:*",
      },
      {
        id: 10,
        make: "Toyota",
        model: "Camry",
        year: 2020,
        avatar:
          "https://www.thetruthaboutcars.com/wp-content/uploads/2020/04/00505_hSd56WHKxjK_1200x900-610x296.jpg",
      },
      {
        id: 11,
        make: "Ford",
        model: "F-150",
        year: 2021,
        avatar:
          "https://media.datacenterdynamics.com/media/images/fordonfire.width-358.jpg",
      },
    ],
  };

  componentDidMount() {
    this.setState((prevState) => {
      return { mappedCars: prevState.cars.map(this.mapCars) };
    });
  }

  onButtonClick = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.dataset);
  };

  onButtonClickFull = (car) => {
    console.log(car);
  };

  mapCars = (oneCar) => {
    return (
      <React.Fragment key={`cars-${oneCar.id}`}>
        <OneCar cars={oneCar} onClick={this.onButtonClickFull}></OneCar>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h5>Welcome to the Dumpster Fire Lemon Lot!</h5>
          <div className="col-md-12 p-5">
            <div className="row">{this.state.mappedCars}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cars;
