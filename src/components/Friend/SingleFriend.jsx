import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import FriendForm from "../FriendForm";

function SingleFriend(props) {
  const oneFriend = props.friend;

  // const onFriendClickFull = function () {
  //   props.onClick(oneFriend);
  // };

  var skillsAsString = "";
  var skillCount = oneFriend.skills.length;
  var skillIndex = 0;

  oneFriend.skills.forEach((skill) => {
    skillIndex++;
    if (skillIndex === skillCount) {
      skillsAsString += skill.name + "";
    } else {
      skillsAsString += skill.name + ", ";
    }
  });

  const onClickEdit = () => {
    props.onEdit(oneFriend);
  };

  return (
    <div className="card col-md-3">
      <img src={oneFriend.primaryImage} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{oneFriend.title}</h5>
        <p className="card-text">
          Skills: <strong>{skillsAsString}</strong>
        </p>
        <button
          className="nav-link link-button"
          // onClick={this.onFriendClick}
          // onClick={() => this.onFriendClickFull(oneFriend)}
          // best way to call function for on click
          //   onClick={onFriendClickFull}
          onClick={onClickEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

SingleFriend.propTypes = {
  singleFriend: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    statusId: PropTypes.bool.isRequired,
    primaryImage: PropTypes.string,
    skills: PropTypes.array.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default React.memo(SingleFriend);
