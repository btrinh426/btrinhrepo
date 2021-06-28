import React from "react";
import * as Yup from "yup";

const FriendSchema = (props) => {
  console.log("FriendSchema is firing");
  Yup.object().shape({
    title: Yup.string().required(),
    bio: Yup.string().required(),
    summary: Yup.string().required(),
    headline: Yup.string().required(),
    slug: Yup.string().required(),
    primaryImage: Yup.string().url(),
  });

  return;
};

export default FriendSchema;
