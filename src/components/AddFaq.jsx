import React, { Fragment, Component } from "react";
import { WrapperSimple } from "../../layouts";
import MuiAlert from "@material-ui/lab/Alert";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  Snackbar,
  TextField,
} from "@material-ui/core";
import faqSchema from "../../schema/faqSchema";
import { Formik } from "formik";
import logger from "sabio-debug";
import * as FaqService from "../../services/faqService";
import { EditorState } from "draft-js";
import PropTypes from "prop-types";

const _logger = logger.extend("AddFaqForm");

class AddFaq extends Component {
  state = {
    snackBarShow: false,
    severity: "success",
    barMessage: "",
    faqFormData: {
      SortOrder: 1,
      CreatedBy: 1,
      Question: "",
      Answer: "",
      categoryId: 0,
    },
  };

  componentDidMount() {}

  addSuccess = (response) => {
    _logger("post FAQ success", response.items);

    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage: "New FAQ posted.",
        severity: "success",
      };
    });
    //this.props.history.push("/faqs");
  };

  addError = (err) => {
    _logger("New FAQ err", err);
    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage: "Encountered Error",
        severity: "error",
      };
    });
  };

  getFormHelperText = (errorField, touchedField) => {
    if (errorField && touchedField) {
      return <FormHelperText>Please correct error</FormHelperText>;
    }
    return <FormHelperText>&nbsp;</FormHelperText>;
  };

  handleSubmit = (values, { resetForm }) => {
    debugger;
    _logger(values);
    const payload = {
      ...values,
    };
    FaqService.add(payload).then(this.addSuccess).catch(this.addError);

    resetForm(this.state.faqFormData);
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState((prevState) => {
      this.props.history.push("/faqs");
      return {
        ...prevState,
        snackbarShow: false,
      };
    });
  };

  getCategoryId = () => {
    if (CategoryId === "Appointments") {
      values.CategoryId = 1;
    } else if (CategoryId === "Billing and Payment") {
      values.CategoryId = 2;
    }
    if (CategoryId === "Insurance") {
      values.CategoryId = 3;
    } else if (CategoryId === "Medical Records") {
      values.CategoryId = 4;
    }
  };

  render() {
    return (
      <Fragment>
        <WrapperSimple sectionHeading="Frequently Asked Questions">
          <Formik
            initialValues={this.state.faqFormData}
            onSubmit={this.handleSubmit}
            validationSchema={faqSchema}
          >
            {(formikProps) => {
              const {
                values,
                touched,
                errors,
                handleSubmit,
                handleChange,
              } = formikProps;
              return (
                <form validate autoComplete="off" onSubmit={handleSubmit}>
                  <div>
                    <FormControl fullWidth={"true"}>
                      <InputLabel htmlFor="categoryId">Category</InputLabel>
                      <Select
                        id="categoryId"
                        name="categoryId"
                        values={values.categoryId}
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>Appointments</MenuItem>
                        <MenuItem value={2}>Billing and Payment</MenuItem>
                        <MenuItem value={3}>Insurance</MenuItem>
                        <MenuItem value={4}>Medical Records</MenuItem>
                      </Select>
                      <FormHelperText>Select a FAQ category</FormHelperText>
                    </FormControl>
                  </div>
                  <span></span>

                  <br></br>
                  <div>
                    <FormControl fullWidth={true}>
                      <TextField
                        label="Question"
                        id="Question"
                        name="Question"
                        values={values.Question}
                        onChange={handleChange}
                        multiline={true}
                        rowsMax={2}
                        aria-label="Maximum Height"
                        placeholder="Enter question here"
                        helperText={touched.Question && errors.Question}
                        error={errors.Question}
                      />
                      <FormHelperText>
                        {this.getFormHelperText(
                          errors.Question,
                          touched.Question
                        )}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth={true}>
                      <TextField
                        label="Answer"
                        id="Answer"
                        name="Answer"
                        values={values.Answer}
                        onChange={handleChange}
                        multiline={true}
                        rowsMax={4}
                        aria-label="Maximum Height"
                        placeholder="Enter answer here"
                        helperText={touched.Answer && errors.Answer}
                        error={errors.Answer}
                      />
                      <FormHelperText>
                        {this.getFormHelperText(errors.Answer, touched.Answer)}
                      </FormHelperText>
                    </FormControl>
                  </div>

                  <div>
                    <FormControl fullWidth={true}>
                      <div></div>
                    </FormControl>
                  </div>

                  <div></div>

                  <div>
                    <div>
                      <span></span>
                    </div>
                  </div>
                  <div>
                    <Button type="submit" variant="contained" color="secondary">
                      Add FAQ
                    </Button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </WrapperSimple>

        <Snackbar
          open={this.state.snackbarShow}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert onClose={this.handleClose} severity="success">
            FAQ added successfully!
          </MuiAlert>
        </Snackbar>
      </Fragment>
    );
  }
}

AddFaq.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.shape({
      categoryId: PropTypes.number,
    }).isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default AddFaq;
