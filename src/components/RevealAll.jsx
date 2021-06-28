import React from "react";
import Searching from "./Searching";
import NotSearching from "./NotSearching";

function RevealAll(props) {
  const searchButtonClicked = props.searchButtonClicked;
  if (searchButtonClicked) {
    return <Searching />;
  } else return <NotSearching />;
}

export default RevealAll;
