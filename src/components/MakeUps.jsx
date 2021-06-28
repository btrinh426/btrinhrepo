import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as userService from "../Service/userService";



export class MakeUps extends Component {
  state = {
    formInfo: {
      title: "",
      body: "",
      userId: ""
    },
  };

  //  need AJax call

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;
    //console.log({ newValue, currentTarget });

    this.setState((prevState) => {
      let formInfo = { ...prevState.formInfo };

      formInfo[inputName] = newValue;
      return { formInfo };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    userService
      .formInput(this.state.formInfo)
      .then(this.onformInputSuccess)
      .catch(this.onformInputError);

    // make axios call. Bring in the file and call the method
  };

  onformInputSuccess = (response) => {
    console.log(response);
    
  };

  onformInputError = (response) => {
    console.log(response);
  };

  

  

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>title</Form.Label>
          <Form.Control
            name="title"
            onChange={this.onFormFieldChanged}
            value={this.state.formInfo.title}
          />
        </Form.Group>

        <Form.Group controlId="formBasicBody">
          <Form.Label>body</Form.Label>
          <Form.Control
            name="body"
            onChange={this.onFormFieldChanged}
            value={this.state.formInfo.body}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>userId</Form.Label>
          <Form.Control
            name="userId"
            onChange={this.onFormFieldChanged}
            value={this.state.formInfo.userId}
          />
        </Form.Group>


        <Button 
        variant="primary" 
       
        {...this.props} 
        onClick={this.submitHandler}>
        
          Submit
        </Button>

      
        
      </Form>
    );
  }
}

export default MakeUps;
