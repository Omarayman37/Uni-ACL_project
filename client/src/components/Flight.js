import React, { Component, useState } from "react";
import {
  SketchOutlined,
  DingdingOutlined,
  ShoppingOutlined,
  HeartOutlined,
  HeartFilled,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button, Card, Menu, Typography } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const { Text, Paragraph } = Typography;
const Flight = ({ flight }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [Fav, setFav] = useState(false);
  return (
    <div>
      <Card
        title={"Flight Number: " + flight.id}
        actions={[<EllipsisOutlined key="tab2" />]}
        hoverable="true"
      >
        <Paragraph>Departure Time: {flight.departure_time} </Paragraph>
        <Paragraph>Arrival Time: {flight.arrival_time} </Paragraph>
        <Paragraph>Price: {flight.price} </Paragraph>
        <Paragraph>From: {flight.from}</Paragraph>
        <Paragraph>To: {flight.to}</Paragraph>

        <Menu mode="inline" style={{ height: "100%", width: "100%" }}>
          <Menu.SubMenu title={"details"} key={"details"}>
            <Menu.Item key={"seats left"}>
              <Text style={{ height: 20 }}>
                <Text>Seats Left: {flight.SeatsLeft}</Text>
              </Text>
            </Menu.Item>
            <Menu.Item key={"baggage"}>
              <Text style={{ height: 20 }}>
                Baggage Allowance: {flight.baggage_allowance}
              </Text>
            </Menu.Item>
            <Menu.Item key={"duration"}>
              <Paragraph>Trip Duration: {flight.duration} </Paragraph>
            </Menu.Item>

          </Menu.SubMenu>
        </Menu>
      </Card>
    </div>
  );
};

export default Flight;
