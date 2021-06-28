import React from "react";
// import * as jobService from "../services/jobService";

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

    handleJobSubmit = (e) => {
        e.preventDefault();
        console.log("submit button works")
        let formData = { ...this.state.formData }   // --making  copy of state.formData 

        formData.skills = formData.skills.split(",");  //-- formData.skills will be split on (",") into an array.

        console.log(formData)
        // jobService.addJob(formData)
        //     .then(this.onAddJobSuccess)
        //     .catch(this.onAddJobError);
    }

    onAddJobSuccess = (response) => {
        console.log("Submit is successful")
    }

    onAddJobError = (errResponse) => {
        console.error("Submit error")
    }

    onFormFieldChanged = (e) => {
        //---below is capturing info you need from event before the event object falls out of scope
        let currentTarget = e.currentTarget;   //--e.currentTarget represents the input
        let newValue = currentTarget.value;   //--this is the value of the input
        let inputName = currentTarget.name;  //-- this is the name (form fields named )

        this.setState(() => {
            let newState = { ...this.state.formData };

            newState[inputName] = newValue;   //---bracket notation [] is used to access the object's property of the name (name of the field). [] is a property accessor

            console.log("newState", newState.title, { newState });

            return ({ formData: newState });
        })
    }

    render() {
        console.log("State:", this.state.formData)

        return (

            <div className="col-md-3">
                <form>
                    <h1>Add Job</h1>
                    <div className="form-group">
                        <label htmlFor="exampleInputTitle" >
                            Title
                        </label>
                        <input type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.title || ""}
                            placeholder="string"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputDescription" >
                            Description
                        </label>
                        <input type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.description || ""}
                            placeholder="string"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputSummary" >
                            Summary
                        </label>
                        <input type="text"
                            className="form-control"
                            id="summary"
                            name="summary"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.summary || ""}
                            placeholder="string"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPay" >
                            Pay
                        </label>
                        <input type="text"
                            className="form-control"
                            id="pay"
                            name="pay"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.pay || ""}
                            placeholder="string"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputSlug" >
                            Slug
                        </label>
                        <input type="text"
                            className="form-control"
                            id="slug"
                            name="slug"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.slug || ""}
                            placeholder="string"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputStatusId" >
                            Status Id
                        </label>
                        <input type="text"
                            className="form-control"
                            id="statusId"
                            name="statusId"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.statusId || ""}
                            placeholder="1 or Active"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputTechCompanyId" >
                            Tech Company Id
                        </label>
                        <input type="text"
                            className="form-control"
                            id="techCompanyId"
                            name="techCompanyId"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.techCompanyId || ""}
                            placeholder="int"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputSkills" >
                            Skills
                        </label>
                        <input type="text"
                            className="form-control"
                            id="skills"
                            name="skills"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.skills || ""}
                            placeholder="separate skills with (,) : React, javascipt, html"
                        />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleJobSubmit}>Submit</button>
                </form>
            </div>
        )
    }

}

export default AddJob;
