import React from "react";
import * as dogService from "../services/dogService";
import { Formik, FastField, Form } from "formik";
import * as Yup from "yup"; // for everything

class DogForm extends React.Component {
  state = {
    formData: this.propsToFormData(this.props),
  };

  propsToFormData(props) {
    const dog = props.formData;

    const item = {
      id: dog.id || "",
      name: dog.name || "",
      breed: dog.breed || "",
      weight: dog.weight || "",
      birthDate: dog.birthDate || "",
      gender: dog.gender,
      isNeutered: !!dog.others && !!dog.others.isNeutered,
      isMicrochipped: !!dog.others && !!dog.others.isMicrochipped,
    };

    console.log(item);
    return item;
  }

  onChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState((prevState) => {
      const formData = { ...prevState.formData, [name]: value };

      return { formData: formData };
    });
  };

  showSaveSuccess = () => {
    this.props.notify({
      message: "Saved changes",
      level: "success",
      autoDismiss: 2,
    });
  };
  onSaveErrorGeneric = (error) => {
    this.props.notify({
      message: "Failed to save changes: " + error.toString(),
      level: "error",
      autoDismiss: 0,
    });
  };

  //onSave now receives the values form Formik
  onSave = (formValues) => {
    console.log(formValues);

    const that = this;
    // convert formData to the hierarchical format that
    const dog = {
      id: this.state.formData.id,
      name: formValues.name,
      breed: formValues.breed,
      weight: formValues.weight,
      birthDate: formValues.birthDate,
      gender: formValues.gender,
      others: {
        isNeutered: formValues.isNeutered,
        isMicrochipped: formValues.isMicrochipped,
      },
    };

    if (this.state.formData.id) {
      dogService
        .update(dog)
        .then((data) => {
          this.showSaveSuccess();
          that.props.onSave(dog);
        })
        .catch(this.onSaveErrorGeneric);
    } else {
      dogService
        .create(dog)
        .then((data) => {
          this.showSaveSuccess();

          // Modify state to reflect assigned id value
          this.setState((prevState) => {
            const formData = { ...prevState.formData, id: data.item };
            return { ...prevState, formData: formData };
          });

          that.props.onSave({ ...dog, id: data.item });
        })
        .catch(this.onSaveErrorGeneric);
    }
  };

  onCancel = (event) => {
    this.props.onCancel();
  };

  onDelete = (event) => {
    dogService
      .del(this.state.formData.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteError = () => {
    this.props.addNotification({
      message: "Delete Failure",
      level: "error",
      autoDismiss: 0,
    });
  };

  onDeleteSuccess = () => {
    this.props.onDelete(this.state.formData);
  };

  // validationSchema is used here inline but it shouldbe imported from other files
  render() {
    return (
      <div>
        <Formik
          initialValues={this.state.formData}
          onSubmit={this.onSave}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
            bread: Yup.string(),
          })}
          render={(formikProps) => (
            <Form>
              <div>
                <label htmlFor="name">Name:</label>
                <FastField
                  name="name"
                  placeholder="Enter Name"
                  component="input"
                  className="form-control"
                />
                {formikProps.touched.name && formikProps.errors.name && (
                  <div class="text-danger">{formikProps.errors.name}</div>
                )}
              </div>
              <div>
                <label htmlFor="breed">Breed</label>
                <FastField
                  component="input"
                  name="breed"
                  className="form-control"
                />
                {formikProps.touched.name && formikProps.errors.name && (
                  <div class="text-danger">{formikProps.errors.name}</div>
                )}
              </div>
              <div>
                <label htmlFor="weight">Weight (lbs)</label>
                <FastField
                  component="input"
                  name="weight"
                  id="weight"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="birthdate">Birthdate</label>
                <FastField
                  component="input"
                  name="birthDate"
                  id="birthdate"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <div className="radio">
                  <label className="radio-inline">
                    <FastField
                      name="gender"
                      value="M"
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          name="gender"
                          checked={formikProps.values.gender === "M"}
                          value="M"
                        />
                      )}
                    />
                    Male
                  </label>
                  <label className="radio-inline">
                    <FastField
                      name="gender"
                      value="F"
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          name="gender"
                          checked={formikProps.values.gender === "F"}
                          value="F"
                        />
                      )}
                    />
                    Female
                  </label>
                </div>
              </div>
              <div className="form-group">
                <div className="checkbox">
                  <label className="checkbox">
                    <FastField
                      name="isNeutered"
                      value={true}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="checkbox"
                          name="isNeutered"
                          checked={formikProps.values.isNeutered}
                          value="true"
                        />
                      )}
                    />
                    Neutered
                  </label>
                  <label className="checkbox">
                    <FastField
                      name="isMicrochipped"
                      value={true}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="checkbox"
                          name="isMicrochipped"
                          checked={formikProps.values.isMicrochipped}
                          value="true"
                        />
                      )}
                    />
                    Microchipped
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="itemId">Dog Id:</label>
                <FastField
                  component="input"
                  name="id"
                  id="itemId"
                  className="form-control"
                  disabled
                />
              </div>
              <div className="btn-group" role="group">
                <button type="submit" className="btn btn-primary btn-sm">
                  Save
                </button>
                <button
                  type="button"
                  onClick={this.onCancel}
                  className="btn btn-default btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={this.onDelete}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default DogForm;
