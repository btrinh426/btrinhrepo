import React, { Component } from "react";

class JobModal extends Component {
  render() {
    return (
      <div
        className={`modal fade ${this.props.modalShow}`}
        style={{ display: this.props.display }}
        id="jobModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalJobTitle">
                {this.props.job?.title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.onModalClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <img
                src={this.props.job?.techCompany?.images[0]?.imageUrl}
                className="card-img"
                id="modalImage"
                alt="..."
                style={{
                  width: "100%",
                  height: "15vw",
                  paddingBottom: "20px",
                  objectFit: "cover",
                }}
              />
              <h5 className="modal-techCompany" id="modalTechCompany">
                {this.props.job?.techCompany?.name}
              </h5>
              <p className="modal-pay" id="modalPay">
                {this.props.job.pay}
              </p>
              <p className="modal-summary" id="modalJobSummary">
                {this.props.job.summary}
              </p>
              <p className="modal-description">
                Job Description: {this.props.job.description}
                <span id="modalJobDescription"></span>
              </p>
              <p className="modal-slug">
                Location: {this.props.job.slug}
                <span id="modalSlug"></span>
              </p>
              <p className="modal-skills">
                Required skills:{" "}
                {this.props.job.skills?.map((skill) => skill.name)}
                <span id="modalSkills"></span>
              </p>
              <p className="modal-statusId">
                Status: {this.props.job.statusId}
                <span id="modalStatusId"></span>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.props.onModalClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobModal;
