import React from "react";

function SingleSkill(props) {
  const oneSkill = props.skill;
  // add boolean value to oneSkill

  const onSkillChecked = (e) => {
    props.toggleSkill(oneSkill, oneSkill.name);
    // passSkillChecked(oneSkill);
  };

  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={"skill" + oneSkill.id}
        name="skill"
        onChange={onSkillChecked}
        // have to set checked, checkbox doesn't change in value, changes in checked state

        // value={this.state.friendFormData.summary}
      />
      <label className="form-check-label" htmlFor={"skill" + oneSkill.id}>
        {oneSkill.name}
      </label>
    </div>
  );
}

export default React.memo(SingleSkill);
