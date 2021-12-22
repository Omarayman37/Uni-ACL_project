import React, { useState }  from 'react';
import ReactDOM, { render } from 'react-dom';
import { Card } from 'antd';
import { Typography  } from 'antd';
import {HeartOutlined , EllipsisOutlined } from '@ant-design/icons';

class FlightCard extends React.Component {   
        render() {
        return (
          <div>
            <Card
              title={"Flight Number: " + this.props.flight.flight_id}
              extra={
                <a>
                  <HeartOutlined />
                </a>
              }
              style={{ width: 300 }}
              actions={[<EllipsisOutlined key="tab2" />]}
              hoverable="true"
            >
              <p>Departure Time: {this.props.flight.depature_time} </p>
              <p>Arrival Time: {this.props.flight.arival_time} </p>
              <p>Trip Duration: {this.props.flight.trip_duration} </p>
              <p>Cabin Class: {this.props.flight.cabin_class} </p>
              <p>Baggage Allowance: {this.props.flight.baggage} </p>
              <p>Price: {this.props.flight.price} </p>
            </Card>
          </div>
        );
        }
}

export default FlightCard;
