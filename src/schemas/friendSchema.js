
import * as Yup from "yup";

const basicSchema = Yup.object().shape({
    title: Yup.string().min(2).max(128).required("Required"),
    bio: Yup.string().min(2).max(128).required("Required"),
    summary: Yup.string().min(2).max(128).required("Required"),
    headline: Yup.string().min(2).max(128).required("Required"),
    slug: Yup.string().min(2).max(128).required("Required"),
    statusId: Yup.number().required("Required"),
    primaryImage: Yup.string().min(2).max(128).required("Required"),
    skills: Yup.string().max(128).required("Required"),
  });

  export default basicSchema;