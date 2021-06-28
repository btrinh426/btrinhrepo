import React from "react";
import * as friendService from "../services/friendService";
import * as skillService from "../services/skillService";
import SingleSkill from "./SingleSkill";

import {
  Form,
  FormGroup,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";

class FriendForm extends React.Component {
  state = {
    friendFormData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: true,
      primaryImage: "",
    },
    friendId: null,
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      const { friendFormData } = this.props.location.state;
      // another if statement to check if there's an id
      // but no state
      // do a get call with that id
      //
      if (friendFormData) {
        this.setState({
          friendFormData: {
            ...friendFormData,
            statusId: true,
            primaryImage: friendFormData.primaryImage,
          },
          friendId: friendFormData.id,
        });
      }
    }
    this.getSkillsForForm();
  }

  getSkillsForForm = () => {
    skillService
      .getAll()
      .then(this.onGetSkillsSuccess)
      .catch(this.onGetSkillsError);
  };

  handleSubmit = (values, { resetForm }) => {
    console.log(values);
    // var message = `Just Submitted the form with these values and will be clearing form.
    // ${JSON.stringify(values, null, 2)} `;
    //if you want to reset form you can use Formik's own method but you need to pass the object to reset the form to
    // this.setState({ message });
    var friendFormData = { ...values };
    friendFormData.skillIds = [];

    this.state.skills.forEach((skill) => {
      if (skill.hasChecked === true) {
        friendFormData.skillIds.push(skill.id);
      }
    });

    if (this.state.friendId) {
      friendService
        .edit(this.state.friendId, friendFormData)
        .then(this.onEditSuccess)
        .catch(this.onEditError);
    } else {
      friendService
        .add(friendFormData)
        .then(this.onAddSuccess)
        .catch(this.onAddError);
    }

    // resetForm(this.state.friendFormData);
  };

  onAddSuccess = (response) => {
    console.log({ friend: response });
    this.props.history.push("/friends");

    // this.setState({
    //   friendFormData: {
    //     title: "",
    //     bio: "",
    //     summary: "",
    //     headline: "",
    //     slug: "",
    //     primaryImage: "",
    //   },
    //   friendId: null,
    // });
  };

  onAddError = (errResponse) => {
    console.warn({ error: errResponse.config });
  };

  onEditSuccess = (response) => {
    console.log({ friend: response });
    this.props.history.location.pathname("/friends");
    // this.setState({
    //   friendFormData: {
    //     title: "",
    //     bio: "",
    //     summary: "",
    //     headline: "",
    //     slug: "",
    //     primaryImage: "",
    //   },
    // });
  };

  onEditError = (errResponse) => {
    console.warn({ error: errResponse.config });
  };

  onGetSkillsSuccess = (response) => {
    console.log({ friend: response });
    // store the skills somewhere - stored in state as mappedSkills 👇
    const skills = response.data.items;
    const totalSkills = response.data.items.length;

    // loop through existing skills and check if skills have a true or false value
    // if no value then you add prop that is false
    for (let index = 0; index < skills.length; index++) {
      const skill = skills[index];
      skill.hasChecked = false;
    }

    console.log(skills);
    this.setState((prevState) => {
      return {
        mappedSkills: skills.map(this.mapSkill),
        totalSkills,
        skills,
      };
    });
  };

  onGetSkillsError = (errResponse) => {
    console.warn({ error: errResponse.config });
  };

  skillCheckValue = (aSkill, skillName) => {
    console.log(aSkill);
    // shallow copy of skills
    // then in that logic, shallow copy of skill
    // first copy the array
    // find the member you want to change, and copy that skill
    // after you copy that skill, you flip the flag

    // change the state appropriately
    // use the state call, using prevstate

    this.setState((prevState) => {
      var skills = [...this.state.skills];
      for (let index = 0; index < skills.length; index++) {
        if (skillName === skills[index].name) {
          skills[index].hasChecked = !skills[index].hasChecked;
        }
      }

      return { skills };
    });
  };

  mapSkill = (oneSkill) => {
    // var result = oneFriend.name;
    // return result;
    return (
      <React.Fragment key={`SkillId-${oneSkill.id}`}>
        <SingleSkill skill={oneSkill} toggleSkill={this.skillCheckValue} />
      </React.Fragment>
    );
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let friendFormData = { ...this.state.friendFormData };

      friendFormData[inputName] = newValue;

      return { friendFormData };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Required"),
            bio: Yup.string().required("Required"),
            statusId: Yup.string().required("Required"),
          })}
          initialValues={this.state.friendFormData}
          onSubmit={this.handleSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              isValid,
              isSubmitting,
            } = props;
            return (
              <Form onSubmit={handleSubmit} className={"col-md-6 pt-4"}>
                <FormGroup>
                  <Label>Title</Label>
                  <Field
                    name="title"
                    type="text"
                    // value={this.state.friendFormData.title}
                    values={values.title}
                    placeholder="Enter title"
                    autoComplete="off"
                    className={
                      errors.title && touched.title
                        ? "form-control error"
                        : "form-control"
                    }
                    id="titleField"
                    // onChange={this.onFormFieldChanged}
                  />
                  {errors.title && touched.title && (
                    <span className="input-feedback text-danger">
                      {errors.title}
                    </span>
                  )}
                  {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </FormGroup>
                <FormGroup>
                  <Label>Bio</Label>
                  <Field
                    name="bio"
                    type="textarea"
                    // value={this.state.friendFormData.bio}
                    values={values.bio}
                    placeholder="Enter bio"
                    autoComplete="off"
                    className={
                      errors.bio && touched.bio
                        ? "form-control error"
                        : "form-control"
                    }
                    id="bioField"
                    // onChange={this.onFormFieldChanged}
                  />
                  {errors.bio && touched.bio && (
                    <span className="input-feedback text-danger">
                      {errors.bio}
                    </span>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Summary</Label>
                  <Field
                    name="summary"
                    type="text"
                    // value={this.state.friendFormData.summary}
                    values={values.summary}
                    placeholder="Enter summary"
                    autoComplete="off"
                    className={
                      errors.summary && touched.summary
                        ? "form-control error"
                        : "form-control"
                    }
                    id="summaryField"
                    // onChange={this.onFormFieldChanged}
                  />
                  {errors.summary && touched.summary && (
                    <span className="input-feedback text-danger">
                      {errors.summary}
                    </span>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Headline</Label>
                  <Field
                    name="headline"
                    type="text"
                    // value={this.state.friendFormData.headline}
                    values={values.headline}
                    placeholder="Enter headline"
                    autoComplete="off"
                    className={
                      errors.headline && touched.headline
                        ? "form-control error"
                        : "form-control"
                    }
                    id="headlineField"
                    // onChange={this.onFormFieldChanged}
                  />
                  {errors.headline && touched.headline && (
                    <span className="input-feedback text-danger">
                      {errors.headline}
                    </span>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Slug</Label>
                  <Field
                    name="slug"
                    type="text"
                    // value={this.state.friendFormData.slug}
                    values={values.slug}
                    placeholder="Enter slug"
                    autoComplete="off"
                    className={
                      errors.slug && touched.slug
                        ? "form-control error"
                        : "form-control"
                    }
                    id="slugField"
                    // onChange={this.onFormFieldChanged}
                  />
                  {errors.slug && touched.slug && (
                    <span className="input-feedback text-danger">
                      {errors.slug}
                    </span>
                  )}
                </FormGroup>
                <div>{this.state.mappedSkills}</div>
                <FormGroup>
                  <Label>Primary Image URL</Label>
                  <Field
                    name="primaryImage"
                    type="text"
                    // value={this.state.friendFormData.primaryImage}
                    values={values.primaryImage}
                    placeholder="Enter primaryImage"
                    autoComplete="off"
                    className={
                      errors.primaryImage && touched.primaryImage
                        ? "form-control error"
                        : "form-control"
                    }
                    id="primaryImageField"
                    // onChange={this.onFormFieldChanged}
                  />
                  {errors.primaryImage && touched.primaryImage && (
                    <span className="input-feedback text-danger">
                      {errors.primaryImage}
                    </span>
                  )}
                </FormGroup>
                {/* <button type="submit" className="btn btn-primary" id="submitFriend">Submit</button>
                    <button type="submit" disabled className="btn btn-primary" id="editFriend">Edit</button> */}
                <Button
                  type="submit"
                  className="btn btn-primary"
                  value="Submit"
                  id="submitFriend"
                  disabled={!isValid || isSubmitting}
                >
                  Submit
                </Button>
                {/* <input
                    type="submit"
                    className="btn btn-primary"
                    value="Edit"
                    id="editFriend"
                    /> */}
              </Form>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}

export default FriendForm;
