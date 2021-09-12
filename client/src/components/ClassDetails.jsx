import React, { useState, useEffect, useContext } from "react";
import { store } from "../class/Store";
import useCart from "../class/Context";
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
import { getSubjectList, arrangeMark } from "../class/helper";
import Table from "./Layout/Table";

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

  const {
    state: { marks },
  } = useContext(store);

  const { initializedMark } = useCart();

  const [subjects, setSubjects] = useState([]);

  const [values, setValues] = useState({
    subject: null,
    errors: {},
    mark: null,
    buttonText: "Teach",
  });
  const { subject, errors, buttonText, mark } = values;

  useEffect(async () => {
    setSubjects(await getSubjectList());
  }, []);

  const handleChange = (name) => async (e) => {
    setValues({ ...values, [name]: e.target.value });
    if (name === "subject") {
      initializedMark(await arrangeMark(e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <h2>Class Details</h2>

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

            {Object.keys(marks).length > 0 && <Table />}

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
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
