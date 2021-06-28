import React from "react";
import * as carServices from "../services/carServices";
import SingleCar from "./SingleCar";

class Cars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cars: []
        }
    }

    componentDidMount() {
        carServices.getCars()
            .then(this.onGetCarsSuccess)
            .catch(this.onGetCarsError)
    }

    onGetCarsSuccess = (response) => {
        this.setState(() => {
            return {
                cars: response.data.items
            }

        })
        console.log("setState onGetCarsSuccess:", this.state.cars)

        this.setState(() => {
            let carList = response.data.items;
            return {
                mappedCars: carList.map(this.mapCar)
            }
        })
    }

    onGetCarsError = (errResponse) => {

        console.log("submit error", errResponse)
    }

    onEditClick = (car) => {
        console.log(car)

        this.props.history.push(`/Car/${car.id}/Edit`, {type:"EDIT_CAR", payload: car});
    }

    onDeleteClick =(idToDelete)=>{
        console.log("onDeleteClick button success")

     //---did not have time to complete this button, but i created the ajax call----

    }


    mapCar = (car) => {
        console.log("CarsMapped:",car)
        //--refactored to functional component SingleCar--
        return (
            <React.Fragment key={`Car - ${car.id}`}>
               <SingleCar car={car} onClick={this.onEditClick}/>
            </React.Fragment>
        )
    }
    render() {

        return (

            <div className="container">
                <h1>Cars</h1>
                <div className="row">
                    {this.state.mappedCars}
                </div>

            </div>
        )
    }

}

export default Cars;
