import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const Search = props => {
    console.log(props);

    const useStyles = makeStyles(theme => ({
        root: {
            "& .MuiTextField-root": {
                margin: theme.spacing(1),
                width: "25ch",
            },
        },
    }));
    const classes = useStyles();

    return (
        <div>
            <span>THIS IS A SEARCH</span>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    className="mySearch"
                />
            </form>
        </div>
    );
};

export default Search;
