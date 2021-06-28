import React from "react";
import { Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import * as Yup from "yup";
import * as friendService from "../../../services/FriendsService";
import "../HomieStyle/Homies.scss";

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
        let formType = this.props.formType;
        this.setState({ formType });
    }

    handleSubmit = values => {
        console.log(values);

        friendService
            .addFriend(values)
            .then(this.onAddOk)
            .catch(this.onAddFail);
    };

    onAddOk = res => {
        console.log(res);
    };
    onAddFail = err => {
        console.error(err);
    };

    render() {
        return (
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

                        {"  "}
                        {/* FIGURE THIS OUT ASAP */}
                        {"  "}
                        <FormControl>
                            <InputLabel
                                shrink
                                htmlFor="age-native-label-placeholder"
                                className="gStatus"
                            >
                                Status
                            </InputLabel>
                            {/* <NativeSelect
                                className="gStatus"
                                value={this.state.statusId}
                                name="statusId"
                                onChange={handleChange}
                                inputProps={{
                                    name: "statusId",
                                    id: "status-native-label-placeholder",
                                }}
                            >
                                <option
                                    className="gOpt"
                                    value={this.state.statusId}
                                >
                                    Active
                                </option>
                                <option
                                    className="gOpt"
                                    value="Like..For Real though"
                                >
                                    You Suck, For reals!
                                </option>
                            </NativeSelect> */}
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
        );
    }
}

export default FriendForm;
