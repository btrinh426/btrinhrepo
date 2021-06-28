import * as Yup from "yup";
//import { Formik } from "formik";

const formValidationSchema = Yup.object().shape({
    title: Yup.string("Friends must have a title")
        .min(2)
        .max(50)
        .required("Is Required"),
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
    statusId: Yup.string("Must be set to Active").required("Is Required"),
});

export default formValidationSchema;
