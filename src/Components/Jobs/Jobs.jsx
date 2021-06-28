import React from "react";
import * as jobServices from "../../services/jobsService";
import "./Jobs.css";
//import JobCard from "./JobCard";
import JobForm from "./JobForm";

class Jobs extends React.Component {
    state = {
        gotJobs: false,
        display: {
            showWelcome: false,
            showJobs: false,
            showNewJob: false,
            showJobEdit: false,
        },
    };
    componentDidMount() {
        const hasJobs = this.state.gotJobs;

        if (!hasJobs) {
            jobServices
                .getAllJobs()
                .then(this.getJobsOK)
                .catch(this.getJobsFail);
        }
    }

    getJobsOk = res => console.log(res);
    getJobsFail = err => console.log(err);

    render() {
        let user = this.props.appState.currentUser.firstName;
        let userImg = this.props.appState.currentUser.photo;
        console.log(user);

        return (
            <>
                <div className="sidebar-container">
                    <div className="sidebar-logo">
                        Hi {user}{" "}
                        <img
                            className="sidebar-user"
                            src={userImg}
                            alt={user}
                        />{" "}
                    </div>
                    <ul className="sidebar-navigation">
                        <li className="header">Job Options</li>
                        <li>
                            <button className="meButton">
                                See Job Postings
                            </button>
                        </li>
                        <li>
                            <button className="meButton">+ Post New Job</button>
                        </li>
                    </ul>
                </div>
                <div className="container">
                    <div className="container-fluid">
                        {/* <div className="welcome-msg ">
                            <h1 className="msg border-0">
                                Welcome to Jobs @ Happy Place
                            </h1>
                        </div> */}
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {/* <JobCard /> */}
                            <JobForm />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Jobs;
