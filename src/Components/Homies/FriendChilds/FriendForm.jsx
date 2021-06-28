import React from "react";
import { Formik, Form } from "formik";
import SaveIcon from "@material-ui/icons/Save";
import { FormControl, Box } from "@material-ui/core";
import CustomInput from "../../CustomComponents/Custominput";
import Button from "../../CustomComponents/CustomButton";
import formValidationSchema from "../../../services/ValidationSchemas";
import * as friendService from "../../../services/FriendsService";
import "../HomieStyle/Homies.scss";
import FriendCard from "./FriendCard";

//FORMIK IS ALL SORTS OF FUCKERED UP.. PLEASE RESOLVE

class FriendForm extends React.Component {
    state = {
        formType: null,
        formData: {
            title: "",
            bio: "",
            summary: "",
            headline: "",
            slug: "",
            imageUrl: "",
            statusId: "",
        },
    };

    componentDidMount() {
        if (this.props.formType === "Edit") {
            let editFriendId = this.props.idToEdit;
            friendService
                .getFriendById(editFriendId)
                .then(this.onGetFriendOk)
                .catch(this.onGetFriendFail);
        }
    }

    onGetFriendOk = res => {
        let formType = this.props.formType;
        let editFriendId = this.props.idToEdit;

        this.setState(() => {
            let state = { ...this.state };

            state.formType = formType;
            state.editFriendId = editFriendId;
            state.friend = res.data.item;

            return state;
        });
    };

    onGetFriendFail = err => {
        console.log(err);
    };
    handleSubmit = values => {
        console.log(values);

        if (this.state.formType === "Add") {
            console.log("adding");
            friendService
                .addFriend(values)
                .then(this.onAddOk)
                .catch(this.onAddFail);
        } else if (this.state.formType === "Edit") {
            friendService
                .editFriend(values, this.state.editFriendId)
                .then(this.onEditOk)
                .catch(this.onEditFail);
        }
    };

    onAddOk = res => {
        console.log(res);
    };
    onAddFail = err => {
        console.error(err);
    };

    onEditOk = res => {
        console.log(res);
    };
    onEditFail = err => {
        console.error(err);
    };

    render() {
        return (
            <>
                <Formik
                    enableReinitialize={true}
                    initialValues={this.state.formData}
                    onSubmit={this.handleSubmit}
                    validationSchema={formValidationSchema}
                >
                    {({ values, handleChange }) => (
                        <Box>
                            <Form>
                                <FormControl>
                                    <CustomInput
                                        labelText="Title..."
                                        id="title"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "text",
                                            required: true,
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Bio..."
                                        id="bio"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "text",
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Headline..."
                                        id="headline"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "text",
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Summary..."
                                        id="summary"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "text",
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Slug"
                                        id="slug"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "text",
                                            required: true,
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Image Url"
                                        id="imageUrl"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            type: "url",
                                            required: true,
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Status"
                                        id="statusId"
                                        formControlProps={{
                                            fullWidth: false,
                                        }}
                                        inputProps={{
                                            type: "text",
                                            required: true,
                                        }}
                                    />
                                </FormControl>
                                <Box>
                                    <Button
                                        color=" transparent"
                                        justIcon
                                        startIcon={<SaveIcon size="lg" />}
                                    ></Button>
                                </Box>
                            </Form>
                        </Box>
                    )}
                </Formik>
                <div className="flex-row editFriendCard">
                    {this.state.friend && (
                        <FriendCard friend={this.state.friend} />
                    )}
                </div>
            </>
        );
    }
}

export default FriendForm;
