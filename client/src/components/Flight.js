import React, { Component, useState } from "react";
import {
  SketchOutlined,
  DingdingOutlined,
  ShoppingOutlined,
  HeartOutlined,
  HeartFilled,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const Flight = ({ flight }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [Fav, setFav] = useState(false)
  return (
    <div>
      <Card
        title={"Flight Number: " + flight.id}
        extra={
          <a>
            <HeartOutlined />
          </a>
        }
        style={{}}
        actions={[<EllipsisOutlined key="tab2" />]}
        hoverable="true"
      >
        <p>Departure Time: {flight.departure_time} </p>
        <p>Arrival Time: {flight.arrival_time} </p>
        <p>Trip Duration: {flight.duration} </p>
        <p>Cabin Class: {flight.cabin_class} </p>
        <p>Baggage Allowance: {flight.baggage_allowance} </p>
        <p>Price: {flight.price} </p>
        <p>Seats Left: {flight.SeatsLeft}</p>
        <p>from: {flight.from}</p>
        <p>to: {flight.to}</p>
      </Card>
    </div>
  );
};

export default Flight;
