import React, { Component } from "react";
import {
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import { add, getById, updateById } from "../services/friendsService";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
const basicSchema = Yup.object().shape({
  title: Yup.string().min(2).max(120).required("Is Requied"),
  bio: Yup.string().min(2).max(700).required("Is Required"),
  summary: Yup.string().min(2).max(255).required("Is Requied"),
  headline: Yup.string().min(2).max(80).required("Is Requied"),
  slug: Yup.string().min(2).max(100).required("Is Requied"),
  statusId: Yup.string().min(1).max(100).required("Is Requied"),
  primaryImage: Yup.number()
    .min(0)
    .max(1000)
    .required("Is Requied")
    .positive()
    .integer(),
  skills: Yup.string().required("Is Requied"),
});
class AddFriend extends Component {
  state = {
    formData: {
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      primaryImage: 1,
      skills: [],
    },
  };
  onSubmitClick = (values) => {
    console.log("values to add friend", values);
    add(values).then(this.onAddSuccess).catch(this.onAddErr);
    // } else {
    //   let id = this.state.id;
    //   let data = this.state.formData;
    //   updateById(id, data)
    //     .then(this.onUpdateByIdSuccess)
    //     .catch(this.onUpdateByIdError);
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
  // componentDidMount() {
  //   let id = this.props.match.params.id;
  //   if (id) {
  //     getById(id).then(this.onGetByIdSuccess).catch(this.onGetByIdError);
  //   }
  // }
  // onGetByIdError = (err) => {
  //   console.error(err);
  // };
  // onGetByIdSuccess = (response) => {
  //   console.log(
  //     "response data from onGetByIdSuccess in addFriend.jsx: ",
  //     response.data.item
  //   );
  // update the state
  //   let updateFriend = response.data.item;
  //   this.setState(() => {
  //     let formData = { ...this.state.formData };
  //     formData["title"] = updateFriend.title;
  //     formData["bio"] = updateFriend.bio;
  //     formData["summary"] = updateFriend.summary;
  //     formData["headline"] = updateFriend.headline;
  //     formData["slug"] = updateFriend.slug;
  //     formData["status"] = updateFriend.status;
  //     formData["skills"] = updateFriend.skills;
  //     formData["primaryImage"] = updateFriend.primaryImage.imageUrl;
  //     // this.state.isEditing = true;
  //     // this.state.id = updateFriend.id;
  //     return { formData };
  //   });
  // };
  onAddErr(response) {
    console.warn({ error: response });
  }
  onAddSuccess = () => {
    console.log("Friend added successfully");
    this.props.history.push("/friends");
  };
  // onUpdateByIdError = (err) => {
  //   console.error(err);
  // };
  // onUpdateByIdSuccess = (response) => {
  //   console.log("onUpdateByIdSuccess response data: ", response);
  //   this.props.history.push("/friends");
  // };
  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={this.state.formData}
        onSubmit={this.onSubmitClick}
        onFormFieldChanged={this.onFormFieldChanged}
        validationSchema={basicSchema}
      >
        <Form className="col md-3">
          <div>
            <h3 className="text-secondary text-center">Add a Friend</h3>
          </div>
          <FormGroup row>
            <Label for="title" className="text-right" sm={2}>
              Title
            </Label>
            <Field type="text" name="title" className="form-control col md-3" />
            <ErrorMessage name="title" component="div" className="has-error" />
          </FormGroup>
          <FormGroup row>
            <Label for="bio" className="text-right" sm={2}>
              Bio
            </Label>
            <Field type="text" name="bio" className="form-control col md-3" />
            <ErrorMessage name="bio" component="div" className="has-error" />
          </FormGroup>
          <FormGroup row>
            <Label for="summary" className="text-right" sm={2}>
              Summary
            </Label>
            <Field
              type="text"
              name="summary"
              className="form-control col md-3"
            />
            <ErrorMessage
              name="summary"
              component="div"
              className="has-error"
            />
          </FormGroup>
          <FormGroup row>
            <Label for="headline" className="text-right" sm={2}>
              Headline
            </Label>
            <Field
              type="text"
              name="headline"
              className="form-control col md-3"
            />
            <ErrorMessage
              name="headline"
              component="div"
              className="has-error"
            />
          </FormGroup>
          <FormGroup row>
            <Label for="slug" className="text-right" sm={2}>
              Slug
            </Label>
            <Field type="text" name="slug" className="form-control col md-3" />
            <ErrorMessage name="slug" component="div" className="has-error" />
          </FormGroup>
          <FormGroup row>
            <Label for="statusId" className="text-right" sm={2}>
              StatusId
            </Label>
            <Field
              type="text"
              name="statusId"
              className="form-control col md-3"
            />
            <ErrorMessage
              name="statusId"
              component="div"
              className="has-error"
            />
          </FormGroup>
          <FormGroup row>
            <Label for="primaryImage" className="text-right" sm={2}>
              Primary Image
            </Label>
            <Field
              type="text"
              name="primaryImage"
              className="form-control col md-3"
            />
            <ErrorMessage
              name="primaryImage"
              component="div"
              className="has-error"
            />
          </FormGroup>
          <FormGroup row>
            <Label for="skills" className="text-right" sm={2}>
              Skills
            </Label>
            <Field
              type="text"
              name="skills"
              className="form-control col md-3"
            />
            <ErrorMessage
              name="skills"
              component="div"
              className="has-error col md-3"
            />
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Col>
          </FormGroup>
        </Form>
      </Formik>
    );
  }
}
export default AddFriend;