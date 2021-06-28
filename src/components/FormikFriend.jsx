import React from "react";
import { Formik, Form } from "formik";
import * as getByIdSchema from "../validation/GetByIdSchema";
import friendsService from "../services/friendsService";
//import { TextField } from "@material-it/core";

class FormikFriend extends React.Component {
  state = {
    timeBar: "",
    time: 4,
    showTimer: true,
    getByIdSchema: getByIdSchema.getByIdSchema,
    friendForm: { Title: "", Description: "" },
  };

  componentDidMount() {
    let id = 1015;
    friendsService.getfriendById(id, this.getSuccess, this.getError);
  }

  getSuccess = (data) => {
    return new Promise((resolve, reject) => {
      let wait = setTimeout(() => {
        clearTimeout(wait);
        resolve(this.setTimer(), this.stateData(data));
      });
    });
  };

  setTimer = () => {
    let showTimer = this.state.showTimer;
    let timeBar = this.state.timeBar;
    let time = this.state.time;
    let timer = setInterval(() => {
      timeBar = time - 1;
      this.setState({ timeBar });
      time -= 1;
      if (time <= 0) {
        this.setState({ showTimer: !showTimer });
        clearInterval(timer);
      }
    }, 1000);
  };

  stateData = (data) => {
    setTimeout(() => {
      let friendForm = data.data[0];
      this.setState({ friendForm });
    }, 4000);
  };

  getError = () => {
    console.log("error");
  };

  onSubmit = (values) => {
    console.log("values", values);
  };

  handleInputChange = (e) => {
    let friendForm = { ...this.state.friendForm };
    friendForm[e.target.id] = e.target.value;
    this.setState({ friendForm });
  };
  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Formik Example</h1>
          {this.state.showTimer && (
            <span>Your form will load in {this.state.timeBar}</span>
          )}
          <div>
            <Formik
              enableReinitialize={true}
              validationSchema={this.state.getByIdSchema}
              initialValues={this.state.friendForm}
            >
              {(props) => {
                const { values, touched, errors, handleBlur } = props;
                return (
                  <div>
                    {" "}
                    {!this.state.friendForm && (
                      <div>There is no Info for the id provided</div>
                    )}
                    {this.state.friendForm && (
                      <Form>
                        Title:
                        <input
                          id="Title"
                          value={values.Title}
                          onBlur={handleBlur}
                          type="text"
                          onChange={this.handleInputChange}
                          className={
                            errors.Title && touched.Title
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.Title && touched.Title && (
                          <span className="input-feedback">{errors.Title}</span>
                        )}
                        <br />
                        Description:
                        <textarea
                          rows="4"
                          cols="50"
                          id="Description"
                          type="text"
                          value={values.Description}
                          onBlur={handleBlur}
                          onChange={this.handleInputChange}
                          className={
                            errors.Description && touched.Description
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.Description && touched.Description && (
                          <span className="input-feedback">
                            {errors.Description}
                          </span>
                        )}
                        <div>
                          <button type="submit">Submit</button>
                        </div>
                      </Form>
                    )}
                  </div>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}
export default FormikFriend;
