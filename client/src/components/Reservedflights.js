import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import FlightTableRow from './FlightTableRowReserved';


export default class Reservedflights extends Component {

  constructor(props) {
    super(props)
    this.state = {
      flights: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/myReservedFlights")
      .then(res => {
        this.setState({
          flights: res.data
        });
      })
      .catch((error) => {
        console.log(error);
        
      })
  }

  DataTable() {
    return this.state.flights.map((res, i) => {
      return <FlightTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper" >
      <b style={{color: 'black',fontSize:'50px',position: 'absolute',left: '50%',transform: 'translate(-50%, -50%)'}}>Available Flights</b>
      <br></br>
      <br></br>
      <Table striped bordered hover style={{width:'250%'}}>
        <thead>
          <tr>
        
          <th>Flight Number</th>
          <th>seat_number</th>
          <th>Cabin Class</th>
          <th>from</th>
            <th>to</th>
            <th>departure Date</th>
            <th>Arrival Time</th>
            <th>price</th>
            <th>Cancel</th>       
          </tr>
        </thead>
        <tbody>
        {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}
