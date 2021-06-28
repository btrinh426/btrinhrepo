import React from "react";
import * as carServices from "../services/carServices";

class AddCar extends React.Component {

    state = {
        carsFormData: {
            model: " ",
            year: " ",
            make: " ",
        }
    }

    componentDidMount() {
        let EditCarId = this.props.match.params.id;
        console.log({ EditCarId });

        let car = this.props?.location?.state?.payload;

        console.log("car payload pushed from Car.jsx:", car);

        this.setState((prevState) => {
            if (car) {

            return {
                    carsFormData: {
                        id: car.id,
                        model: car.model,
                        year: car.year,
                        make: car.make
                    }
                }
            }

            return {
                carsFormData: {
                    id: " ",
                    model: " ",
                    year: " ",
                    make: " "
                }
            }

        })


    }
    onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState(() => {
            let newState = { ...this.state.carsFormData };

            newState[inputName] = newValue;

            console.log("newState", newState.model, { newState });

            return { carsFormData: newState };
        })
    }


    handleCars = (e) => {
       e.preventDefault();
        let carParam= this.props.match.params.id;
        
        if(carParam){
            carServices
            .updateCar(this.state.carsFormData)
            .then(this.onUpdateCarSuccess)
            .catch(this.onUpdateCarsError)
        }else{
            carServices
            .addCar(this.state.carsFormData)
            .then(this.onAddCarSuccess)
            .catch(this.onAddCarError)
        }

    }

    onAddCarSuccess = (response) => {

        console.log("submit is successful", response.config.data)
    }

    onAddCarError = (errResponse) => {

        console.log("submit error", errResponse)
    }

    onUpdateCarSuccess = (response) => {

        console.log("UPDATE successful", response.config.data)
    }

    onUpdateCarsError = (errResponse) => {

        console.log("UPDATE error", errResponse)
    }
    render() {

        return (
            <div className="container">
                <h1>Add Cars</h1>
                <div className="row">
                    <div className="col-md-3">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputModel" >
                                    Model
                                </label>
                                <input type="text"
                                    className="form-control"
                                    id="model"
                                    name="model"
                                    onChange={this.onFormFieldChanged}
                                    value={this.state.carsFormData.model || ""}
                                    placeholder="enter model"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputYear" >
                                    Year
                                </label>
                                <input type="text"
                                    className="form-control"
                                    id="year"
                                    name="year"
                                    onChange={this.onFormFieldChanged}
                                    value={this.state.carsFormData.year || ""}
                                    placeholder="enter year"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputMake" >
                                    Make
                                </label>
                                <input type="text"
                                    className="form-control"
                                    id="make"
                                    name="make"
                                    onChange={this.onFormFieldChanged}
                                    value={this.state.carsFormData.make || ""}
                                    placeholder="enter make"
                                />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={this.handleCars}>Submit</button>
                        </form>
                    </div>

                </div>

            </div>
        )
    }

}

export default AddCar;