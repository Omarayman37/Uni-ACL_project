import React, { Component, useState, useEffect } from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Alert,
  Tabs,
} from "antd";
import "antd/dist/antd.css";
import {
  SketchOutlined,
  DingdingOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Seat from "./Seat";
import "../App.css";
const Seats = ({ flight_id }) => {
  const [seats, setSeats] = useState({});
  const [error_msg, setError_msg] = useState("");
  const [SeatClass, setSeatClass] = useState("EconomySeats");
  const [price, setprice] = useState(0);
  useEffect(async () => {
    const _data = await axios.post("http://localhost:5000/get-Seats", {
      flight_id: flight_id,
    });
    console.log(`retrived seats ${_data["data"]["seat"]}`);
    setSeats(_data["data"]["seat"]);
    const ticket = { price: 123 };
    setprice(ticket.price);
  }, []);

  
  return (
    <div className="card-container">
    </div>
  );
};

export default Seats;
