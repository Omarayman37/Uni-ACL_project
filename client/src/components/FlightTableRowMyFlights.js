import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class FlightTableRowMyFlight extends Component {
    CancelFlight(){
        axios.get('http://localhost:5000/cancelflight/' + this.props.obj._id)
        .then((res) => {
          console.log(res.data)
          console.log('Reservation Cancelled')
        }).catch((error) => {
          console.log(error)
        })
        window.location.reload(false);
    }

   
    constructor(props) {
        super(props);
        this.CancelFlight = this.CancelFlight.bind(this);
        
    }
   
    render() {
        return (
            <tr>
                <td>{this.props.obj.id}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.seat_number}</td>
                <td>{this.props.obj.range}</td>
                <td>{this.props.obj.duration}</td>
                <td>{this.props.obj.arrival_time}</td>
                <td>{this.props.obj.departure_time}</td>
                <td>{this.props.obj.from}</td>
                <td>{this.props.obj.to}</td>
                <td>{this.props.obj.price}</td>
                <td>{this.props.obj.Economy_seats}</td>
                <td>{this.props.obj.firstclass_seats}</td>
                <td>{this.props.obj.baggage_allowance}</td>
                <td>
                    <Button onClick={(e) =>{ e.preventDefault();
                        if (window.confirm("Are you sure you want to Cancel this Reservation?")) {
                         this.CancelFlight();
                      } else {
                        }
                            }
                    }size="sm" variant="danger">Cancel Flight</Button>
                </td>
            </tr>
        );
    }
}