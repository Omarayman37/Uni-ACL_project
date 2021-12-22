import React, { useState }  from 'react';
import ReactDOM, { render } from 'react-dom';
import { Card } from 'antd';
import { Typography , Menu , Layout } from 'antd';
import {HeartOutlined , EllipsisOutlined   } from '@ant-design/icons';

const { SubMenu } = Menu;

class FlightCard extends React.Component {   
    
        render() {
        return(
            <div>
            <Card title= {'Flight Number: ' + this.props.flight_id} extra={<a><HeartOutlined /></a>} style={{ width: 300 }} hoverable = "true" >   
                <p>Departure Time: {this.props.depature_time} </p>
                <p>Arrival Time: {this.props.arival_time} </p>
                <p>Price: {this.props.price} </p>
            <Menu
            mode="inline"
            style={{ height: '100%' , width: '100%' }}
            >
            <SubMenu>
                <p style={{height: 20}}>Trip Duration: {this.props.trip_duration} </p>
                <p style={{height: 20}}>Cabin Class: {this.props.cabin_class} </p>
                <p style={{height: 20}}>Baggage Allowance: {this.props.baggage} </p>
            </SubMenu>
            </Menu>
            </Card>
            </div>
            

);
        }
}

export default FlightCard;
