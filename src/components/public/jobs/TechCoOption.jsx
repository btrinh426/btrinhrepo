import React from "react";

function TechCoOption(props) {
  const aCompany = props.company;

  return (
    //   key={`techco-${aCompany.id}`}
    <option value={aCompany.id}>{aCompany.name}</option>
  );
}

export default React.memo(TechCoOption);
