import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NavBar from './component/views/NavBar/NavBar'
import LandingPage from './component/views/LandingPage/LandingPage'
import LoginPage from './component/views/LoginPage/LoginPage'
import RegisterPage from './component/views/RegisterPage/RegisterPage'
import Footer from './component/views/Footer/Footer'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
