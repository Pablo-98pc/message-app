import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import './index.css';
import Welcome from './components/welcome/index';
import Profile from './components/profile/index';


ReactDOM.render(
  <Router>
    <Routes >
      <Route exact path="/" element={<Welcome/>} />
      <Route exact path="/profile" element={<Profile />} />
    </Routes>
  </Router>
 
  ,
  document.getElementById('root')
);
