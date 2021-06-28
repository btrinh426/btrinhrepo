import React, { Component } from 'react';
import { add } from '../services/techService';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
class AddCompany extends Component {
    state = {
        formData: [
          {
            name: "name",
            profile: "profile ",
            summary: "summary",
            headline: "headline",
            contactInformation: "contact information",  
            slug: "slug",
            statusId: "active",
            images: [
                {
                  imageTypeId: 0,
                  imageUrl: ""
                }
              ],
              urls: [
                ""
              ],
              tags: [
                ""
              ],
              friendIds: [
                0
              ]
            },
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
        console.log("Submitting company information");
        let data = this.state.formData;
        add(data).then(this.onAddCompanySuccess).catch(this.onAddCompanyError);
    };
    onAddCompanyError = (err) => {
        console.error(err);
    };
    onAddCompanySuccess = (response) => {
        console.log('response data from successful ajax call to post a company: ', response.data);
        // this.props.history.push("/companies")
    };
    render() {
        return (
            <React.Fragment>
                <h1 className="text-center">Add a Company</h1>
                <div className="container text-center">
                    <Form>
                <FormGroup className="row top-buffer">
                    <Label for="companyTitle" sm={2}>Title</Label>
                    <Col sm={10}>
                        <Input type="text" name="companyTitle" id="companyTitle" placeholder="company title" onChange={this.onFormFieldChanged}
                    value={this.state.formData.title}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="description" sm={2}>Description</Label>
                    <Col sm={10}>
                        <Input type="text" name="description" id="description" placeholder="company description" onChange={this.onFormFieldChanged}
                    value={this.state.formData.description}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="summary" sm={2}>Summary</Label>
                    <Col sm={10}>
                        <Input type="text" name="summary" id="summary" placeholder="company summary" onChange={this.onFormFieldChanged}
                    value={this.state.formData.summary}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="pay" sm={2}>Pay</Label>
                    <Col sm={10}>
                        <Input type="text" name="pay" id="pay" placeholder="company salary" onChange={this.onFormFieldChanged}
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
                    <Label for="techCompanyId" sm={2}>Tech Company Id</Label>
                    <Col sm={10}>
                        <Input type="integer" name="techCompanyId" id="techCompanyId" placeholder="tech company id" onChange={this.onFormFieldChanged}
                    value={this.state.formData.techCompanyId}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="name" sm={2}>Name</Label>
                    <Col sm={10}>
                        <Input type="text" name="name" id="name" placeholder="name" onChange={this.onFormFieldChanged}
                    value={this.state.formData.name}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="profile" sm={2}>Profile</Label>
                    <Col sm={10}>
                        <Input type="text" name="profile" id="profile" placeholder="profile" onChange={this.onFormFieldChanged}
                    value={this.state.formData.profile}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="headline" sm={2}>Headline</Label>
                    <Col sm={10}>
                        <Input type="text" name="headline" id="headline" placeholder="headline" onChange={this.onFormFieldChanged}
                    value={this.state.formData.headline}/>
                    </Col>
                </FormGroup>
                <FormGroup className="row top-buffer">
                    <Label for="contactInformation" sm={2}>Contact Information</Label>
                    <Col sm={10}>
                        <Input type="text" name="contactInformation" id="contactInformation" placeholder="contactInformation" onChange={this.onFormFieldChanged}
                    value={this.state.formData.contactInformation}/>
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
export default AddCompany;