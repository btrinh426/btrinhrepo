import React from "react";

const JobCard = (props) => {
  const onDelete = () => {
    props.onDelete(props.job.id);
  };

  const onEdit = () => {
    props.onEdit(props.job);
  };

  const onViewMore = () => {
    props.onViewMore(props.job);
  };

  return (
    <React.Fragment>
      <div className="col-md-4 mb-4 card-job">
        <div className="card border-0 shadow">
          <div className="card-body text-center">
            <img
              //null check
              src={props.job.techCompany.images[0]?.imageUrl}
              className="card-img-top"
              alt="..."
            />
            <h5 className="card-pay text-black-50">{props.job.pay}</h5>
            <div className="card-title text-black-50 custom-padding">
              {props.job.title}
            </div>
            <div className="card-slug text-black-50 custom-padding">
              {props.job.slug}
            </div>
            <button
              type="button"
              className="btn btn-danger deleteJob custom"
              style={{ width: "78px", marginRight: "5px", marginTop: "10px" }}
              onClick={onDelete}
            >
              Delete
            </button>
            <button
              type="button"
              id="editJob"
              className="btn btn-info editJob custom"
              onClick={onEdit}
              style={{ width: "78px", marginLeft: "5px", marginTop: "10px" }}
            >
              Edit
            </button>
            <div>
              <button
                type="button"
                id="viewMore"
                className="btn btn-light viewMore"
                style={{ width: "102px", marginTop: "10px" }}
                data-toggle="modal"
                data-target="#jobModal"
                onClick={onViewMore}
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default JobCard;
