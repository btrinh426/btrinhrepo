import React from 'react'
import Misc from "../../scripts/misc"
import JobsMainContent from "./JobsMainContent"
import JobAddOrEdit from "./JobAddOrEdit"

class JobsHandler extends React.Component {

    state = {
        jobsArray: []
    };

    render(){
         return (
            <React.Fragment>
                {
                    Misc.historyToArray(this.props)[0] === "jobs" ? 
                    
                        Misc.historyToArray(this.props).length === 1 ?
                        
                        <JobsMainContent 
                        pushHistory={this.props.pushHistory} 
                        getHistory={this.props.getHistory}
                        getAppState={this.props.getAppState}
                        setJobsHandlerState={p => {this.setState(p)}} 
                        getJobsHandlerState={this.state}>
                        </JobsMainContent> :
                        
                        Misc.historyToArray(this.props)[1] === "jobEdit" ?
                        
                        <JobAddOrEdit
                        pushHistory={this.props.pushHistory} 
                        getHistory={this.props.getHistory}
                        getAppState={this.props.getAppState}
                        setJobsHandlerState={p => {this.setState(p)}} 
                        getJobsHandlerState={this.state}
                        addOrEdit={"edit"}>
                        </JobAddOrEdit> :
                        
                        Misc.historyToArray(this.props)[1] === "jobAdd" ?

                        <JobAddOrEdit
                        pushHistory={this.props.pushHistory} 
                        getHistory={this.props.getHistory}
                        getAppState={this.props.getAppState}
                        setJobsHandlerState={p => {this.setState(p)}} 
                        getJobsHandlerState={this.state}
                        addOrEdit={"add"}>
                        </JobAddOrEdit> :  
                        null 
                    
                    :null
                }
            </React.Fragment>
         );
    }
}

export default JobsHandler;