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
import { updateProfile } from "../class/helper";
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

const Registration = (props) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    id: props?.id,
    email: props?.email,
    first_name: props?.first_name,
    last_name: props?.last_name,
    address: props?.address,
    phone: props?.phone,
    role: props?.role,
    showPassword: false,
    buttonText: "Update",
    errors: {},
    loader: false,
  });

  let emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  useEffect(async () => {
    //checkLogin();
    document.title = "Update Profile";
  }, []);

  console.log(props?.email);

  const {
    id,
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

    console.log(first_name);

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

    if (await updateProfile(values, setValues)) {
      window.location.href = "/profile";
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
              Account Setting
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
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Registration;
