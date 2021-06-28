import React, { useState, useEffect } from "react";
import { Grid, makeStyles, InputBase } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import "../HomieStyle/Homies.scss";
import FriendCard from "./FriendCard";

import debug from "sabio-debug";
const _logger = debug.extend("FriendForm");

const useStyles = makeStyles(theme => ({
    root: {
        "& > *": {
            width: "30vw",
            margin: theme.spacing(1),
            borderColor: "yellowgreen",
        },
        notchedOutline: {},
        textField: {
            border: "1px solid blue",
            borderRadius: theme.shape.borderRadius,
        },
        inputBase: {
            border: "1px solid green",
            borderRadius: theme.shape.borderRadius,
        },
    },
}));
const initialFValues = {
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    imageUrl: "",
    statusId: "",
};
export default function FriendForm(props) {
    const [values, setValues] = useState(initialFValues);
    const classes = useStyles();
    return (
        <form className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        className={classes.textField}
                        label="Title.."
                        inputProps={{
                            classes: {
                                root: classes.root,
                                notchedOutline: classes.notchedOutline,
                            },
                        }}
                        InputLabelProps={{
                            className: "textField__label",
                        }}
                    />
                    <TextField
                        variant="outlined"
                        className={classes.textField}
                        label="Bio.."
                        TextFieldProps={{
                            className: "textField",
                        }}
                        InputLabelProps={{
                            className: "textField__label",
                        }}
                    />
                    <TextField
                        variant="outlined"
                        className={classes.textField}
                        label="Headline.."
                        TextFieldProps={{
                            className: "textField",
                        }}
                        InputLabelProps={{
                            className: "textField__label",
                        }}
                    />
                    <TextField
                        variant="outlined"
                        className={classes.textField}
                        label="Summary...."
                        TextFieldProps={{
                            className: "textField",
                        }}
                        InputLabelProps={{
                            className: "textField__label",
                        }}
                    />
                    <TextField
                        variant="outlined"
                        className={classes.textField}
                        label="Slug.."
                        TextFieldProps={{
                            className: "textField",
                        }}
                        InputLabelProps={{
                            className: "textField__label",
                        }}
                    />
                    <TextField
                        variant="outlined"
                        className={classes.textField}
                        label="Image Url.."
                        TextFieldProps={{
                            className: "textField",
                        }}
                        InputLabelProps={{
                            className: "textField__label",
                        }}
                    />
                    <TextField
                        variant="outlined"
                        className={classes.textField}
                        label="Status.."
                        TextFieldProps={{
                            className: "textField",
                        }}
                        InputLabelProps={{
                            className: "textField__label",
                        }}
                    />
                </Grid>
                <Grid item xs={6}></Grid>
            </Grid>
        </form>
    );
}
