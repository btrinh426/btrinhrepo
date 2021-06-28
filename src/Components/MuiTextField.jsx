import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

const FriendField = () => {
    return <TextField id="standard-basic" label="Standard" />;
};

FriendField.propTypes = {
    color: PropTypes.string,
};

export default FriendField;
