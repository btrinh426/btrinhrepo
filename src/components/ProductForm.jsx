import React from "react";
import * as productService from "../services/productService";
import Swal from "sweetalert2";

class Product extends React.Component
{
    state = {
        formData: {
            name: "",
            manufacturer: "",
            description: "",
            cost: ""
        }
    };

    onSubmitClicked = (e) =>
    {
        e.preventDefault();

        this.setState(() => {
            let updatedFormData = {...this.state.formData};
            
            updatedFormData.cost = parseInt(updatedFormData.cost);

            return { formData: updatedFormData };
        });

        productService.add(this.state.formData)
            .then(this.onAddProdSuccess)
            .catch(this.onAddProdError);

        productService.get()
            .then(this.onGetSuccess)
            .catch(this.onGetError);

    }

    onGetSuccess = (response) =>
    {
        console.log('Get Success', response)
    }
    onGetError = (err) =>
    {
        console.error(err);
    }

    onAddProdSuccess = (response) =>
    {
        console.log("Add Success", response);

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `You successfully added a product, id: ${response.data.item}!`
          });
    }
    onAddProdError = (err) =>
    {
        console.error(err);
    }

    onFormFieldChange = (e) =>
    {
        let target = e.target;
        let name = target.name;
        let value = target.value;

        this.setState(() => {
            let updatedFormData = {...this.state.formData};
            
            updatedFormData[name] = value;

            return { formData: updatedFormData };
        });
    }

    render() {
        return ( 
            <main role="main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 p-5">
                            <div>
                                <h2 className="text-muted">Product</h2>
                            </div>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="name"
                                        onChange={this.onFormFieldChange} 
                                        placeholder="Enter name"
                                        value={this.state.formData.name} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="manufacturer">Manufacturer:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="manufacturer"
                                        onChange={this.onFormFieldChange} 
                                        placeholder="Enter manufacturer"
                                        value={this.state.formData.manufacturer} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="description"
                                        onChange={this.onFormFieldChange} 
                                        placeholder="Enter description"
                                        value={this.state.formData.description} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cost">Cost:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="cost"
                                        onChange={this.onFormFieldChange}  
                                        placeholder="Enter cost"
                                        value={this.state.formData.cost}  
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    onClick={this.onSubmitClicked}
                                    >
                                        Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Product;
