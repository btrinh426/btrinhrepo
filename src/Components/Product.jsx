import React from "react"
import { toast } from "react-toastify";
import * as carService from "../services/carService"

class Product extends React.Component {

    state = {
        car: { 
            Name: " ", 
            Manufacturer: " ",
            Description: " ",
            Cost: " " 
            }
        };
onCarFormChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState((prevState) => {
        let car = { ...prevState.car };

        car[inputName] = newValue;

        return { car }
    })
};
               

onCarSubmitClicked = () => {
    console.log("Car form clicked", new Date())
    let payload = {...this.state.car}
    carService
    .newCars(payload)
        .then(this.onFormSuccess)
        .catch(this.onFormError)  
};

onFormSuccess = () => {
    console.log("Form Submitted")
    toast.success("Form Submitted!",  {
        position: "top-right",
        pauseOnHover: true,
        draggable: true,
        closeOnClick: true,
    }); 
 
}
onFormError = (err) => {
    console.log(err);
    toast.success("Oops! Submission Failed", {
        position: "top-right",
        pauseOnHover: true,
        draggable: true,
        closeOnClick: true,
    }); 

}

    render(){
        return (
        <div className="m-container">
          <form>
             <h1>Car Submission Form</h1>
                <div className="col-3">
                    <label htmlFor="email">Name</label>
                    <input
                        type='text'
                        className='form-control'
                        name='make'
                        placeholder='Enter Model'
                        onChange={this.onCarFormChanged}
                        value={this.state.car.name}
                    />
                </div> 

                    <div className="col-3">
                    <label htmlFor="email">Manufacturer</label>
                    <input
                        type='text'
                        className='form-control'
                        name='model'
                        placeholder='Enter Manufacturer'
                        onChange={this.onCarFormChanged}
                        value={this.state.car.manufacturer}
                    />
                </div> 
                    
                
                <div className="col-3">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name='color' 
                        placeholder="Enter Color"
                        onChange={this.onCarFormChanged}
                        value={this.state.car.description} 
                    />
                </div>
                <div className="col-3">
                    <label htmlFor="exampleInputPassword1">Cost</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name='color' 
                        placeholder="Enter Estimate Cost"
                        onChange={this.onCarFormChanged}
                        value={this.state.car.cost} 
                    />
                </div>   

                 <div className="col-3 p-3 bg " />
                <button 
                   type="button" 
                   className="btn btn-primary btn-md"
                   onClick={this.onCarSubmitClicked}>Submit Car Info</button>
                   &nbsp;
                  

            </form>
        </div> 
        )
    }
};

export default Product