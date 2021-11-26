import logo from './logo.svg';
import './App.css';
import Guest from './components/Guest.js'
import Airplanes from './components/Airplanes.js';
import LoginPage from './components/Login';
import {Router, Link, Route} from 'react-dom';
function App() {
  return (
    <div>
      <header>
        {/* <Airplanes /> */}
        <LoginPage />
      </header>
    </div>
  );
}

export default App;
