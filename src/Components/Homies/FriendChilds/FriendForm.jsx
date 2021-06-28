import React from "react";
import { Formik, Form, Field } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import * as Yup from "yup";
import * as friendService from "../../../services/FriendsService";
import "../HomieStyle/Homies.scss";
import FriendCard from "./FriendCard";

const basicSchema = Yup.object().shape({
    title: Yup.string().min(2).max(50).required("Is Required"),
    bio: Yup.string().min(2).max(150),
    summary: Yup.string().min(2).max(100),
    headline: Yup.string().min(1).max(50),
    slug: Yup.string("Unique Friend Slug")
        .min(2)
        .max(50)
        .required("Is Required"),
    imageUrl: Yup.string()
        .url("Expected valid URL")
        .min(2)
        .max(200)
        .required("Is Required"),
    isAwesome: Yup.boolean("Please verify awesome-ness").required(),
});

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
                    validationSchema={basicSchema}
                >
                    {({ values, handleChange }) => (
                        <Form>
                            <div className="form-floating mb-3 form-group frfrm">
                                <Field
                                    type="text"
                                    className="form-control manInDaBox"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                />
                                <label
                                    className="fiFi"
                                    htmlFor="floatingInput manInDaBox"
                                >
                                    Title
                                </label>
                            </div>
                            <div className="form-floating mb-3 manInDaBox">
                                <Field
                                    type="text"
                                    className="form-control manInDaBox"
                                    name="bio"
                                    value={values.bio}
                                    onChange={handleChange}
                                />
                                <label className="fiFi" htmlFor="floatingInput">
                                    Bio
                                </label>
                            </div>
                            <div className="form-floating mb-3 manInDaBox">
                                <Field
                                    type="text"
                                    className="form-control manInDaBox"
                                    name="summary"
                                    value={values.summary}
                                    onChange={handleChange}
                                />
                                <label className="fiFi" htmlFor="floatingInput">
                                    Summary
                                </label>
                            </div>
                            <div className="form-floating mb-3 manInDaBox">
                                <Field
                                    type="text"
                                    className="form-control manInDaBox"
                                    name="headline"
                                    value={values.headline}
                                    onChange={handleChange}
                                />
                                <label className="fiFi" htmlFor="floatingInput">
                                    Headline
                                </label>
                            </div>
                            <div className="form-floating mb-3 manInDaBox">
                                <Field
                                    type="text"
                                    className="form-control manInDaBox"
                                    name="slug"
                                    value={values.slug}
                                    onChange={handleChange}
                                />
                                <label className="fiFi" htmlFor="floatingInput">
                                    Slug
                                </label>
                            </div>
                            <div className="form-floating mb-3 manInDaBox">
                                <Field
                                    type="text"
                                    className="form-control manInDaBox"
                                    name="imageUrl"
                                    value={values.imageUrl}
                                    onChange={handleChange}
                                />
                                <label className="fiFi" htmlFor="floatingInput">
                                    Friend Image Url
                                </label>
                            </div>
                            <div className="form-floating mb-3 manInDaBox">
                                <Field
                                    type="text"
                                    className="form-control manInDaBox"
                                    name="statusId"
                                    value={values.statusId}
                                    onChange={handleChange}
                                />
                                <label className="fiFi" htmlFor="floatingInput">
                                    Status
                                </label>
                            </div>
                            <FormControl>
                                <InputLabel
                                    shrink
                                    htmlFor="age-native-label-placeholder"
                                    className="gStatus"
                                >
                                    Status
                                </InputLabel>
                            </FormControl>
                            <div className="form-check">
                                <Field
                                    type="checkbox"
                                    name="isAwesome"
                                    className="form-check-input"
                                ></Field>
                                <label
                                    className="form-check-label"
                                    htmlFor="isAwesome"
                                >
                                    {/* {`${values.isAwesome}`} */}
                                    {"  "}Are you sure you like this person??
                                </label>
                            </div>
                            <div>
                                <button
                                    className="btn btn-outline-info fFormBtn"
                                    name={this.state.formType}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
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
