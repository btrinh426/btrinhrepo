import React from "react";
import CarsCard from "./CarsCard";

class Cars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            show: false
        };
    }

    componentDidMount = () => {
        console.log(this.state.cars);
        this.setState(() => {
            return { cars: this.state.cars.map(this.mappingCars) };
        });
    };

    mappingCars = (carInfo) => {
        console.log(carInfo);
        return (
            <CarsCard car={carInfo} key={`Key is ${carInfo.year}-${carInfo.make}`} />
        );
    };

    onToggle = (e) => {
        e.preventDefault();
        this.setState((prevState) => { return { show: !prevState.show } })
    }

    filterYear2019 = e => {
        e.preventDefault();
    }

    render() {
        return <React.Fragment>
            <button onClick={this.onToggle}></button>
            <h3 className="p-3">Cars</h3>
            <button onClick={this.filterYear2019} name="2019">2019</button>
            {/* <div className="btn-group">
                <button type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Year</button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" name="2019" onClick={this.filterYear}>2019</a>
                    <a className="dropdown-item" name="2020" onClick={this.filterYear}>2020</a>
                    <a className="dropdown-item" name="2021" onClick={this.filterYear}>2021</a>
                </div>
            </div> */}
            {/* abandoned the dropout as it didn't work */}
        </React.Fragment>
    }
}

export default Cars;
