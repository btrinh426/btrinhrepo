import React from "react";
import * as friendService from "../services/friendService";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class AddFriend extends React.Component {

    // constructor(props){

    // }
    state = {
        formData: {
            title: "",
            bio: "",
            summary: "",
            headline: "",
            slug: "",
            statusId: "",
            primaryImage: ""
        }
    }

    componentDidMount() {
        let EditFriendId = this.props.match.params.id; // props pushed on editclick() from friends component. 

        console.log({ EditFriendId });

        //--- payload below is passed on history.push from friends component when edit button is clicked --
        
        let friend = this.props?.location?.state?.payload;  // optional chain operator (?.) is used here to validate each property . Will return undefined if nullish instead of error

        console.log("FriendPayload:", friend)

        //--- setState will popluate on form
        this.setState((prevState) => {

            let friend = this.props?.location?.state?.payload;  // optional chain operator (?.) is used here to validate each property . Will return undefined if nullish instead of error

            console.log("FriendPayload:", friend)

            if (friend) {

                return {
                    formData: {
                        id: friend.id,
                        title: friend.title,
                        bio: friend.bio,
                        summary: friend.summary,
                        headline: friend.headline,
                        slug: friend.slug,
                        statusId: friend.statusId,
                        primaryImage: friend.primaryImage.imageUrl
                    }
                }
            }

            return {
                formData: {
                    id: "",
                    title: "",
                    bio: "",
                    summary: "",
                    headline: "",
                    slug: "",
                    statusId: "",
                    primaryImage: ""
                }
            }

        })

    }


    handleFriends = (values) => {
       

        let friendParam = this.props.match.params.id; //props passed if edit button clicked

        if (friendParam) {    // if there is param id in props , execute updateFriend. Expected when onEditClick executes
            friendService
                .updateFriend(values)
                .then(this.onUpdateFriendSuccess)
                .catch(this.onUpdateFriendError)
        } else {             //--else if param is empty obj, execute createFriend
            friendService
                .createFriend(values)
                .then(this.onCreateFriendSuccess)
                .catch(this.onCreateFriendError);
        }
    }

    onUpdateFriendSuccess = (response) => {
        console.log("Update is successful")
    }

    onUpdateFriendError = (errResponse) => {
        console.error("Update error")
    }

    onCreateFriendSuccess = (response) => {
        console.log("Submit is successful")
    }

    onCreateFriendError = (errResponse) => {
        console.error("Submit error")
    }



    // componentDidUpdate(PrevProps) {
    //     let currentPath = this.props.location.pathname;
    //     let previousPath = PrevProps.location.pathname;
    //     console.log("PrevProps:", PrevProps)
    //     console.log("Friends", { currentPath, previousPath })
    // }

    render() {
        return (
            <Formik
                initialValues={this.state.formData}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    bio: Yup.string()
                        .max(200, 'Must be 200 characters or less')
                        .required('Required'),
                    summary: Yup.string()
                        .max(100, 'Must be 100 characters or less')
                        .required('Required'),
                    headline: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required'),
                    slug: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    statusId: Yup.number()
                        .required('Required. Enter 1 or Active'),
                    primaryImage: Yup.string()
                        .max(500, 'Must be 500 characters or less')
                        .required('Required'),
                })}
                onSubmit={this.handleFriends}
                enableReinitialize={true}
            >
                <div className="col-md-3">
                    <Form>
                        <h1>Add / Edit Friend</h1>
                        <div className="form-group">
                            <label htmlFor="InputTitle" >
                                Title
                        </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                placeholder="Ms. Mr. CEO, Cto etc."
                            />
                            <ErrorMessage name="title" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="InputBio" >
                                Bio
                        </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="bio"
                                name="bio"
                            />
                            <ErrorMessage name="bio" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="InputSummary" >
                                Summary
                        </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="summary"
                                name="summary"
                            />
                            <ErrorMessage name="summary" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="InputHeadline" >
                                Headline
                        </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="headline"
                                name="headline"
                            />
                            <ErrorMessage name="headline" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="InputSlug" >
                                Slug
                        </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="slug"
                                name="slug"
                                placeholder="unique url"
                            />
                            <ErrorMessage name="slug" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="InputStatusId" >
                                Status Id
                        </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="statusId"
                                name="statusId"
                                placeholder="set Id to 1 or Active to show"
                            />
                            <ErrorMessage name="statusId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="InputPrimaryImage" >
                                Primary Image
                        </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="primaryImage"
                                name="primaryImage"
                                placeholder="enter unique image url"
                            />
                            <ErrorMessage name="primaryImage" />
                        </div>

                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </Form>
                </div>
            </Formik>
        )
    }


}
export default AddFriend;

