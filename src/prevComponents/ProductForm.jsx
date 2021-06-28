import React from 'react';
import TextInput from "./Input Components/TextInput";
import EntityServices from '../scripts/entityServices';
import Misc from '../scripts/misc'
import Form from './Input Components/Form'

class ProductForm extends React.Component {

    constructor(props) {
        super(props)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    };

    state = {
        payload: {
            name: "",
            manufacturer: "",
            description: "",
            cost: ""
        }
    };

    getInputArray(){
        const inputArray = [
            {
                name: "name",
                placeholder: "Product Name"
            },
            {
                name: "manufacturer",
                placeholder: "Product Manufacturer"
            },
            {
                name: "description",
                placeholder: "Product Description"
            },
            {
                name: "cost",
                placeholder: "Product Cost"
            }
        ];

        return inputArray;
    }

    onFormSubmit(){
        EntityServices.entityAdd(this.state.payload, "Products")
            .then(this.onProductAddSuccess)
            .catch((response)=>{console.log(response)});
    }

    onProductAddSuccess(response){
        console.log({response});
        Misc.renderToast("success", "SUCCESS\nID: " + response.data.item);
    }

    render(){
        return (
            <React.Fragment>
                <Form inputArray={this.getInputArray()} getFormState={this.state} setFormState={p => {this.setState(p)}} formObjPath={["payload"]} onFormSubmit={this.onFormSubmit}></Form>
            </React.Fragment>
        );
    }
}

export default ProductForm;