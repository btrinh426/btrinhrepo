import React, {Component} from "react";
import { addJob } from "../services/jobsService"
import { getAllTechCompanies } from "../services/techCompaniesService"
import {ToastContainer, toast} from "react-toastify";


class AddJobs extends Component {

    constructor(props){
        super(props);
        this.state = {
            formData: {
                title: "",
                description: "",
                summary: "",
                pay: "",
                slug: "",
                statusId: "",
                techCompanyId: 0,
                skills: ""
            },

            pageIndex: 0,
            pageSize: 25,
            dropdownOptions: []
        }
    };

    componentDidMount(){
        console.log("mounted!")

        this.getAllTechCompaniesForDropdown()
    };

    onFormFieldChange = (e) => {
        let currentTarget = e.currentTarget
        console.log("currentTarget", currentTarget)
        let newValue = currentTarget.value
        let inputName = currentTarget.name

        this.setState((prevState) => {

            let formData = {...this.state.formData}

            formData[inputName] = newValue

            return {formData}

        })
        
    };

    onSubmit = (e) => {
        console.log("submit clicked!")
        e.preventDefault()

        const formData = this.state.formData

        addJob(formData)
            .then(this.onAddJobSuccess)
            .catch(this.onAddJobError)  

    };

    onAddJobSuccess = (res) => {
        console.log("addJobs success!", res)

        toast.success("Success! Your job was added.")
    };

    onAddJobError = (err) => {
        console.log("addJobs error.", err.response)
    };

    getAllTechCompaniesForDropdown = () => {
       let pageIndex = this.state.pageIndex
       let pageSize = this.state.pageSize

       getAllTechCompanies(pageIndex, pageSize)
        .then(this.onGetAllTechCompaniesSuccess)
        .catch(this.onGetAllTechCompaniesError)
    };

    onGetAllTechCompaniesSuccess = (res) => {
        console.log("getAllTechCompanies success!", res)

        const techCompanies = res.data.item.pagedItems

        this.setState(() => {

            return {
                dropdownOptions: techCompanies.map(this.mapTechOption)
            }
        })
    };

    onGetAllTechCompaniesError = (err) => {
        console.log("getAllTechCompanies error.", err.response)
    };

    mapTechOption = (techCompanyObj) => {
        console.log("techCompanyObj", techCompanyObj)

        const techCompanyName = techCompanyObj.name
        const techCompanyId = techCompanyObj.id
        console.log("tech name", techCompanyName)
        console.log("tech id", techCompanyId)

        // return new Option(techCompanyName, techCompanyId)
        return <option value={techCompanyId}>{techCompanyName}</option>
    };



    render(){
        return(

            <React.Fragment>
                <div>
                    <div className="page-header">
                        <h3>Add a Job</h3>
                    </div>
                    <div className="card" style={{width: "50rem"}}>
                        <div className="card-body">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="inputRole" className="col-sm-2 col-form-label">Role</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputRole"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.onFormFieldChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputTechCompany" className="col-sm-2 col-form-label">Tech Company</label>
                                <div className="col-sm-10">
                                    <select 
                                        className="form-control tech-company-dropdown" 
                                        id="inputTechCompany"
                                        name="techCompanyId"
                                        value={this.state.formData.techCompanyId}
                                        onChange={this.onFormFieldChange}
                                    >
                                        <option hidden>Select</option>
                                           {this.state.dropdownOptions}
                                           
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputJobDescription" className="col-sm-2 col-form-label">Job Description</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputJobDescription"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onFormFieldChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputJobSummary" className="col-sm-2 col-form-label">Job Summary</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputJobSummary"
                                        name="summary"
                                        value={this.state.summary}
                                        onChange={this.onFormFieldChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputPay" className="col-sm-2 col-form-label">Pay</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputPay"
                                        name="pay"
                                        value={this.state.pay}
                                        onChange={this.onFormFieldChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Skills</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputSkills"
                                        name="skills"
                                        value={this.state.skills}
                                        onChange={this.onFormFieldChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputSlug" className="col-sm-2 col-form-label">Slug</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputSlug"
                                        name="slug"
                                        value={this.state.slug}
                                        onChange={this.onFormFieldChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputStatus" className="col-sm-2 col-form-label">Status</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputStatus"
                                        name="statusId"
                                        value={this.state.statusId}
                                        onChange={this.onFormFieldChange}
                                    />
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                id="submit-button"
                                onClick={this.onSubmit}
                                >Submit
                            </button>
                        </form>
                        </div>        
                    </div>
                </div>
            </React.Fragment>
        )
    }
};

export default AddJobs;