import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { add } from "./services/entityService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class AddEntity extends Component {
  state = {
    formData: {
      name: "",
      manufacturer: "",
      description: "",
      cost: 0,
    },
  };
  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    this.setState(() => {
      let formData = { ...this.state.formData };
      formData[inputName] = newValue;
      return { formData };
    });
  };
  onSubmitClick = (e) => {
    console.log(e.currentTarget)
    e.preventDefault();
    let data = this.state.formData;
    add(data).then(this.onAddSuccess).catch(this.onAddErr);
  };
  onAddSuccess = (response) => {
    let id = response.data.item;
    toast.success(`The Product was created with the following id: ${id}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  render() {
    return (
      <Form>
        <div>
          <h3 className="text-secondary text-center">Add Entity:</h3>
        </div>
        <FormGroup row>
          <Label for="name" className="text-right" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.name}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="manufacturer" className="text-right" sm={2}>
            Manufacturer
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="manufacturer"
              id="manufacturer"
              placeholder="manufacturer"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.manufacturer}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" className="text-right" sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="description"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.description}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="cost" className="text-right" sm={2}>
            Cost
          </Label>
          <Col sm={10}>
            <Input
              type="integer"
              name="cost"
              id="cost"
              placeholder="cost"
              onChange={this.onFormFieldChanged}
              value={this.state.formData.cost}
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button
              className="btn btn-primary float-right"
              onClick={this.onSubmitClick}
            >
              Submit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
export default AddEntity;
