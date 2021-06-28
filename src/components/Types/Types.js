import React from "react";
import PropTypes from "prop-types";

const Types = (props) => {
  return (
    <div className="col-sm-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Title: {props.title}</h5>
          <p className="card-text" onClick={props.logBio}>
            {props.bio}
          </p>
          <p className="card-text">Has Active: {props.statusId}</p>
        </div>
      </div>
    </div>
  );
};

Types.propTypes = {
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  statusId: PropTypes.bool.isRequired,
  primaryImage: PropTypes.string.isRequired,
  logBio: PropTypes.func.isRequired,
};
export default Types;
