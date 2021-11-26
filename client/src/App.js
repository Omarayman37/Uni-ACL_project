import logo from './logo.svg';
import './App.css';
import Guest from './components/Guest.js'
import Airplanes from './components/Airplanes.js';
import LoginPage from './components/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <header></header>
      <Routes>
        <Route path="/" element={<LoginPage />} exact />
        <Route path="/LoginUser" element={<LoginPage />} />
        <Route path="/RegisterUser" element={<Guest />} />
        <Route path="/AddAirplanes" element={<Airplanes />} />
      </Routes>

    </div>
  );
}

export default App;
