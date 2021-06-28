import React from "react";
import { Formik, Form } from "formik";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  Container,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import * as Yup from "yup";

const formValidationSchema = Yup.object().shape({
  fullName: Yup.string().min(2, "Min 2 char").max(50).required("Required"),
});

class FormikMaterialUI extends React.Component {
  state = {
    sports: [
      { id: 1, name: "Soccer" },
      { id: 2, name: "Basketball" },
      { id: 3, name: "Football" },
      { id: 4, name: "Baseball" },
      { id: 5, name: "Hockey" },
    ],
    formData: {
      fullName: "",
      checkedB: false,
      gender: "",
      sportId: "",
    },
  };
  handleSubmit = (values) => {
    console.log(values);
  };

  mapSport = (sport) => (
    <MenuItem key={`sport_${sport.id}`} value={sport.id}>
      {sport.name}
    </MenuItem>
  );
  render() {
    return (
      <Container maxWidth="sm">
        <Grid item xs={6}>
          <Formik
            enableReinitialize={true}
            initialValues={this.state.formData}
            onSubmit={this.handleSubmit}
            validationSchema={formValidationSchema}
          >
            {({ values, handleChange, touched, errors }) => (
              <Form>
                <Box m={1}>
                  <TextField
                    name="fullName"
                    label="Full Name"
                    value={values.fullName}
                    onChange={handleChange}
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                </Box>
                <Box m={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Is CheckedDB"
                  />
                </Box>
                <Box m={1}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box m={1}>
                  <FormControl fullWidth>
                    <InputLabel>Sports</InputLabel>
                    <Select
                      name="sportId"
                      onChange={handleChange}
                      value={values.sportId}
                    >
                      {this.state.sports.map(this.mapSport)}
                    </Select>
                  </FormControl>
                </Box>
                <Box m={2}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Container>
    );
  }
}

export default FormikMaterialUI;
