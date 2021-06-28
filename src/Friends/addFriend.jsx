import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { addFriend } from '../services/friendsService';

class AddContact extends Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      status: 1,
      skills: "",
      primaryImage: ""
    }
  };

  onUpdateClick = (e) => {
    e.preventDefault();
    console.log("Adding friend information");
    this.props.history.push("/friends/add")
    let data = this.state.formData;
    addFriend(data)
        .then(this.onAddSuccess)
        .catch(this.onAddErr)
  };

  onAddErr(response) {
    console.warn({ error: response });
  }

  onAddSuccess = () => {
    console.log('Friend added successfully')
    this.props.history.push("/friends")
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

  render() {
    return (
      <Form>
        <div>
          <h3 className="text-secondary text-center">User Profile</h3>
        </div>

        <FormGroup row>
          <Label for="title" className="text-right" sm={2}>
            Title
          </Label>
          <Col sm={10}>
            <Input type="text" name="title" id="title" placeholder="Mr." onChange={this.onFormFieldChanged}
                    value={this.state.title}/>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="bio" className="text-right" sm={2}>
            Bio
          </Label>
          <Col sm={10}>
            <Input
              type="textarea"
              name="bio"
              id="bio"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              onChange={this.onFormFieldChanged}
              value={this.state.bio}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="summary" className="text-right" sm={2}>
            Summary
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="summary"
              id="summary"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Some other stuff in here also."
              onChange={this.onFormFieldChanged}
              value={this.state.summary}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="headline" className="text-right" sm={2}>
            Headline
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="headline"
              id="headline"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              onChange={this.onFormFieldChanged}
              value={this.state.headline}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="slug" className="text-right" sm={2}>
            Slug
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="slug"
              id="slug"
              placeholder="http://hectorswebsite.com"
              onChange={this.onFormFieldChanged}
              value={this.state.slug}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="status" className="text-right" sm={2}>
            Status
          </Label>
          <Col sm={10}>
            <Input type="number" name="status" id="status" placeholder="1" onChange={this.onFormFieldChanged}
                    value={this.state.status} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="skills" className="text-right" sm={2}>
            Skills
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="skills"
              id="skills"
              placeholder="React, .Net, Node.js, SQL"
              onChange={this.onFormFieldChanged}
              value={this.state.skills}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="primaryImage" className="text-right" sm={2}>
            Primary Image
          </Label>
          <Col sm={10}>
            <Input type="file" name="primaryImage" id="primaryImage" onChange={this.onFormFieldChanged}
                    value={this.state.primaryImage}/>
            <FormText color="muted">Upload image file here</FormText>
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button
              className="btn btn-primary float-right"
              onClick={this.onUpdateClick}
            >
              Update
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
};

export default AddContact;