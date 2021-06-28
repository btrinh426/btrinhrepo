import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import axios from "axios"
export class Products extends React.Component {
    state = {
        productInfo: {

            name: "",
            manufacturer: "",
            description: "",
            cost: (Number)
        }
    };

    onFormFieldChanged = (e) => {

        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.value;
        //console.log({ newValue, currentTarget });
        this.setState(() => {
            let newState = {};

            newState[inputName] = newValue;
            return newState;
        });
    }

    submitHandler = e => {
        e.preventDefault()

        console.log(this.state)
        axios
            .post("https://api.remotebootcamp.dev/api/entities/products", this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {

        return (
            <Form onSubmit={this.submitHandler}>

                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        onChange={this.onFormFieldChanged}
                        value={this.state.name}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicManufacturer">
                    <Form.Label>Manufacturer</Form.Label>
                    <Form.Control
                        type="manufacturer"
                        onChange={this.onFormFieldChanged}
                        value={this.state.manufacturer}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDecription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="description"
                        onChange={this.onFormFieldChanged}
                        value={this.state.description}
                    />
                </Form.Group>


                <Form.Group controlId="formBasicCost">
                    <Form.Label>Cost</Form.Label>
                    <Form.Control
                        type="description"
                        onChange={this.onFormFieldChanged}
                        value={this.state.cost}
                    />
                </Form.Group>


                <Button variant="primary" type="submit" >
                    Submit
        </Button>
            </Form>
        )
    }
}

export default Products;