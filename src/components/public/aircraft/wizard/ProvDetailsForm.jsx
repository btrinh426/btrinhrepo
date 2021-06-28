import React from "react";
import { withFormik } from "formik";
// import * as Yup from "yup";
import VirtualizedSelect from "react-virtualized-select";
// import { MenuItem } from "@material-ui/core/MenuItem";

const ProvDetailsForm = (props) => {
  const {
    // Formik HOC props
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,

    // Loki props
    backLabel,
    nextLabel,
    onBack,
    onNext,
    cantBack,
    dirty,
    isInFinalStep,
  } = props;

  const titleTypeOptions = [
    // for select drop-down
    { value: 0, label: "undeclared-" },
    { value: 1, label: "doctor-" },
    { value: 2, label: "professor-" },
    { value: 3, label: "mr.-" },
    { value: 4, label: "mrs.-" },
    { value: 5, label: "ms-" },
    { value: 6, label: "miss-" },
  ];

  const _handleSelect = (selectChoice) => {
    setFieldValue("titleTypeId", selectChoice.value);
  };

  return (
    <form onSubmit={handleSubmit} className="p-1">
      <div className="form-group">
        <label htmlFor="phone">Office phone</label>
        <input
          type="text"
          className={`form-control ${
            errors.phone && touched.phone && "is-invalid"
          }`}
          name="phone"
          id="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.phone && touched.phone && (
          <div className="invalid-feedback">{errors.phone}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="fax">Fax</label>
        <input
          type="fax"
          className={`form-control ${
            errors.fax && touched.fax && "is-invalid"
          }`}
          name="fax"
          id="fax"
          value={values.fax}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.fax && touched.fax && (
          <div className="invalid-feedback">{errors.fax}</div>
        )}
      </div>
      <div className="form-group m-3">
        <label htmlFor="titleTypeId">R Select a title / salutation:</label>
        <VirtualizedSelect
          options={titleTypeOptions}
          //   defaultValue={titleTypeOptions[values.titleTypeId]}
          value={values.titleTypeId}
          name="titleTypeId"
          onChange={_handleSelect}
          id="testSelect"
        ></VirtualizedSelect>
      </div>
      <div className="form-group m-3">
        <label htmlFor="titleTypeId">M Select a title / salutation:</label>
        <VirtualizedSelect
          id="titleTypeId"
          options={titleTypeOptions}
          defaultValue={titleTypeOptions[values.titleTypeId]}
          value={values.titleTypeId}
          name="titleTypeId"
          onChange={(opts) => setFieldValue("titleTypeId", opts.value)}
        />
      </div>

      <div className="button-group">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onBack}
          disabled={isSubmitting || cantBack}
        >
          {backLabel}
        </button>

        <button
          type="submit"
          className="btn btn-primary ml-1"
          disabled={isSubmitting}
        >
          {nextLabel}
        </button>
      </div>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: (props) => ({
    titleTypeId: props.providerDetails.titleTypeId,
    genderTypeId: props.providerDetails.genderTypeId,
    phone: props.providerDetails.phone,
    fax: props.providerDetails.fax,
    networks: props.providerDetails.networks,
    npi: props.providerDetails.npi,
    genderAccepted: props.providerDetails.genderAccepted,
    isAccepting: props.providerDetails.isAccepting,
  }),

  //   validationSchema: Yup.object().shape({
  //     name: Yup.string().required(),
  //     email: Yup.string().email().required(),
  //   }),

  handleSubmit: (values, { props }) => {
    props.onNext({
      providerDetails: {
        titleTypeId: values.titleTypeId, //parseInt(values.titleTypeOptions),
        genderTypeId: values.genderTypeId,
        phone: values.phone,
        fax: values.fax,
        networks: values.networks,
        npi: values.npi,
        genderAccepted: values.genderAccepted,
        isAccepting: values.isAccepting,
        userProfileId: props.providerDetails.userProfileId, // pass through no edit
      },
    });
  },
})(ProvDetailsForm);
