import React, { Component } from "react";


class Cars extends Component {

    constructor(props) {
        super(props)
        this.state = {
            carData: [
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
            ],
            showCards: true, //state value for show/hide button
            selectedYear: null //value for filter function
        }
    }

    onShowCarsButton(e) {   //for toggle showCards state value
        this.setState({
            showCards: !this.state.showCards
        }) 
    }

    onYearButtonClick(e) { //sets selectedYear state value used by filter function
        if (e.currentTarget.innerHTML === "All Years") {
            this.setState({
                selectedYear: null
            })
        } else {
            this.setState({
                selectedYear: parseInt(e.currentTarget.innerHTML)
            })
        }
    }

    render() { 
        //filters by year
        const filteredCarData = this.state.carData.filter((car) => {
            if (!this.state.selectedYear) {
                return true
            }
            return car.year === this.state.selectedYear
        })
        //transforms filtered data into bootstrap card element
        const cards = filteredCarData.map((car, i) => {
            return (
                <div key={i} className="card col-md-3 m-1">
                    <div className="card-body">
                        <h5 className="card-title">{car.make}</h5>
                        <h5 className="card-text">{car.model}</h5>
                        <h5 className="card-text">{car.year}</h5>
                    </div>
                </div>              
            )
        })
        //render buttons and visible cards
        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this.onYearButtonClick.bind(this)}>2021</button>
                <button type="button" className="btn btn-primary" onClick={this.onYearButtonClick.bind(this)}>2020</button>
                <button type="button" className="btn btn-primary" onClick={this.onYearButtonClick.bind(this)}>2019</button>
                <button type="button" className="btn btn-primary" onClick={this.onYearButtonClick.bind(this)}>All Years</button>
                <button type="button" className="btn btn-primary" onClick={this.onShowCarsButton.bind(this)}>{this.state.showCards ? "Hide" : "Show"} Cars</button>
                <div className="card-group">
                    {this.state.showCards ? cards : ""}
                </div>
            </div>
        )
    }

}

    

export default Cars