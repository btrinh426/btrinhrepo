import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Button } from "reactstrap";
import * as userService from "./userService";

class Friends extends React.Component {
  state = {
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    status: "",
    skills: "",
    avatar: "",
  };

  aFriend = () => {
    userService
      .makeAFriend(this.state)
      .then(this.onGetSuccess)

      .catch(this.onGetError);
  };

  onGetSuccess = (response) => {
    console.log(response);
  };

  onGetError = (response) => {
    console.log(response);
  };

  friend = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState(() => {
      let newState = {};

      newState[name] = value;
      console.log({ newState });
      return newState;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Form>
          <FormGroup>
            <Label for="exampleTitle">Title</Label>
            <Input
              type="title"
              name="title"
              placeholder="with a placeholder"
              value={this.state.title}
              onChange={this.friend}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleText">Bio</Label>
            <Input
              type="bio"
              name="bio"
              placeholder="with a placeholder"
              value={this.state.bio}
              onChange={this.friend}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleSummary">Summary</Label>
            <Input
              type="summary"
              name="summary"
              placeholder="with a placeholder"
              value={this.state.summary}
              onChange={this.friend}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleHeadline">Headline</Label>
            <Input
              type="headline"
              name="headline"
              placeholder="with a placeholder"
              value={this.state.headline}
              onChange={this.friend}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleSlug">Slug</Label>
            <Input
              type="slug"
              name="slug"
              placeholder="with a placeholder"
              value={this.state.slug}
              onChange={this.friend}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleNumber">Status</Label>
            <Input
              type="number"
              name="status"
              placeholder="number placeholder"
              value={this.state.status}
              onChange={this.friend}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleSkills">Skills</Label>
            <Input
              type="skills"
              name="skills"
              placeholder="with a placeholder"
              value={this.state.skills}
              onChange={this.friend}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleFile">Upload Image</Label>
            <Input
              type="file"
              name="file"
              //   value={this.state.avatar}
              //   onChange={this.friend}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampletext">Image</Label>
            <Input
              type="avatar"
              name="avatar"
              placeholder="with a placeholder"
              value={this.state.avatar}
              onChange={this.friend}
            />
          </FormGroup>
        </Form>
        <Button
          color="info"
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          onClick={this.aFriend}
        >
          Add
        </Button>{" "}
        <Button
          color="warning"
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          Edit
        </Button>{" "}
        <Button
          color="danger"
          // onClick={this.onButtonClicked.bind(this)}
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          Delete
        </Button>{" "}
      </React.Fragment>
    );
  }
}

export default Friends;
