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
import ReturnTrip from './components/ReturnTrip';
import Seat from './components/Seat'
import Seats from './components/Seats'
import ChooseSeats from './components/ChooseSeats'
import CSeats from './components/CSeats'
function App() {
  return (
    <div>
      <header></header>
      <Routes>
        <Route
          path="/"
          element={<CSeats flight_id={"61c022ef9c781f4d8bf68930"} />}
          exact
        />
        <Route path="/AddAirplane" element={<AddAirplane />} exact />
        <Route path="/ReturnTrip" element={<ReturnTrip />} exact />
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
