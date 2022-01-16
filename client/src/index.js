import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Contexts from './components/Contexts';
import StripPayPage from './components/StripPayPage';
import EditFlight from './components/EditFlight';
import Admin1 from './components/Admin1';
import AdminPage from './components/AdminPage';
import HomeGuest from './components/HomeGuest';
import LoginAdmin from './components/LoginAdmin';
import AddAirplane from './components/AddAirplane';


ReactDOM.render(
  <BrowserRouter>
    <Contexts>
      <App />
    </Contexts>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
