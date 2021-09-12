import React, { Component, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../class/storage";

const PrivateRoute = ({ Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? <Component {...rest} /> : <Redirect to='/' />
    }></Route>
);

export default PrivateRoute;
