import React, { Component, useState } from "react";
import {
  SketchOutlined,
  DingdingOutlined,
  ShoppingOutlined,
  HeartOutlined,
  HeartFilled,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button, Card, Menu } from "antd";
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
        <p>Price: {flight.price} </p>
        <p>from: {flight.from}</p>
        <p>to: {flight.to}</p>
        <Menu mode="inline" style={{ height: "100%", width: "100%" }}>
          <Menu.SubMenu title={"details"} key={"details"}>
            <p style={{ height: 20 }}>Trip Duration: {flight.cabin_class} </p>
            <p style={{ height: 20 }}>Baggage Allowance: {flight.baggage_allowance}
              <p style={{ height: 20 }}>Seats Left: {flight.SeatsLeft}</p>
            </p>
          </Menu.SubMenu>
        </Menu>
      </Card>
    </div>
  );
};

export default Flight;
