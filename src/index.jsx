import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import './index.css';
import Welcome from './components/welcome/index';
import Profile from './components/profile/index';


ReactDOM.render(
  <Router>
    <Switch >
    <Route exact path="/" component={Welcome} />
    <Route exact path="/profile" component={Profile} />
    </Switch>
  </Router>
 
  ,
  document.getElementById('root')
);
