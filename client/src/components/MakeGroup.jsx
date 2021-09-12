import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { getSubjectList, makeGroupList } from "../class/helper";
import TestInput from "./Layout";

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
  const [students, setStudents] = useState([]);
  const [values, setValues] = useState({
    subject: null,
    magicNumber: null,
    errors: {},
    buttonText: "Get Grouping",
  });
  const { subject, magicNumber, buttonText, errors } = values;

  useEffect(async () => {
    setSubjects(await getSubjectList());
  }, []);

  const handleChange = (name) => async (e) => {
    setValues({ ...values, [name]: e.target.value });
    console.log(name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setStudents();
    setStudents(await makeGroupList(subject, magicNumber));
    // if (await studentEnrolment(subject, teacher)) {
    //   window.location.href = "/home";
    // }
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
            <h2>Class Registration</h2>

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

            <TextField
              value={magicNumber ? magicNumber : ""}
              onChange={handleChange("magicNumber")}
              InputLabelProps={{
                shrink: true,
              }}
              error={errors.magicNumber && errors.magicNumber}
              helperText={errors.magicNumber && errors.magicNumber}
              placeeHolder='Magic Number Must be 0-100'
              label='Magic Number Must be 0-100'
              name='magicNumber'
              style={{ marginTop: "0px", width: "30%" }}
            />

            {students.length > 0 &&
              students.map((innerArray) => (
                <table style={{ border: "1px solid black" }}>
                  <tr>
                    {innerArray.map((item) => (
                      <td style={{ border: "1px solid black" }}>
                        {item?.user?.first_name}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {innerArray.map((item) => (
                      <td style={{ border: "1px solid black" }}>
                        {item?.mark}
                      </td>
                    ))}
                  </tr>
                </table>
              ))}

            {students.length > 0 && "Are All Student in Group ? : Yes"}

            <div
              style={{
                display: "inline",
                width: "800px",
                textAlign: "center",
              }}>
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
