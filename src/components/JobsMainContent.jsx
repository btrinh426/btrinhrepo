import React from 'react'
import Misc from "../scripts/misc"
import Services from "../scripts/services"
import EventHandler from "../scripts/eventHandler"
import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import TextInput from './Input Components/TextInput'

class JobsMainContent extends React.Component {

    constructor(props) {
        super(props)
        this.onJobsGetSuccess = this.onJobsGetSuccess.bind(this)
    };

    state = {
        jobCards: []
    };

    componentDidMount () {
        Misc.loginCheck(this.props);
        Services.jobsGet(0, 999)
            .then(this.onJobsGetSuccess)
            .catch();
    };

    onJobsGetSuccess(response){
        const jobsArray = response.data.item.pagedItems;
        const cardArray = [];
        let uniqueKey = 0;

        jobsArray.forEach(job => {
            uniqueKey += 1;
            const newCard = this.makeCard(job.pay, job.title, job.techCompany.images[0].imageUrl, uniqueKey, job.id);
            cardArray.push(newCard);
            console.log(job)
        });

        this.setState({...this.state, jobCards: cardArray});
    }

    makeCard(title, text, imgUrl, key, btnId){
        return (<div className="card" style={{width: "18rem"}} key={key}>
                <img className="card-img-top" src={imgUrl} alt="Card image cap"></img>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{text}</p>
                        <a className="btn btn-primary" onClick={null} id={btnId}>Edit</a>
                        <a className="btn btn-primary" onClick={null} id={btnId}>Delete</a>
                        <a className="btn btn-primary" onClick={null} id={btnId}>View More</a>
                    </div>
                </div>);
    }

    onSearchClick(e){
        console.log("SEARCH");
        //Make Search Call
    }

    render(){
         return (
            <React.Fragment>

            <button
            type="button" 
            className="btn btn-primary" 
            onClick={null}
            >
            Add Job
            </button>

            <div>
                <TextInput 
                name={"search"} 
                startValue={""} 
                placeholder={"Search Jobs"} 
                getFormState={this.state} 
                setFormState={p=>{this.setState(p)}}>
                </TextInput>

                <button
                type="button"
                className="btn btn-primary" 
                onClick={this.onSearchClick}
                >
                Search
                </button>
            </div>

                {this.state.jobCards}
            </React.Fragment>
         );
    }
}

export default JobsMainContent;