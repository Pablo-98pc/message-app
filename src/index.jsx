import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import './index.css';
import Welcome from './components/welcome/index';
import Profile from './components/profile/index';
import Message from './components/message';


ReactDOM.render(
  <Router>
    <Routes >
      <Route exact path="/" element={<Welcome/>} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/message/:id" element={<Message />} />
    </Routes>
  </Router>
 
  ,
  document.getElementById('root')
);
