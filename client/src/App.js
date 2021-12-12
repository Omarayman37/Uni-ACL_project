import logo from './logo.svg';
import './App.css';
import Guest from './components/Guest.js'
import Airplanes from './components/Airplanes.js';
import AllAirplanes from './components/AllAirplanes.js';
import LoginPage from './components/Login';
import SearchPage from './components/SearchPage'
import HomeGuest from './components/HomeGuest'
import myFlights from './components/myFlights'
import UserAllFlights from './components/UserAllFlights'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddAirplane from './components/AddAirplane';
function App() {
  return (
    <div>
      <header></header>
      <Routes>
        <Route path="/" element={<AddAirplane />} exact />
        <Route path="/AddAirplane" element={<AddAirplane />} exact />

        <Route path="/SearchPage" element={<SearchPage />} exact />
        <Route path="/LoginUser" element={<LoginPage />} />
        <Route path="/myFlights" element={<myFlights />} />
        <Route path="/userAllFlights" element={<UserAllFlights />} />
        <Route path="/RegisterUser" element={<Guest />} />
        <Route path="/AddAirplanes" element={<Airplanes />} />
        <Route path="/HomeGuest" element={<HomeGuest />} />
      </Routes>
    </div>
  );
}

export default App;
