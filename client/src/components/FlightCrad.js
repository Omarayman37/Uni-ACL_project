import React, { useState }  from 'react';
import ReactDOM, { render } from 'react-dom';
import { Card, Menu } from "antd";
import { Typography  } from 'antd';
import {HeartOutlined , EllipsisOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class FlightCard extends React.Component {   
    
        render() {


        return(
            <div>
            <Card size="small" title= {'Flight Number: ' + this.props.flight_id} extra={<a><HeartOutlined /></a>} style={{ width: 300 }} hoverable = "true" >   
                
            <Menu
            mode="inline"
            style={{ height: '100%' , width: '100%' }}
            >
            <SubMenu>
                <p style={{height: 10}}>Departure Time: {this.props.depature_time} </p>
                <p style={{height: 10}}>Arrival Time: {this.props.arival_time} </p>
                <p style={{height: 10}}>Price: {this.props.price} </p>
                <p style={{height: 10}}>Trip Duration: {this.props.trip_duration} </p>
                <p style={{height: 10}}>Cabin Class: {this.props.cabin_class} </p>
                <p style={{height: 10}}>Baggage Allowance: {this.props.baggage} </p>
            </SubMenu>
            </Menu>
            </Card>
            </div>
            

);
        }
}

export default FlightCard;
