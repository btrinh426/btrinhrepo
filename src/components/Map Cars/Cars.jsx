import React from 'react'
import Car from './Car'

class Cars extends React.Component {
    state = {
        displayCars: false,
        year: -1,
        cars:[
            {
                make: "Kia",
                model: "Sorento",
                year: 2020
            },
            {
                make: "Kia",
                model: "Optima",
                year: 2019
            },
            {
                make: "Tesla",
                model: "Model 3",
                year: 2021
            },
            {
                make: "Honda",
                model: "Civic",
                year: 2019
            },
            {
                make: "Honda",
                model: "Accord",
                year: 2018
            },
            {
                make: "Volkswagen",
                model: "Jetta",
                year: 2021
            },
            {
                make: "Toyota",
                model: "Camry",
                year: 2021
            },
            {
                make: "Ford",
                model: "Mustang",
                year: 2019
            },
            {
                make: "Ford",
                model: "F-150",
                year: 2019
            },
            {
                make: "Toyota",
                model: "Camry",
                year: 2020
            },
            {
                make: "Ford",
                model: "F-150",
                year: 2021
            }
        ]
    };

    toggleDisplay = () => {
        let carsVisible = this.state.displayCars ? false : true;
        this.setState((prevState) => {prevState.displayCars = carsVisible; return prevState;})
    }

    showCarsByYear = (e) => {
        const year = e.currentTarget.value;
        this.setState((prevState) => {prevState.year = year; return prevState;})
    }

    filterCars = () => {
        let cars = [... this.state.cars];
        
        if(this.state.year != -1){
            cars = cars.filter(this.filterByYear);
        }

        return cars;
    }

    filterByYear = (car) => {
        console.log("FILTER");
        const yr = this.state.year;
        return yr == car.year;
    }

    render(){
         return (
             <React.Fragment>
                <div>
                    <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={this.toggleDisplay}
                    >
                        Show Cars
                    </button>

                    <select className="form-select" aria-label="Default select example" placeholder={"Select A Year"} onChange={this.showCarsByYear}>
                        <option value={-1}>All</option>
                        <option value={2019}>2019</option>
                        <option value={2020}>2020</option>
                        <option value={2021}>2021</option>
                    </select>

                </div>
            
                {this.state.displayCars &&
                this.filterCars().map(
                    (car, i) => {
                        return <Car car={car} key={i}></Car>
                    })
                }

             </React.Fragment>
         );
    }
}

export default Cars;