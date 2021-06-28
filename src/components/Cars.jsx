import React from "react"
import CarsTemplate from "./CarsTemplate"



class Cars extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            cars: [
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
            show: false,
            year: '',
        }
    }


    mapCars = (car) => { 
        return (
        <CarsTemplate key={Math.floor(Math.random()*1000)} car={car}/>
        )
    }


    componentDidMount() {
        this.setState(()=>{
            return{ mappedCars: this.state.cars.map(this.mapCars)}
        })
    }
    

    
    toggleCarsList = () => {
        const hideContent = this.state.show;
        this.setState({show: !hideContent})
    }

    onDropDownChange = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;
        this.setState( () => {
            let filteredYear = {};
            filteredYear[inputName] = newValue;
            // const getCarIndex = prevState.mappedCars.findIndex( 
            //     car => car.props.car.year !== filteredYear
            // )
            // const updatedMappedCars = [prevState.mappedCars]
            // if(getCarIndex >= 0) {
            //     updatedMappedCars.splice(getCarIndex, 1)
            // }

            // const filterCars = this.state.mappedCars.filter(
            //     cars => cars.year === filteredYear
            // )
    
            return filteredYear
        } )
    }


    // const filterCars = this.state.mappedCars.filter(
    //     cars => cars.year === filteredYear
    // )

    render() {
        return (
            <div className="mt-5 ml-5"> 
                <button className="btn btn-outline-info" onClick={this.toggleCarsList}>Show Cars</button>
                <select name="year" onChange={this.onDropDownChange}>
                <option value="show-all">show all</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>

                </select>
                <div className="row">

                {this.state.show && this.state.mappedCars}
                </div>
            </div>
        )
        
    }
}


export default Cars