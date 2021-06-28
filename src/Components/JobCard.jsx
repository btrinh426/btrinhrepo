import React, {Component} from "react";


class JobCard extends Component {


    render (){

        return (

            <React.Fragment>
                <div className="col-md-4 mb-4 card-job" key={`Job-${this.props.job.id}`}>
                    <div className="card border-0 shadow">
                    <div className="card-body text-center">
                    <img 
                        src={this.props.job.techCompany.images[0].imageUrl} 
                        className="card-img-top" 
                        alt="..."
                    />
                            <h5 className="card-pay text-black-50">{this.props.job.pay}</h5>
                            <div className="card-title text-black-50 custom-padding">{this.props.job.title}</div>
                            <div className="card-slug text-black-50 custom-padding">{this.props.job.slug}</div>
                            <button type="button" className="btn btn-danger deleteJob custom">Delete</button>
                            <button type="button" id="editJob" className="btn btn-info editJob custom">Edit</button>
                            <div>
                                <button type="button" id="viewMore" className="btn btn-light viewMore" data-toggle="modal" data-target="#jobModal">View More</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="jobModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="modalJobTitle">Job Title</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                        <img src="https://miro.medium.com/max/500/1*xDIevNE7HEMiJQVTYg0qDQ.png" className="card-img-top" id="modalImage" alt="..."/>
                        <h5 className="modal-techCompany" id="modalTechCompany">Tech Company</h5>
                        <p className="modal-pay" id="modalPay">Pay</p>
                        <p className="modal-summary" id="modalJobSummary">Job Summary</p>
                        <p className="modal-description">Job Description: <span id="modalJobDescription"></span></p>
                        <p className="modal-slug">Location: <span id="modalSlug"></span></p>
                        <p className="modal-skills">Required skills: <span id="modalSkills"></span></p>
                        <p className="modal-statusId">Status: <span id="modalStatusId"></span></p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

            
            </React.Fragment>

        
        )
        
    }
};

export default JobCard;