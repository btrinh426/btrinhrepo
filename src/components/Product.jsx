import React, { Component } from "react"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { createEntity } from "../services/userServices"; 

class Product extends Component {

    constructor(props){
        super(props);
        this.state = {
            productName: "",
            manufacturer: "",
            description: "",
            cost: null
        };
    }

    onButtonClick(e){
        console.log(this.state)
        createEntity({
            productName: this.state.productName,
            manufacturer: this.state.manufacturer,
            description: this.state.description,
            cost: parseInt(this.state.cost)
        }).then((response) => {
            toast("Product Created!" + " " + response.data.item, {
                className: "Success-toast",
                draggable: true,
                position: toast.POSITION.TOP_CENTER
            })

        }).catch((error) => {
            if (error) {
                toast("Creation Unsuccessful. Please try again.", 
                {
                    className: "error-toast",
                    draggable: true,
                    position: toast.POSITION.TOP_CENTER,
                })
            }    
        })
    }

    onInputChange (e) {
        const stateObj = {}
        stateObj[e.currentTarget.id] = e.currentTarget.value
        this.setState(stateObj)
    }


    render() {
        return (
            <form>
                <div className="col-md-4 offset-md-4">
                    <div>
                    <div className="header">
                        <h1>Create a Product</h1>

                    </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="productName" aria-describedby="Product Name" onChange={this.onInputChange.bind(this)}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                        <input type="text" className="form-control" id="manufacturer" aria-describedby="manufacturer" onChange={this.onInputChange.bind(this)}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" rows="3" onChange={this.onInputChange.bind(this)}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cost" className="form-label">Cost</label>
                        <input type="text" className="form-control" id="cost" aria-describedby="cost" onChange={this.onInputChange.bind(this)}></input>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.onButtonClick.bind(this)}>Create</button>
                </div>
            </form>
        )
    }
        
}

export default Product