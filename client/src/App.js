import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

import RouteLayout from "./Routes";

const App = () => {
    return (
        <>
            <Router>
                <RouteLayout/>
                {/* <Route path='/' exact component={Home} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/test' component={Test} /> */}
            </Router>
        </>
    );
};
export default App;