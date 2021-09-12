import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import { TextField } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { signIn } from "../class/helper";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "60vh",
    backgroundColor: "#3cc88f",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundColor: "#FFF",
    color: "#3786bd",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  imgResponsive: {
    width: "100%",
    height: "auto",
  },
}));

const Login = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: null,
    password: null,
    buttonText: "SIGN IN",
    errors: {},
    loader: false,
  });
  useEffect(() => {
    //checkLogin();
    document.title = "Login Area";
  }, []);
  const { email, password, buttonText, errors, loader } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  return (
    <>
      <Grid
        container
        direction='column'
        alignItems='center'
        justify='center'
        style={{ marginTop: "30px" }}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography
              variant='button'
              style={{ color: "#3786bd" }}
              display='block'
              gutterBottom>
              Login Area
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => {
                signIn(e, values, setValues);
              }}>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                value={email ? email : ""}
                onChange={handleChange("email")}
                id='email'
                label='User Name'
                name='email'
                InputLabelProps={{
                  shrink: true,
                }}
                error={errors.email && errors.email}
                helperText={errors.email && errors.email}
                autoFocus
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={password ? password : ""}
                onChange={handleChange("password")}
                autoFocus
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                style={{ backgroundColor: "#3786bd" }}
                onClick={(e) => {
                  signIn(e, values, setValues);
                }}>
                {buttonText}
              </Button>

              <Box mt={5}></Box>
            </form>
            <Typography variant='caption'>
              Don't Have An Account ?{" "}
              <Link to='/registration' style={{ textDecoration: "none" }}>
                <a>SignUp</a>
              </Link>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
