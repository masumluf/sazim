import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../class/storage";

const AdminRoute = ({ Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() && isAuth().role === "student" ? (
        <Component {...rest} />
      ) : (
        <Redirect to='/' />
      )
    }></Route>
);

export default AdminRoute;
