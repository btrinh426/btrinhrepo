import * as Yup from "yup";

const addFrinedSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  primaryImage: Yup.string().required("Required"),
  bio: Yup.string().nullable(),
  summary: Yup.string().nullable(),
  headline: Yup.string().required("Required"),
  slug: Yup.string().required("Required"),
  statusId: Yup.string().required("Required"),
});

export { addFrinedSchema };
