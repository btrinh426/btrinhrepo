import React, {Component} from "react";



class CarsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        Cars: [
            {
                make: "Kia",
                model: "Sorento",
                year: 2020,
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
        ],
    
        searchCar: ''
    }
    
    
    handleInput = (e)
    console.log(e.target.value)
    this.setState({searchCars: e.target.value})
    


        const onShowCarsClick = (e) => {
            e.preventDefault();
            props.onShowCarsClick(showCars);

        const onHideCarsClick = (e) => {
        e.preventDefault();
        props.onHideCarsClick(hideCars);

           }   
        };

    
render () { 

    let filteredCars = this.state.cars.filter((cars)=>{
        return cars.year().includes(this.state.searchCar())
    })   (
        <div className="card col-md-3 m-1">
            <div className="card-body">
                <h5 className="card-title">Make</h5>
                <h5 className="card-text">Model</h5>
                <h5 className="card-text">Year</h5>
            </div>

            {this.state.cars.map ((item)=>(item))};
            <SearchBox> handleInput={this.handleInput} </SearchBox>
           

            <button
            id="showCars"
            className="btn btn-primary edit"
            onClick={onShowCarsClick}
            href="button"
            > Show Cars
            </button>

            <button
            id="hideCars"
            className="btn btn-primary delete"
            onClick={onHideCarsClick}
            href="button">            
                Hide Cars
                </button>
                </div>
    )}
} 
}        

export default CarsCard;