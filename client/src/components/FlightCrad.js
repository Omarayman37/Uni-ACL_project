import React, { useState }  from 'react';
import ReactDOM, { render } from 'react-dom';
import { Card } from 'antd';
import { Typography  } from 'antd';
import {HeartOutlined , EllipsisOutlined } from '@ant-design/icons';

class FlightCard extends React.Component {   
        render() {
        return(
            <div>
            <Card title= {'Flight Number: ' + this.props.flight_id} extra={<a><HeartOutlined /></a>} style={{ width: 300 }} actions={[<EllipsisOutlined  key = "tab2"/>]} hoverable = "true" >   
                <p>Departure Time: {this.props.depature_time} </p>
                <p>Arrival Time: {this.props.arival_time} </p>
                <p>Trip Duration: {this.props.trip_duration} </p>
                <p>Cabin Class: {this.props.cabin_class} </p>
                <p>Baggage Allowance: {this.props.baggage} </p>
                <p>Price: {this.props.price} </p>
            </Card>
            </div>

);
        }
}

export default FlightCard;
