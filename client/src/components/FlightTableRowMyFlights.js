import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class FlightTableRowMyFlight extends Component {
    reserve(){

    }
    removeFromFavourite(){
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
        this.removeFromFavourite = this.removeFromFavourite.bind(this);
        
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
                <div className="dd-list">
    <button className="dd-list-item">size="sm" variant="danger">Reserve</button>
    <button className="dd-list-item"></button>
    <button className="dd-list-item"></button>
  </div>
                    <Button onClick={(e) =>{ e.preventDefault();
                        if (window.confirm("Are you sure you want to Remove this flight from favourites")) {
                         this.removeFromFavourite();
                      } else {
                        }
                            }
                    }size="sm" variant="danger">Remove from Favourite</Button>
                    <Button onClick={(e) =>{ e.preventDefault();
                        if (window.confirm("Are you sure you want to reserve this flight")) {
                         this.reserve();
                      } else {
                        }
                            }
                    }size="sm" variant="danger">Reserve</Button>
                </td>
            </tr>
        );
    }
}