import React from "react";
import * as friendService from "../services/friendService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

toast.configure();

const basicSchema = Yup.object().shape({
  title: Yup.string().min(2).max(100).required("Is Required"),
  bio: Yup.string().min(2).max(100).required("Is Required"),
  summary: Yup.string().min(2).max(255).required("Is Required"),
  headline: Yup.string().min(2).max(100).required("Is Required"),
  slug: Yup.string().min(2).max(100).required("Is Required"),
  primaryImage: Yup.string().required(),
  skills: Yup.string().min(2).max(100).required("Is Required"),
});

class AddFriend extends React.Component {
  state = {
    friendData: {
      id: 0,
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      status: 1,
      primaryImage: "",
      skills: "",
    },
  };

  componentDidMount() {
    let id = this.props.match.params.friendId;
    console.log("componentDidMount", { id });
    if (id) {
      friendService
        .getFriendById(id)
        .then(this.onEditFriendSuccess)
        .catch(this.onEditFriendError);
    }
  }

  onEditFriendSuccess = (response) => {
    console.log({ ...response.data }, "Hi");

    this.setState(() => {
      let newState = { ...this.state.friendData };
      let cardData = { ...response.data.item };

      newState = {
        id: cardData.id,
        title: cardData.title,
        bio: cardData.bio,
        summary: cardData.summary,
        headline: cardData.headline,
        slug: cardData.slug,
        status: cardData.status,
        primaryImage: cardData.primaryImage,
        skills: cardData.skills.map(this.mapSkill).join(","),
        friendId: "AaronFriend",
      };
      console.log({ friendData: newState });
      return { friendData: newState };
    });
  };

  onEditFriendError = (err) => {
    console.error(err);
  };

  onFriendFormChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name; //firstName or lastName

    this.setState(() => {
      let friendData = { ...this.state.friendData };
      friendData[inputName] = newValue;

      return { friendData };
    });
  };

  onUpdateFriendSuccess = (response) => {
    console.log({ update: response.data });
    this.props.history.push("/Friends/");
    toast["success"]("You Updated Your Friend");
  };
  onUpdateFriendError = (err) => {
    console.error(err);
    toast["error"]("You couldn't update Your Friend");
  };

  handleSubmit = (values) => {
    console.log("this.state.friendData", values);
    values.skills = values.skills.split(",");
    values.primaryImage = parseInt(values.primaryImage);
    let id = values.id;

    if (id) {
      friendService
        .editFriend(values, id)
        .then(this.onUpdateFriendSuccess)
        .catch(this.onUpdateFriendError);
    } else {
      friendService
        .addFriend(values)
        .then(this.onAddFriendSuccess)
        .catch(this.onAddFriendError);
    }
  };

  onAddFriendSuccess = (response) => {
    this.props.history.push("/Friends/");
    toast.success("You have registered a new friend.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  onAddFriendError = (errResponse) => {
    toast.error("You could not register a new friend.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  mapSkill = (skills) => {
    let friendSkills = skills.skillName;
    return friendSkills;
  };

  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <Formik
                enableReinitialize={true}
                initialValues={this.state.friendData}
                onSubmit={this.handleSubmit}
                validationSchema={basicSchema}
              >
                <Form>
                  <div className="form-group">
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      defaultValue="Title"
                      variant="outlined"
                    />
                    <Field type="text" name="title" className="form-control" />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio" className="form-label">
                      Biography
                    </label>
                    <Field type="text" name="bio" className="form-control" />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="summary" className="form-label">
                      Summary
                    </label>
                    <Field
                      component="textarea"
                      name="summary"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="headline" className="form-label">
                      Headline
                    </label>
                    <Field
                      type="headline"
                      name="headline"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="headline"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="slug" className="form-label">
                      Slug
                    </label>
                    <Field type="slug" name="slug" className="form-control" />
                    <ErrorMessage
                      name="slug"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="primaryImage" className="form-label">
                      Primary Image
                    </label>
                    <Field
                      type="text"
                      name="primaryImage"
                      className="form-control"
                    />
                  </div>
                  <ErrorMessage
                    name="primaryImage"
                    component="div"
                    className="has-error"
                  />
                  <div className="form-group">
                    <label htmlFor="skills" className="form-label">
                      Skills
                    </label>
                    <Field
                      type="skills"
                      name="skills"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="skills"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div id="nameHelp" className="form-text">
                    We'll never share your friend's information with anyone
                    else.
                  </div>
                  <p></p>
                  <Button variant="contained" color="primary">
                    Submit
                  </Button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default AddFriend;
