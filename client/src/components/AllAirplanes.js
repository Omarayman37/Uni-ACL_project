import axios from "axios";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flights: [] };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/get-data-flights").then(doc=>{console.log(doc.data.data)
    this.setState({flights:doc.data.data})});
    
  }
  render() {
    return (
      <div>
        {this.state.flights.map(flight=><h1>{`${JSON.stringify(flight)}`}</h1>)}
      </div>
    );
  }
}

export default App;
