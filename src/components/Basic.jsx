import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const basicSchema = Yup.object().shape({
  fullName: Yup.string().min(2).max(50).required("Is Required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  content: Yup.string().min(10).max(200).required("Required"),
  friends: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().min(2).max(50).required("Required"),
      })
    )
    .required("Required to Add friends")
    .min(2),
});

class Basic extends React.Component {
  state = {
    sports: [
      { id: 1, name: "Soccer" },
      { id: 2, name: "Basketball" },
      { id: 3, name: "Football" },
      { id: 4, name: "Baseball" },
      { id: 5, name: "Hockey" },
    ],
    formData: {
      fullName: "",
      email: "",
      isAwesome: false,
      color: "",
      content: "",
      sportId: 0,
      friends: [{ name: "" }],
    },
  };

  mapSport = (sport) => (
    <option value={sport.id} key={`sport_${sport.id}`}>
      {sport.name}
    </option>
  );

  handleSubmit = (values) => {
    console.log(values);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4"></div>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.formData}
            onSubmit={this.handleSubmit}
            validationSchema={basicSchema}
          >
            {({ values }) => (
              <Form>
                <div className="form-group">
                  <label className="fullName">FullName</label>
                  <Field type="text" name="fullName" className="form-control" />
                  <ErrorMessage name="fullName" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <h4>Checkbox</h4>
                <div className="form-check">
                  <Field
                    type="checkbox"
                    name="isAwesome"
                    className="form-check-input"
                  />
                  <label htmlFor="isAwesome" className="form-check-lable">
                    {`${values.isAwesome}`}
                  </label>
                </div>
                <hr />
                <h4>Radio's</h4>
                <div className="form-check">
                  <Field
                    type="radio"
                    className="form-check-input"
                    name="color"
                    value="red"
                  />
                  <label className="form-check-label">Red</label>
                </div>
                <div className="form-check">
                  <Field
                    type="radio"
                    className="form-check-input"
                    name="color"
                    value="blue"
                  />
                  <label className="form-check-label">Blue</label>
                </div>
                <div className="form-check">
                  <Field
                    type="radio"
                    className="form-check-input"
                    name="color"
                    value="green"
                  />
                  <label className="form-check-label">Green</label>
                </div>
                <h4>TextArea</h4>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <Field
                    component="textarea"
                    name="content"
                    className="form-control"
                  />
                  <ErrorMessage name="content" component="div" />
                </div>
                <h4>Select</h4>
                <div className="form-group">
                  <Field
                    component="select"
                    name="sportId"
                    className="form-control"
                  >
                    <option value="">Please Select a Sport</option>
                    {this.state.sports.map(this.mapSport)}
                  </Field>
                </div>
                <h4>Array List</h4>
                <div className="form-group">
                  <FieldArray name="friends">
                    {({ push, remove }) => (
                      <div>
                        <button
                          className="btn btn-info"
                          onClick={() => push({ name: "" })}
                        >
                          Add
                        </button>
                        {values.friends &&
                          values.friends.map((friend, index) => (
                            <div className="row">
                              <div className="col-10">
                                <Field
                                  type="text"
                                  name={`friends.${index}.name`}
                                  placeholder="Add A Friend"
                                />
                              </div>
                              <div className="col-2">
                                <button
                                  className="btn btn-danger"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </button>
                              </div>
                              <ErrorMessage
                                name={`friends.${index}.name`}
                                component="div"
                              />
                            </div>
                          ))}
                      </div>
                    )}
                  </FieldArray>
                </div>
                <hr />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default Basic;
