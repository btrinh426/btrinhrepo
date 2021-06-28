import React from "react";
import * as Yup from "yup"; // for everything

let passwordMatches = `/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!$%^&*-]).{8,}/`;

let emailSchema = {
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().matches(
    passwordMatches,
    "Password does not meet complexity requirements"
  ),
  passwordConfirm: Yup.string().matches(
    passwordMatches,
    "Password does not meet complexity requirements"
  ),
  avatarUrl: Yup.string().url(),
};

let friendSchema = {
  title: Yup.string().required(),
  bio: Yup.string().required(),
  summary: Yup.string().required(),
  headline: Yup.string().required(),
  slug: Yup.string().required(),
  primaryImage: Yup.string().url(),
};

export { emailSchema, friendSchema };
