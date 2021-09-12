import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import { TextField } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { UserReg } from "../class/helper";
import { Link, useHistory } from "react-router-dom";
import InputText from "./Layout";

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
    margin: theme.spacing(1, 2),
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
    color: "#fff",
  },
  imgResponsive: {
    width: "100%",
    height: "auto",
  },
  margin: {
    margin: theme.spacing(1),
  },

  textField: {
    width: "100%",
  },
}));

const Registration = ({ type }) => {
  const classes = useStyles();
  let history = useHistory();

  let emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const [values, setValues] = useState({
    email: null,
    password: null,
    first_name: null,
    last_name: null,
    address: null,
    phone: null,
    role: type,
    confirm_password: null,
    showPassword: false,
    buttonText: "Register",
    errors: {},
    loader: false,
  });
  useEffect(() => {
    //checkLogin();
    document.title = "Registration Area";
  }, []);
  const {
    first_name,
    last_name,
    address,
    phone,
    role,
    email,
    password,
    confirm_password,
    showPassword,
    errors,
    buttonText,
  } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!first_name)
      return setValues({
        ...values,
        errors: { first_name: "Please Enter First Name" },
      });

    if (!last_name)
      return setValues({
        ...values,
        errors: { last_name: "Please Enter Last Name" },
      });

    if (!address)
      return setValues({
        ...values,
        errors: { address: "Please Enter Address" },
      });

    if (!phone)
      return setValues({
        ...values,
        errors: { phone: "Please Enter Phone Number" },
      });

    if (!email)
      return setValues({
        ...values,
        errors: { email: "Please Enter A Valid Email Address" },
      });

    if (!emailRegex.test(email))
      return setValues({
        ...values,
        errors: { email: "Please Enter A Valid Email Address" },
      });
    if (!password)
      return setValues({
        ...values,
        errors: { password: "Please Enter A Strong Password" },
      });

    if (!confirm_password)
      return setValues({
        ...values,
        errors: { confirm_password: "Please Re-Type Password" },
      });

    if (password !== confirm_password)
      return setValues({
        ...values,
        errors: { confirm_password: "Password Doesnt Match" },
      });

    if (await UserReg(values, setValues)) {
      history.push("/");
    }
  };

  return (
    <>
      <Grid container direction='column' alignItems='center' justify='center'>
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
            <Avatar className={classes.avatar}></Avatar>
            <Typography
              variant='button'
              style={{ color: "#3786bd" }}
              display='block'
              gutterBottom>
              {type} Area
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <InputText
                myValue={first_name}
                handleChange={handleChange}
                errors={errors}
                placeeHolder='Enter Your First Name'
                labelText='First Name'
                nameText='first_name'
              />

              <InputText
                myValue={last_name}
                handleChange={handleChange}
                errors={errors}
                placeeHolder='Enter Your Last Name'
                labelText='Last Name'
                nameText='last_name'
              />

              <InputText
                myValue={address}
                handleChange={handleChange}
                errors={errors}
                placeeHolder='Enter Your Address'
                labelText='Address'
                nameText='address'
              />

              <InputText
                myValue={phone}
                handleChange={handleChange}
                errors={errors}
                placeeHolder='Enter Your Phone Number'
                labelText='Phone Number'
                nameText='phone'
              />

              <InputText
                myValue={email}
                handleChange={handleChange}
                errors={errors}
                placeeHolder='Enter A Valid Email Address'
                labelText='Email'
                nameText='email'
              />

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password'>
                  {errors.password ? errors.password : "Password"}
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={values.showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChange("password")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.password && errors.password}
                  helperText={errors.password && errors.password}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'>
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant='outlined'>
                <InputLabel
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={errors.confirm_password && errors.confirm_password}
                  helperText={
                    errors.confirm_password && errors.confirm_password
                  }
                  htmlFor='outlined-adornment-confirm_password'>
                  {errors.confirm_password
                    ? errors.confirm_password
                    : "Confirm Password"}
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={values.showPassword ? "text" : "password"}
                  value={confirm_password}
                  onChange={handleChange("confirm_password")}
                  name='confirm_password'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'>
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

              <Button
                type='submit'
                fullWidth
                variant='contained'
                className={classes.submit}
                style={{ backgroundColor: "#6969F5" }}>
                {buttonText}
              </Button>

              <Box mt={5}></Box>
            </form>
            <Typography variant='caption'>
              Already Have An Account ?{" "}
              <Link to='/' style={{ textDecoration: "none" }}>
                <a>Sign In</a>
              </Link>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Registration;
