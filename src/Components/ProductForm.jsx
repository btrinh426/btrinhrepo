import React, {Component} from "react";
import { addProduct } from "../services/productsService";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

class ProductForm extends Component {

    state = {
        formData: {
            name: "",
            manufacturer: "",
            description: "",
            cost: 0
        }
    };

    onFormFieldChange = (e) => {
        // console.log("formFieldChange", e)
        let currentTarget = e.currentTarget
        let newValue = currentTarget.value
        let inputName = currentTarget.name

        if (currentTarget.type === "number") {
            newValue = parseInt(newValue)
        }

        this.setState(()=> {
            let formData = {...this.state.formData}

            formData[inputName] = newValue

            return {formData}
        })

    };

    onSubmit = (e) => {
        e.preventDefault()
        console.log("submit clicked!")

        let formData = this.state.formData

        addProduct(formData)
            .then(this.onAddProductSuccess)
            .catch(this.onAddProductError)
    };

    onAddProductSuccess = (res) => {
        console.log("addProduct success!", res)
        
        let productId = res.data.item
        toast.success(`Success! Product ID: ${productId}`)
    };

    onAddProductError = (err) => {
        console.log("addProduct error.", err.response)
        toast.error("Oops, something went wrong.")
    };

    render(){
        return (
            <div>
            <div className="page-header">
                <h3>Product Form</h3>
            </div>
            <div className="card" style={{width: "50rem"}}>
                <div className="card-body">
                <form>
                    <div className="form-group row">
                        <label htmlFor="inputProductName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name"
                                name="name"
                                value={this.state.formData.name}
                                onChange={this.onFormFieldChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputManufacturer" className="col-sm-2 col-form-label">Manufacturer</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="manufacturer"
                                name="manufacturer"
                                value={this.state.formData.manufacturer}
                                onChange={this.onFormFieldChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="description"
                                name="description"
                                value={this.state.formData.description}
                                onChange={this.onFormFieldChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputCost" className="col-sm-2 col-form-label">Cost</label>
                        <div className="col-sm-10">
                            <input 
                                type="number" 
                                className="form-control" 
                                id="cost"
                                name="cost"
                                value={this.state.formData.cost}
                                onChange={this.onFormFieldChange}
                            />
                        </div>
                    </div>
                   
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        id="submit-button" 
                        onClick={this.onSubmit}
                        >Submit
                    </button>
                </form>
                </div>
             </div>
             
        </div>
        
        )
    }
};

export default ProductForm;