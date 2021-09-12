import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import StudentRoute from "../src/protectedRoute/StudentRoute";
import PrivateRoute from "../src/protectedRoute/PrivateRoute";
import AdminRoute from "../src/protectedRoute/AdminRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "../src/pages/Home";
import Admin from "../src/pages/Admin";
import Profile from "./pages/Profile";
import Group from "../src/pages/MakeGroup";
import Enrolment from "../src/pages/Enrolment";
import Teach from "../src/pages/SelectClass";
import ClassDetail from "../src/pages/ClassDetail";

/// features component call

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/registration' exact component={SignUp} />

        <PrivateRoute path='/home' Component={Home} exact />

        <StudentRoute path='/enrolment' Component={Enrolment} exact />

        <PrivateRoute path='/profile' Component={Profile} exact />
        <AdminRoute path='/teach' Component={Teach} exact />
        <AdminRoute path='/group' Component={Group} exact />
        <AdminRoute path='/classdetails' Component={ClassDetail} exact />
        <AdminRoute path='/admin' Component={Admin} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
