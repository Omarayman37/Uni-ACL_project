import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class FlightTableRowMyFlight extends Component {
    
    cancelreservation(){
        axios.get('http://localhost:5000/ca/' + this.props.obj._id)
        .then((res) => {
          console.log(res.data)
          
        }).catch((error) => {
          console.log(error)
        })
        window.location.reload(false);
    }
   
    constructor(props) {
        super(props);
        this.cancelreservation = this.cancelreservation.bind(this);
        
        
    }
   
    render() {
        // <th>Flight Number</th>
        //   <th>seat_number</th>
        //   <th>Cabin Class</th>
        //   <th>from</th>
        //     <th>to</th>
        //     <th>departure Date</th>
        //     <th>Arrival Time</th>
        //     <th>price</th>
        
    // IDUser: String,
    // IDFlight: String,
    // flightNr: String,
    // seat_number: String,//dy msh 3arf 3yznha wla l2 
    // Cabin_Class: String, 
    // from: String, // contry name 
    // to: String,//country name
    // arrival_time: Date,
    // departure_time: Date,
    // price : Number,
        return (
            <tr>
                <td>{this.props.obj.flightNr}</td>
                <td>{this.props.obj.seat_number}</td>
                <td>{this.props.obj.Cabin_Class}</td>
                <td>{this.props.obj.from}</td>
                <td>{this.props.obj.to}</td>
                <td>{this.props.obj.arrival_time}</td>
                <td>{this.props.obj.departure_time}</td>                
                <td>{this.props.obj.price}</td>
                <td>
                    <Button onClick={(e) =>{ e.preventDefault();
                        if (window.confirm("Are you sure you want to cancel this reservation")) {
                         this.cancelreservation();
                      } else {
                        }
                            }
                    }size="sm" variant="danger">Cancel Reservation</Button>
                  
                </td>
            </tr>
        );
    }
}
