import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { getSubjectList, addSubjectToProfile } from "../class/helper";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "60vh",
    backgroundColor: "#3cc88f",
  },

  paper: {
    margin: theme.spacing(1, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  inputForm: {
    width: "30%",
    margin: 5,
    marginBottom: 30,
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    width: "30%",
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
    marginRight: "10px",
  },
}));

export default function Enrolment() {
  const classes = useStyles();

  const [subjects, setSubjects] = useState([]);

  const [values, setValues] = useState({
    subject: null,
    errors: {},
    buttonText: "Teach",
  });
  const { subject, errors, buttonText } = values;

  useEffect(async () => {
    setSubjects(await getSubjectList());
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSubjectToProfile(subject);
  };

  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={8}
          md={12}
          xl={12}
          lg={12}
          component={Paper}
          elevation={2}
          square>
          <div className={classes.paper}>
            <h2>Teach Class</h2>

            <FormControl
              fullWidth
              required
              margin='normal'
              className={classes.inputForm}>
              <InputLabel htmlFor='gender'>Select Subject</InputLabel>
              <Select value={subject} onChange={handleChange("subject")}>
                {subjects.length > 0 &&
                  subjects.map((sub) => (
                    <MenuItem value={sub.id}>{sub.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>

            <div style={{ display: "inline" }}>
              <Button
                variant='outlined'
                color='primary'
                className={classes.submit}
                style={{ color: "#6969F5" }}
                onClick={() => {
                  window.location.href = "/admin";
                }}>
                Back
              </Button>

              <Button
                type='submit'
                fullWidth
                variant='contained'
                className={classes.submit}
                style={{ backgroundColor: "#6969F5" }}
                onClick={handleSubmit}>
                {buttonText}
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
