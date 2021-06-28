import React from 'react';
import TextInput from "./Input Components/TextInput";
import EntityServices from '../scripts/entityServices';
import Misc from '../scripts/misc'

class ProductForm extends React.Component {
    //Needs these props
    //name --- placeholder --- getFormState --- setFormState --- formObjPath

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
            // <Form inputArray={this.getInputArray()} ></Form>
            <React.Fragment>
            {
            this.getInputArray().map((inputConf, i) => {
                            return <TextInput key={i} name={inputConf.name} placeholder={inputConf.placeholder} getFormState={this.state} setFormState={p => {this.setState(p)}} formObjPath={["payload"]}></TextInput>
            })}

            <button 
            name="submit-button" 
            type="button" 
            className="btn btn-primary" 
            onClick={this.onFormSubmit}
            >
            Submit
            </button>

            </React.Fragment>
        );
    }
}

export default ProductForm;