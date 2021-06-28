import React from "react";
import PropTypes from "prop-types";

const Types = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Title: {props.title}</h5>
        <p className="card-text">Bio: {props.bio}</p>
        <p className="card-text">Summary: {props.summary}</p>
        <p className="card-text">Headline: {props.headline}</p>
        <p className="card-text">Slug: {props.slug}</p>
        <p className="card-text">Status Id: {props.statusId}</p>
        <p className="card-text">Image Type Id: {props.imageTypeId}</p>
        <p className="card-text">Image String: {props.imageString}</p>
        <p className="card-text">Primary Image Id: {props.primaryImageId}</p>
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
  statusId: PropTypes.number.isRequired,
  imageTypeId: PropTypes.number.isRequired,
  imageString: PropTypes.string.isRequired,
  primaryImageId: PropTypes.number.isRequired,
};

export default Types;
