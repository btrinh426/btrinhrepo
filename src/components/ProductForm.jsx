import React from "react";
import * as productService from "../services/productService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


class ProductForm extends React.Component {
    state = {
        Name: "",
        Manufacturer: "",
        Description: "",
        Cost: 0
    }

    getProductData = (e) => {
        let currentTarget = e.currentTarget;
        let targetValue = currentTarget.value;
        let targetName = currentTarget.name;
        this.setState(() => {
            let newState = {};
            newState[targetName] = targetValue;
            return newState;
        })
    }


    onProductSubmit = (e) => {
        e.preventDefault()
        productService.addProduct(this.state)
            .then(this.onSubmitSuccess)
            .catch(this.onSubmitError)

    }

    onSubmitSuccess = (response) => {
        console.log(response)
        this.successNotification(response.data.item);
    }
    successNotification = (id) => {
        toast.success('added successfully id number: ' + id, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    }
    onSubmitError = (response) => {
        console.error(response)
        this.errorNotification();
    }
    errorNotification = () => {
        toast.error('something went wrong please look over the information and try again please', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    }


    
    render() {
        return (
            <React.Fragment>
            <div className="wrapper d-flex align-items-stretch">
            <div className="w-50 mx-auto shadow p-3 mb-5 bg-white rounded">
                <div className="title mx-auto text-center shadow p-3 mb-5 bg-white rounded mt-5">
                    <h2>Cereal Form</h2>
                </div>
                <form id="form-content mt-5">
                <div className="form-group"> 
                    <label>Name</label>
                    <input type="text" name="Name" value={this.state.Name} onChange={this.getProductData} className="form-control"  placeholder="Enter Cereal Name" />
                </div>
                <div className="form-group">
                    <label>Manufacturer</label>
                    <input type="text" name="Manufacturer" value={this.state.Manufacturer} onChange={this.getProductData} className="form-control"  placeholder="ex. Kellogs, General Mills, Quaker Oats" />                       
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" name="Description" value={this.state.Description} onChange={this.getProductData} className="form-control"  placeholder="Description of cereal" />
                </div>
                <div className="form-group">
                    <label>Cost</label>
                    <input type="text" name="Cost" value={this.state.Cost} onChange={this.getProductData} className="form-control"  placeholder="Cost of product" />
                </div>
                <button type="submit"  id="submitButton" onClick={this.onProductSubmit} className="btn btn-primary">Submit</button>
                </form>
                
            </div>
            </div>
            </React.Fragment>
        )
        
    }
}



export default ProductForm