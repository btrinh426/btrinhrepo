import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const basicSchema = Yup.object().shape({
  fullName: Yup.string().min(2).max(50).required("Is Requied"),
  email: Yup.string().email("Invalid email").required("Required"),
});
class Basic extends React.Component {
  state = {
    formData: {
      name: "",
      email: "",
    },
  };
  handleSubmit = (values) => {
    console.log(values);
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Formik
              enableReinitialize={true}
              initialValues={this.state.formData}
              onSubmit={this.handleSubmit}
              validationSchema={basicSchema}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="fullName">FullName</label>
                  <Field type="text" name="fullName" className="form-control" />
                  <ErrorMessage
                    name="fullname"
                    component="div"
                    className="has-error"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="has-error"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}
export default Basic;