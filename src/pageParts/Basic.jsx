import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const friendSchema = Yup.object().shape({
  title: Yup.string().min(2).required("Is Required"),
  bio: Yup.string().min(2).required("Is Required"),
  slug: Yup.string().min(2).required("Is Required"),
  summary: Yup.string().min(2).required("Is Required"),
  headline: Yup.string().min(2).required("Is Required"),
  imageUrl: Yup.string().min(2).required("Is Required"),
});

class Basic extends React.Component {
  state = {
    formData: {
      title: "",
      bio: "bio",
      slug: "unique slug",
      summary: "summary",
      headline: "snazzy headline",
      imageUrl: "image url",
      statusId: "Active",
      skills: "",
      entityId: 2,
      entityTypeId: 1,
    },
    isAnEdit: this.props.isAnEdit,
  };
  componentDidMount() {
    //let friend = this.props.match.params.friend;
    console.log("component mounted");
    console.log(this.state.isAnEdit);
    if (this.state.isAnEdit) {
      console.log("edit is true");
      console.log(this.props.friendData);
      this.setState(() => {
        let newData = { ...this.props.friendData };
        return { formData: newData };
      });
    }
  }

  handleSubmit = (values) => {
    if (this.props.isAnEdit) {
      console.log("Edit is true");
      console.log(values.id);
      this.props.editFriend(values);
    } else {
      let newskills = values.skills;
      newskills = newskills.split(",");
      console.log(newskills);
      console.log(newskills.length);
      for (let i = 0; newskills.length > i; i++) {
        let skill = newskills[i];
        newskills[i] = { SkillName: skill };
      }
      values.skills = newskills;
      //console.log(newskills);
      //console.log(values);
      console.log("getting in here");
      console.log(this.props.isAnEdit);

      console.log("edit is false, call add friend");
      this.props.addFriend(values);
    }
  };

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={this.state.formData}
        onSubmit={this.handleSubmit}
        validationSchema={friendSchema}
      >
        <Form>
          <div className="bg-text3" /*style={{display: 'none'}*/>
            <div className="row">
              <div className="col-md-6">
                <div className="form-wrapper">
                  <label htmlFor="title">Name</label>
                  <Field type="text" name="title" />
                  <ErrorMessage name="title" component="div" />
                </div>
                <div className="form-wrapper">
                  <label htmlFor="bio">Bio</label>
                  <Field type="text" name="bio" />
                  <ErrorMessage name="bio" component="div" />
                </div>

                <div className="form-wrapper">
                  <label htmlFor="summary">Summary</label>
                  <Field type="text" name="summary" />
                  <ErrorMessage name="summary" component="div" />
                </div>

                <div className="form-wrapper">
                  <label htmlFor="headline">Headline</label>
                  <Field type="text" name="headline" />
                  <ErrorMessage name="headline" component="div" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-wrapper">
                  <label htmlFor="slug">Slug</label>
                  <Field type="text" name="slug" />
                  <ErrorMessage name="slug" component="div" />
                </div>
                <div className="form-wrapper">
                  <label htmlFor="statusId">StatusId</label>
                  <Field type="text" name="statusId" />
                  <ErrorMessage name="statusId" component="div" />
                </div>
                <div className="form-wrapper">
                  <label htmlFor="imageUrl">Image</label>
                  <Field type="text" name="imageUrl" />
                  <ErrorMessage name="iamgeUrl" component="div" />
                </div>
                {this.state.isAnEdit ? (
                  <label>no skills update right now</label>
                ) : (
                  <div className="form-wrapper">
                    <label htmlFor="skills">Skills</label>
                    <Field type="text" name="skills" />
                  </div>
                )}
              </div>
            </div>
            {this.props.isAnEdit ? (
              <button type="submit" className="btn btn-primary">
                Edit Friend
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Add Friend
              </button>
            )}
          </div>
        </Form>
      </Formik>
    );
  }
}

export default Basic;
