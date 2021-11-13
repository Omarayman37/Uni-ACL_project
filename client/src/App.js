import logo from './logo.svg';
import './App.css';
import Guest from './components/Guest.js'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <Guest/>
      </header>
    </div>
  );
}

export default App;
