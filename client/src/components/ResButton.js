import React, { Component, useState } from "react";
import {
  SketchOutlined,
  DingdingOutlined,
  ShoppingOutlined,
  HeartOutlined,
  HeartFilled,
  DollarCircleFilled
} from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const Flight = ({ flight }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          let params = { flight: flight, flight_id: flight["_id"] };
             navigate("../ChooseSeats", { state: params });
         
        }}
      >
        <DollarCircleFilled /> Pay
      </Button>
    </div>
  );
};

export default Flight;
