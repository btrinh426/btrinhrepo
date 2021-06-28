import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import * as userService from "../Service/userService";
import {toast, ToastContainer} from "react-toastify"




export class ProductFrom extends React.Component {
    state = {
        productInfo: {

            name: "",
            manufacturer: "",
            description: "",
            cost:(Number),
            id: (Number)
        }

    };

    onFormFieldChanged = (e) => {

        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;
        


        this.setState((prevState) => {
            let productInfo = {...prevState};

            productInfo[inputName] = newValue;
            return {productInfo};
        });
    };


    


    sumbitClicked =(e) => {
        e.preventDefault()
        console.log("I was clicked!!!");
        userService
          .addEntity(this.state.productInfo)
          .then(this.onAddEntitySuccess)
          .catch(this.onAddEntityError);
    }

    onAddEntitySuccess = (response) => {
        console.log(response)
      toast.success("Here's your product!!!",response.id);

    }

    onAddEntityError = (response) => {
        console.log(response)
      toast.error("Please complete form!!!",response);
    }


    render() {

        return (
            <Form >

                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        onChange={this.onFormFieldChanged}
                        value={this.state.productInfo.name}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicManufacturer">
                    <Form.Label>Manufacturer</Form.Label>
                    <Form.Control
                        name="manufacturer"
                        onChange={this.onFormFieldChanged}
                        value={this.state.productInfo.manufacturer}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDecription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="description"
                        onChange={this.onFormFieldChanged}
                        value={this.state.productInfo.description}
                    />
                </Form.Group>


                <Form.Group controlId="formBasicCost">
                    <Form.Label>Cost</Form.Label>
                    <Form.Control
                        name="cost"
                        onChange={this.onFormFieldChanged}
                        value={this.state.productInfo.value}
                    />
                </Form.Group>


                <Button variant="primary" type="submit" onClick={this.sumbitClicked} >
                    Submit
        </Button>
        <ToastContainer/>
            </Form>
        )
    }
}

export default ProductFrom