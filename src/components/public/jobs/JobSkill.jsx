import React from "react";

function JobSkill(props) {
  const singleSkill = props.aSkill;

  function onSkillDelClicked(e) {
    props.onSkillDelClicked(singleSkill);
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-dark m-1"
        onClick={onSkillDelClicked}
      >
        {singleSkill}
      </button>
      {/* <span className="badge badge-pill badge-info" onClick={onSkillDelClicked}>
        {singleSkill}
      </span> */}
    </>
  );
}

export default React.memo(JobSkill);
