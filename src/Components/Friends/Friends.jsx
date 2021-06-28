import React from "react";
import { Link } from "react-router-dom";
import { addFriend, getFriend, editFriend } from "../../services/FriendService";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const basicSchema = Yup.object().shape({
  title: Yup.string().min(2).max(50).required("Name is required"),
  summary: Yup.string().min(2).max(50).required("Summary is required"),
  headline: Yup.string().min(2).max(50).required("Headline is required"),
  slug: Yup.string().min(2).max(50).required("Slug is required"),
  statusId: Yup.boolean().required("required"),
  imageUrl: Yup.string().min(2).max(50).required("Image Url is required"),
  skills: Yup.string().min(2).max(50).required("skills are required"),
});

class Friends extends React.Component {
  state = {
    formData: {
      title: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: "",
      imageUrl: "",
      skills: "",
    },
  };

  componentDidMount() {
    var id = this.props.match.params.friendId;
    if (!id) {
      return;
    } else if (id && this.props.location.state) {
      this.setState(() => {
        let formData = { ...this.state.formData };
        formData = this.props.location.state.payload;
        formData.skills = formData.skills.map((skill) => skill.name).join(", ");
        return { formData };
      });
    } else {
      getFriend(id).then(this.onGetFriendSuccess).catch(this.onGetFriendError);
    }
  }

  onGetFriendSuccess = (response) => {
    console.log(response);
    this.setState(() => {
      let formData = { ...this.state.formData };
      formData = response.data.item;
      formData.skills = formData.skills.map((skill) => skill.name).join(", ");
      return { formData };
    });
  };

  onGetFriendError = (errResponse) => {
    console.log(errResponse);
  };

  handleSubmit = (values) => {
    console.log(values);
    var entry = values;
    entry.skills = entry.skills.split(", ");
    if (this.state.formData.id) {
      editFriend(this.state.formData.id, values)
        .then(this.onEditFriendSuccess)
        .catch(this.onEditFriendError);
    } else {
      console.log(values);
      addFriend(values)
        .then(this.onAddFriendSuccess)
        .catch(this.onAddFriendError);
    }
  };

  onEditFriendSuccess = (response) => {
    toast.info("Edit Submitted", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    this.props.history.push("/Friends/View");
    console.log(response);
  };
  onEditFriendError = (errResponse) => {
    toast.warning("Edits not submitted", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log(errResponse);
  };
  onAddFriendSuccess = (response) => {
    toast.info("Friend Added", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log(response);
  };
  onAddFriendError = (errResponse) => {
    toast.warning("Error - No Friend Added", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    console.log(errResponse);
  };

  render() {
    return (
      <div className="container">
        <div style={{ marginLeft: "8rem", padding: "8rem" }}>
          <h1>Friends</h1>
          <div style={{ marginTop: "2rem" }}>
            <h5>Add Your Friends Info Here:</h5>
          </div>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.formData}
            onSubmit={this.handleSubmit}
            validationSchema={basicSchema}
          >
            {({ values }) => (
              <Form>
                <div className="row">
                  <div className="col-5">
                    <div className="form-group">
                      <label htmlFor="title">Name</label>
                      <Field
                        type="text"
                        name="title"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="has-error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="summary">Summary</label>
                      <Field
                        type="text"
                        name="summary"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="summary"
                        component="div"
                        className="has-error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="headline">Headline</label>
                      <Field
                        type="text"
                        name="headline"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="headline"
                        component="div"
                        className="has-error"
                      />
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="form-group">
                      <label htmlFor="slug">Slug</label>
                      <Field type="text" name="slug" className="form-control" />
                      <ErrorMessage
                        name="slug"
                        component="div"
                        className="has-error"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="imageUrl">Image URL</label>
                      <Field
                        type="text"
                        name="imageUrl"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="imageUrl"
                        component="div"
                        className="has-error"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="skills">Skills</label>
                      <Field
                        type="text"
                        name="skills"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="skills"
                        component="div"
                        className="has-error"
                      />
                    </div>
                    <div className="form-check">
                      <Field
                        type="checkbox"
                        name="statusId"
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor="isActive">
                        Active Status
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  {this.state.formData.id ? "Update" : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
          <div style={{ marginTop: "3rem" }}>
            <Link to="/Friends/view">
              <button className="btn btn-secondary">
                See My Friends &raquo;
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Friends;
