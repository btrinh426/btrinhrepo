
import * as Yup from "yup";

const basicSchema = Yup.object().shape({
    name: Yup.string().min(2).max(128).required("Required"),
    headline: Yup.string().min(2).max(128).required("Required"),
    description: Yup.string().min(2).max(128).required("Required"),
    summary: Yup.string().min(2).max(128).required("Required"),
    slug: Yup.string().min(2).max(128).required("Required"),
    statusId: Yup.boolean().required("Required"),
    dateStart: Yup.date().required("Required"),
    dateEnd: Yup.date().required("Required"),
    latitude: Yup.number().required("Required"),
    longitdue: Yup.number().required("Required"),
    zipCode: Yup.string().min(2).max(128).required("Required"),
    address: Yup.string().min(2).max(128).required("Required"),
    
  });


  export default basicSchema;