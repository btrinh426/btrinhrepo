import React, { Component } from 'react';
import { add } from '../services/jobService';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class AddJob extends Component {
    state = {
        formData: [
          {
            title: "title",
            description: "description",
            summary: "summary",
            pay: "pay",
            slug: "slug",
            statusId: "status id",
            techCompanyId: 0,
            skills: [
              "skills"
            ]
          }
        ],
        isAdded: false
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
    onSubmitClicked = (e) => {
        e.preventDefault();
        console.log("Submitting job information");
        let data = this.state.formData;
        add(data).then(this.onAddJobSuccess).catch(this.onAddJobError);
    };
    onAddJobError = (err) => {
        console.error(err);
        toast.error('Error! The job was not successfully created!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    };
    onAddJobSuccess = (response) => {
        console.log('response data from successful ajax call to post a job: ', response.data);
        // this.props.history.push("/jobs")
        toast.success('The job was successfully added!', {
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
            <React.Fragment>
                <h1 className="text-center">Add a Job</h1>
                <div className="container text-center">
                    <Form>
                <FormGroup className="row top-buffer">
                    <Label for="jobTitle" sm={2}>Title</Label>
                    <Col sm={10}>
                        <Input type="text" name="jobTitle" id="jobTitle" placeholder="job title" onChange={this.onFormFieldChanged}
                    value={this.state.formData.title}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="description" sm={2}>Description</Label>
                    <Col sm={10}>
                        <Input type="text" name="description" id="description" placeholder="job description" onChange={this.onFormFieldChanged}
                    value={this.state.formData.description}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="summary" sm={2}>Summary</Label>
                    <Col sm={10}>
                        <Input type="text" name="summary" id="summary" placeholder="job summary" onChange={this.onFormFieldChanged}
                    value={this.state.formData.summary}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="pay" sm={2}>Pay</Label>
                    <Col sm={10}>
                        <Input type="text" name="pay" id="pay" placeholder="job salary" onChange={this.onFormFieldChanged}
                    value={this.state.formData.pay}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="slug" sm={2}>Slug</Label>
                    <Col sm={10}>
                        <Input type="text" name="slug" id="slug" placeholder="slug" onChange={this.onFormFieldChanged}
                    value={this.state.formData.slug}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="statusId" sm={2}>Status Id</Label>
                    <Col sm={10}>
                        <Input type="integer" name="statusId" id="statusId" placeholder="status id" onChange={this.onFormFieldChanged}
                    value={this.state.formData.statusId}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="techjobId" sm={2}>Tech job Id</Label>
                    <Col sm={10}>
                        <Input type="integer" name="techjobId" id="techjobId" placeholder="tech job id" onChange={this.onFormFieldChanged}
                    value={this.state.formData.techjobId}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer" check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button className="btn btn-primary" onClick={this.onSubmitClicked}>Submit</Button>
                    </Col>
                </FormGroup>
            </Form>
            </div>
            </React.Fragment>
        );
    }
};
export default AddJob;