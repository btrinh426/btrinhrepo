import React, { useState } from "react";
import CustomInput from "../Components/CustomComponents/Custominput";
import Button from "../Components/CustomComponents/CustomButton";
import { FormControl, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import "./Homies/HomieStyle/Homies.scss";

const Search = props => {
    console.log(props);
    const [query, setQuery] = useState("query");

    function handleQuery(e) {
        setQuery(e.target.value);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={1}>
                <FormControl>
                    <Button
                        name="Friend Search"
                        value={query}
                        justIcon
                        startIcon={<SearchIcon size="lg" />}
                        onChange={handleQuery}
                        onClick={props.eventHandler}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl>
                    <CustomInput
                        id="standard-search"
                        labelText="Search Friends"
                        formControlProps={{
                            fullWidth: false,
                        }}
                        inputProps={{
                            type: "search",
                        }}
                    ></CustomInput>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Search;
