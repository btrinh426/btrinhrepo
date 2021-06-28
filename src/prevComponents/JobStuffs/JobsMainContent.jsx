import React from 'react'
import Misc from "../../scripts/misc"
import Services from "../../scripts/services"
import EventHandler from "../../scripts/eventHandler"
import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import TextInput from '../Input Components/TextInput'
import Form from '../Input Components/Form'

class JobsMainContent extends React.Component {

    constructor(props) {
        super(props)
        this.onJobsGetSuccess = this.onJobsGetSuccess.bind(this)
        this.onSearchClick = this.onSearchClick.bind(this)
        this.onSearchSuccess = this.onSearchSuccess.bind(this)
        this.onSearchError = this.onSearchError.bind(this)
        this.editOnClick = this.editOnClick.bind(this)
        this.deleteOnClick = this.deleteOnClick.bind(this)
        this.viewMoreOnClick = this.viewMoreOnClick.bind(this)
        this.addJobOnClick = this.addJobOnClick.bind(this)
    };

    state = {
        search: "",
    };

    componentDidMount () {
        Misc.loginCheck(this.props);
        Services.jobsGet(0, 999)
            .then(this.onJobsGetSuccess)
            .catch();
    };

    onJobsGetSuccess(response){
        const jobsArray = response.data.item.pagedItems;
        this.props.setJobsHandlerState({... this.props.getJobsHandlerState, jobsArray});
    }

    onSearchClick(e){
        Services.jobsSearch(0, 999, this.state.search)
            .then(this.onSearchSuccess)
            .catch(this.onSearchError);
    }

    onSearchSuccess(response){
        const jobsArray = response.data.item.pagedItems;
        console.log(jobsArray);
        const cardArray = this.jobsArrayToCards(jobsArray);
        this.setState({...this.state, jobCards: cardArray});
    }

    onSearchError(response){
        this.setState({...this.state, jobCards: []});
    }

    editOnClick(e){
        const id = e.currentTarget.id;
        
        let job = undefined;
        this.props.getJobsHandlerState.jobsArray.forEach(j => {
            if(job){return;}
            if(j.id == id){job = j;}
        })

        console.log("EDIT", id, job);
        this.props.pushHistory(Misc.historySet(this.props, "/jobs/jobEdit/"+id));
    }

    deleteOnClick(e){
        const id = e.currentTarget.id;
        console.log("DELETE");
    }

    viewMoreOnClick(e){
        const id = e.currentTarget.id;
        console.log("VIEW MORE");
    }

    addJobOnClick(){
        this.props.pushHistory(Misc.historySet(this.props, "/jobs/jobAdd/"));
    }

    render(){
         return (
            <React.Fragment>

            <button
            type="button" 
            className="btn btn-primary" 
            onClick={this.addJobOnClick}
            >
            Add Job
            </button>

            <div>
                <Form
                inputArray = {[{name: "search", placeholder: "Search Jobs"}]}
                getFormState = {this.state}
                setFormState = {p => {this.setState(p)}}
                formObjPath = {[]}
                onFormSubmit = {this.onSearchClick}
                ></Form>
            </div>

            {[... this.props.getJobsHandlerState.jobsArray].map((job, key) => {
                
                return <div className="card" style={{width: "18rem"}} key={key}>
                <img className="card-img-top" src={job.techCompany.images[0].imageUrl} alt="Card image cap"></img>
                    <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <p className="card-text">{job.pay}</p>
                        <a className="btn btn-primary" onClick={this.editOnClick} id={job.id}>Edit</a>
                        <a className="btn btn-primary" onClick={this.deleteOnClick} id={job.id}>Delete</a>
                        <a className="btn btn-primary" onClick={this.viewMoreOnClick} id={job.id}>View More</a>
                    </div>
                </div>
            })}
            </React.Fragment>
         );
    }
}

export default JobsMainContent;