import logo from './logo.svg';
import './App.css';
import Guest from './components/Guest.js'
import Airplanes from './components/Airplanes.js';
import AllAirplanes from './components/AllAirplanes.js';
import LoginPage from './components/Login';
import SearchPage from './components/SearchPage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <header></header>
      <Routes>
        <Route path="/" element={<SearchPage />} exact />
        <Route path="/LoginUser" element={<LoginPage />} />
        <Route path="/RegisterUser" element={<Guest />} />
        <Route path="/AddAirplanes" element={<Airplanes />} />
      </Routes>

    </div>
  );
}

export default App;
