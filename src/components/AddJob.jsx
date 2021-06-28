import React from "react";
import * as jobService from "../services/jobService";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import debug from "sabio-debug";

const _logger = debug.extend("AddJob");

class AddJob extends React.Component {

    state = {
        formData: {
            title: "",
            description: "",
            summary: "",
            pay: "",
            slug: "",
            statusId: "",
            techCompanyId: "",
            skills: [""]
        }
    }

    handleJobSubmit = (values) => {



        values.skills = values.skills.split(",");  //-- values.skills will be split on (",") into an array.

        console.log("values:", values)

        jobService
            .addJob(values)
            .then(this.onAddJobSuccess)
            .catch(this.onAddJobError);
    }

    onAddJobSuccess = (response) => {
        console.log("Submit is successful")
    }

    onAddJobError = (errResponse) => {
        console.error("Submit error")
    }


    render() {
        _logger("rendering")
        return (
            <Formik
                initialValues={this.state.formData}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    description: Yup.string()
                        .max(500, 'Must enter description')
                        .required('Required'),
                    summary: Yup.string()
                        .max(200, 'Must enter summary')
                        .required('Required'),
                    pay: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    slug: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    statusId: Yup.number()
                        .required('Required. Enter 1 or Active'),
                    techCompanyId: Yup.number()
                        .required('Required'),
                    skills: Yup.string()
                        .max(100, '100 characters max')
                        .required('Required'),
                })}
                onSubmit={this.handleJobSubmit}
                enableReinitialize={true}
            >
                <div className="col-md-3">
                    <Form>
                        <h1>Add Job</h1>
                        <div className="form-group">
                            <label htmlFor="InputTitle" >
                                Title
                        </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                placeholder="string"
                            />
                            <ErrorMessage name="title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputDescription" >
                                Description
                        </label>
                            <Field type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                placeholder="string"
                            />
                            <ErrorMessage name="description" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputSummary" >
                                Summary
                        </label>
                            <Field type="text"
                                className="form-control"
                                id="summary"
                                name="summary"
                                placeholder="string"
                            />
                            <ErrorMessage name="summary" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputPay" >
                                Pay
                        </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="pay"
                                name="pay"
                                placeholder="string"
                            />
                            <ErrorMessage name="pay" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputSlug" >
                                Slug
                        </label>
                            <Field type="text"
                                className="form-control"
                                id="slug"
                                name="slug"
                                placeholder="string"
                            />
                            <ErrorMessage name="slug" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputStatusId" >
                                Status Id
                        </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="statusId"
                                name="statusId"
                                placeholder="1 or Active"
                            />
                            <ErrorMessage name="statusId" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputTechCompanyId" >
                                Tech Company Id
                        </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="techCompanyId"
                                name="techCompanyId"
                                placeholder="number"
                            />
                            <ErrorMessage name="techCompanyId" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputSkills" >
                                Skills
                        </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="skills"
                                name="skills"
                                placeholder="separate skills with (,) : React, javascipt, html"
                            />
                            <ErrorMessage name="skills" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </Form>
                </div>
            </Formik>
        )
    }

}

export default AddJob;
