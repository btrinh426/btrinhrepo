import React from "react";
import Footer from "./Footer";
import productServices from "../services/productServices"
import { toast } from "react-toastify";

class ProductForm extends React.Component {

    state = {
        name: "",
        manufacturer: "",
        description: "",
        cost: 0
    }

    onInputChange = (e) => {
       let currentTarget = e.currentTarget;
       let newValue = currentTarget.value;
       let inputName = currentTarget.name;
       //console.log({ newValue, currentTarget });

       this.setState(() => {
        let newState = {};

        newState[inputName] = newValue;

        return newState;
       });

    };

    productAddedSuccessfully = response => {
        toast.success("Product has been added")
        console.log("Pat yourself on the back")
    }

    productAddedError = response => {
        toast.error("Something went wrong")
        console.log("Panic!!!")
    }

    handleClick = () => {
        let payload = {
            "Name": this.state.name,
            "Manufacturer": this.state.manufacturer,
            "Description": this.state.description,
            "Cost": this.state.cost
        }

        productServices.create(payload)
            .then(this.productAddedSuccessfully)
            .catch(this.productAddedError)
    }


    render() {
        return (
            <React.Fragment>


                <div className="container">
                <div className="section">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="name"
                        onChange={this.onInputChange} 
                        value={this.state.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="manufacturer"
                        onChange={this.onInputChange} 
                        value={this.state.manufacturer}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="description"
                        onChange={this.onInputChange} 
                        value={this.state.description}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Cost</label>
                    <input 
                        className="form-control" 
                        type="number" 
                        name="cost"
                        onChange={this.onInputChange} 
                        value={this.state.cost}
                    />
                </div>

                <button type="button" onClick={this.handleClick} className="btn btn-danger">Create Product</button> 
                </div>
                </div>
                
                <Footer/>
            </React.Fragment>

        )
    }
}

export default ProductForm