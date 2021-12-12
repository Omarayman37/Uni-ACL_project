import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class UserAllFlights extends  Component{

    constructor(props) {
        super(props);
        this.reserveFlight = this.reserveFlight.bind(this);
    }
    reserveFlight() {
        
    }
    render() {
        return (
            <tr>
                <td>{"this.props.obj.id"}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.seat_number}</td>
                <td>{this.props.obj.range}</td>
                <td>{this.props.obj.duration}</td>
                <td>{this.props.obj.arrival_time.substring(0,10)}</td>
                <td>{this.props.obj.from}</td>
                <td>{this.props.obj.departure_time}</td>
                <td>{this.props.obj.to}</td>
                <td>{this.props.obj.price}</td>
                <td>
                    
                    <Button onClick={(e) =>{ e.preventDefault();
                        if (window.confirm("Are you sure you want to reserve this flight?")) {
                         this.reserveFlight();
                      } else {
                        }
                            }
                    }size="sm" variant="danger">Reserve</Button>
              </td>
            </tr>
        );
    }
}