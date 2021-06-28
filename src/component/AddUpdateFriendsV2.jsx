import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import { TextField as TextMU } from "formik-material-ui";
import * as friendsService from "../services/friendsService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "../invalidinput.css";

const formValidationSchema = Yup.object().shape({
  name: Yup.string().min(2).max(50).required("Name is Required."),
  title: Yup.string().min(2).max(50).required("Title is Required."),
  bio: Yup.string().min(2).max(50).required("Bio is Required."),
  summary: Yup.string().min(2).max(100).required("Summary is Required."),
  headline: Yup.string().min(2).max(50).required("Headline is Required."),
  slug: Yup.string().min(2).max(25).required("Unique slug is Required."),
  statusId: Yup.string()
    .min(2, "minimum 2 character")
    .max(10)
    .required("Type Active or 1."),
  skills: Yup.string().required("It should be skillIds with comma"),
  primaryImage: Yup.object().shape({
    imageUrl: Yup.string().url().required("ImageUrl is Required."),
  }),
});

class AddUpdateFriendsV2 extends React.Component {
  state = {
    friendData: {
      name: "",
      bio: "",
      headline: "",
      id: null,
      primaryImage: {
        imageType: "",
        imageUrl: "",
      },
      slug: "",
      statusId: "",
      summary: "",
      title: "",
      skills: "",
    },
  };

  componentDidMount() {
    const { state: locState } = this.props.location;
    if (locState && locState.type === "FriendData") {
      let newFriendData = { ...locState.payload };
      this.setState((prevState) => {
        let data = { ...prevState.friendData };
        data = newFriendData;
        data.skills = newFriendData.skills.map((item) => item.id).join(", ");
        return { friendData: data };
      });
    } else if (!locState) {
      let id = this.props.match.params.friendId;
      if (id) {
        friendsService
          .getById(id)
          .then(this.onGetByIdSuccess)
          .catch(this.onGetByIdError);
      }
    }
  }

  onGetByIdSuccess = (res) => {
    console.log(res.data.item);
    this.setState((prevState) => {
      let newFriendData = res.data.item;
      let data = { ...prevState.friendData };
      data = newFriendData;
      data.skills = newFriendData.skills.map((item) => item.id).join(", ");
      return { friendData: newFriendData };
    });
  };

  onGetByIdError = (res) => {
    console.error(res);
  };

  addSuccessNotify = () =>
    toast.success("Your Friend is added to your list!", {
      position: "top-center",
    });
  UpdateSuccessNotify = () => toast("Update Completed!");
  addErrorNotify = () => {
    toast.error("Check your Input again!", { position: "top-center" });
  };

  onUpdateSuccess = (res) => {
    console.log(res, "Update Success!");
    this.UpdateSuccessNotify();
    this.props.history.push("/friends");
  };

  onUpdateError = (res) => {
    console.error(res);
  };
  onAddSuccess = (res) => {
    console.log(res);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "New Friend Added!",
      showConfirmButton: false,
      timer: 2500,
    });
    this.props.history.push("/friends");
  };

  onAddError = (res) => {
    console.warn(res);
    this.addErrorNotify();
  };

  showMessage = () => {
    let id = this.props.match.params.friendId;
    if (id) {
      return "Update Friend";
    } else {
      return "Add Friend";
    }
  };

  onSubmit = (values) => {
    console.log(values);
    let id = this.props.match.params.friendId;
    let stateId = JSON.stringify(this.state.friendData.id);
    console.log(id, stateId);
    let imgType = ["jpeg", "png", "exe", "jpg", "img"];
    let randomIndex = Math.floor(Math.random() * imgType.length);
    let data = values;
    let payload = {
      PrimaryImage: {
        ImageType:
          data.primaryImage.imageType === ""
            ? imgType[randomIndex]
            : data.primaryImage.imageType,
        ImageUrl: data.primaryImage.imageUrl,
      },
      Name: data.name,
      Title: data.title,
      Bio: data.bio,
      Summary: data.summary,
      Headline: data.headline,
      StatusId: data.statusId,
      Slug: data.slug,
      Skills:
        data.skills === null
          ? []
          : data.skills.split(", ").map((item) => parseInt(item)),
    };
    if (id && id === stateId) {
      friendsService
        .update(id, payload)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateError);
    } else {
      friendsService
        .add(payload)
        .then(this.onAddSuccess)
        .catch(this.onAddError);
    }
  };

  render() {
    const marginStyle = {
      marginTop: "5rem",
    };
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="w-50" style={marginStyle}>
              <div className="w-50" style={{ margin: "0 auto" }}>
                <h4 style={{ textAlign: "center" }}>{this.showMessage()}</h4>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={this.state.friendData}
                validationSchema={formValidationSchema}
                onSubmit={this.onSubmit}
              >
                {({ values, handleChange, touched, errors }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                      ></Field>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="form-error"
                      ></ErrorMessage>
                    </div>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <Field
                        type="text"
                        name="title"
                        className="form-control"
                      ></Field>
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="form-error"
                      ></ErrorMessage>
                    </div>{" "}
                    <div className="form-group">
                      <label htmlFor="bio">Bio</label>
                      <Field
                        type="text"
                        name="bio"
                        className="form-control"
                      ></Field>
                      <ErrorMessage
                        name="bio"
                        component="div"
                        className="form-error"
                      ></ErrorMessage>
                    </div>{" "}
                    <div className="form-group">
                      <label htmlFor="summary">Summary</label>
                      <Field
                        type="text"
                        name="summary"
                        className="form-control"
                      ></Field>
                      <ErrorMessage
                        name="summary"
                        component="div"
                        className="form-error"
                      ></ErrorMessage>
                    </div>{" "}
                    <div className="form-group">
                      <label htmlFor="headline">Headline</label>
                      <Field
                        type="text"
                        name="headline"
                        className="form-control"
                      ></Field>
                      <ErrorMessage
                        name="headline"
                        component="div"
                        className="form-error"
                      ></ErrorMessage>
                    </div>{" "}
                    <div className="form-group">
                      <label htmlFor="slug">Slug</label>
                      <Field
                        type="text"
                        name="slug"
                        className="form-control"
                      ></Field>
                      <ErrorMessage
                        name="slug"
                        component="div"
                        className="form-error"
                      ></ErrorMessage>
                    </div>{" "}
                    <div className="form-group">
                      <Field
                        component={TextMU}
                        label="StautsId"
                        name="statusId"
                        value={values.statusId}
                        onChange={handleChange}
                        error={touched.statusId && Boolean(errors.statusId)}
                        helperText={touched.statusId && errors.statusId}
                      ></Field>
                    </div>{" "}
                    <div className="form-group">
                      <Field
                        component={TextMU}
                        label="Skills"
                        name="skills"
                        value={values.skills}
                        onChange={handleChange}
                        error={touched.skills && Boolean(errors.skills)}
                        helperText={touched.skills && errors.skills}
                      ></Field>
                    </div>{" "}
                    <div className="form-group">
                      <label htmlFor="primaryImage.imageUrl">ImageUrl</label>
                      <Field
                        type="text"
                        name="primaryImage.imageUrl"
                        className="form-control"
                      ></Field>
                      <ErrorMessage
                        name="primaryImage.imageUrl"
                        component="div"
                        className="form-error"
                      ></ErrorMessage>
                    </div>
                    <Button variant="contained" type="submit" color="primary">
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddUpdateFriendsV2;
